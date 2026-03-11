"use client";

import Link from "next/link";
import React from "react";
import { useDemo } from "../_demo/DemoProvider";
import {
  computeLessonUnlockAt,
  ensureEnrollment,
  getHomework,
  getSessionUser,
  setCohortStartAt,
  upsertHomework,
  type DemoCourse,
  type DemoHomeworkStatus,
  type DemoLesson
} from "../_demo/storage";

function formatDateTime(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}.${mm}.${yyyy} ${hh}:${mi}`;
}

function isLessonAllowed(args: {
  now: Date;
  cohortStartAtIso: string;
  course: DemoCourse;
  userId: string;
  lesson: DemoLesson;
  dbHomeworks: ReturnType<typeof useDemo>["db"]["homeworks"];
}) {
  const unlockAt = computeLessonUnlockAt(args.cohortStartAtIso, args.lesson.dayOffset);
  if (args.now < unlockAt) return { allowed: false, reason: `Откроется ${formatDateTime(unlockAt)}` };

  const allLessons = args.course.modules
    .slice()
    .sort((a, b) => a.order - b.order)
    .flatMap((m) => m.lessons.slice().sort((a, b) => a.dayOffset - b.dayOffset));

  const index = allLessons.findIndex((l) => l.id === args.lesson.id);
  if (index <= 0) return { allowed: true, reason: null as string | null };

  const prev = allLessons[index - 1];
  if (!prev.requiresHomework) return { allowed: true, reason: null as string | null };

  const prevHw = args.dbHomeworks.find((h) => h.userId === args.userId && h.lessonId === prev.id) ?? null;
                      if (!prevHw) return { allowed: false, reason: "Сначала сдайте домашнее задание предыдущего урока" };
  if (prevHw.status !== "accepted") return { allowed: false, reason: "Дождитесь принятия домашнего задания предыдущего урока" };

  return { allowed: true, reason: null as string | null };
}

export default function CabinetPage() {
  const { db, setDb } = useDemo();
  const user = getSessionUser(db);

  const [activeCourseId, setActiveCourseId] = React.useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = React.useState<string | null>(null);
  const [draftText, setDraftText] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!user) return;
    const enrollment = db.enrollments.find((e) => e.userId === user.id) ?? null;
    if (enrollment) setActiveCourseId(enrollment.courseId);
  }, [db.enrollments, user]);

  const isStudent = user?.role === "student";

  const enrollment = React.useMemo(() => {
    if (!user) return null;
    return db.enrollments.find((e) => e.userId === user.id) ?? null;
  }, [db.enrollments, user]);

  const courseFromEnrollment = React.useMemo(() => {
    if (!enrollment) return null;
    return db.courses.find((c) => c.id === enrollment.courseId) ?? null;
  }, [db.courses, enrollment]);

  const cohortFromEnrollment = React.useMemo(() => {
    if (!enrollment) return null;
    return db.cohorts.find((c) => c.id === enrollment.cohortId) ?? null;
  }, [db.cohorts, enrollment]);

  const availableCourses = db.courses;

  const activeCourse = React.useMemo(() => {
    if (activeCourseId) return availableCourses.find((c) => c.id === activeCourseId) ?? null;
    return courseFromEnrollment;
  }, [activeCourseId, availableCourses, courseFromEnrollment]);

  const activeCohort = React.useMemo(() => {
    if (cohortFromEnrollment && activeCourse && cohortFromEnrollment.courseId === activeCourse.id) return cohortFromEnrollment;
    if (!activeCourse) return null;
    return db.cohorts.find((c) => c.courseId === activeCourse.id) ?? null;
  }, [activeCourse, cohortFromEnrollment, db.cohorts]);

  const lessonsFlat = React.useMemo(() => {
    if (!activeCourse) return [];
    return activeCourse.modules
      .slice()
      .sort((a, b) => a.order - b.order)
      .flatMap((m) => m.lessons.map((l) => ({ moduleTitle: m.title, moduleOrder: m.order, lesson: l })));
  }, [activeCourse]);

  const activeLesson = React.useMemo(() => {
    if (!activeLessonId) return null;
    return lessonsFlat.find((x) => x.lesson.id === activeLessonId)?.lesson ?? null;
  }, [activeLessonId, lessonsFlat]);

  const hw = React.useMemo(() => {
    if (!user || !activeLesson) return null;
    return getHomework(db, user.id, activeLesson.id);
  }, [activeLesson, db, user]);

  React.useEffect(() => {
    if (!isStudent) return;
    if (!activeCourse || !activeCohort) return;
    if (!activeLessonId && lessonsFlat.length > 0) setActiveLessonId(lessonsFlat[0].lesson.id);
  }, [activeCohort, activeCourse, activeLessonId, isStudent, lessonsFlat]);

  React.useEffect(() => {
    setDraftText(hw?.text ?? "");
  }, [hw?.text]);

  const now = new Date();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {!user ? (
          <div className="mx-auto max-w-2xl py-16">
            <h1 className="text-3xl font-semibold">Кабинет ученика</h1>
            <p className="mt-4 text-slate-300">Сначала нужно войти.</p>
            <div className="mt-8 flex gap-3">
              <Link href="/auth" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
                Войти
              </Link>
              <Link href="/" className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
                На лендинг
              </Link>
            </div>
          </div>
        ) : !isStudent ? (
          <div className="mx-auto max-w-2xl py-16">
            <h1 className="text-3xl font-semibold">Кабинет ученика</h1>
            <p className="mt-4 text-slate-300">Этот раздел доступен роли student.</p>
            <div className="mt-8 flex gap-3">
              <Link href="/admin" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
                В админку
              </Link>
              <Link href="/auth" className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
                Сменить пользователя
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Кабинет ученика</div>
                <h1 className="mt-3 text-3xl font-semibold">Здравствуйте, {user.phone}</h1>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <Link href="/" className="text-slate-300 hover:text-white">
                    На лендинг
                  </Link>
                  <Link href="/auth" className="text-slate-300 hover:text-white">
                    Сменить пользователя
                  </Link>
                </div>
              </div>

              <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="text-sm font-semibold text-white">Демо-настройки</div>
                <div className="mt-3 grid gap-3">
                  <div className="grid gap-2">
                    <label className="text-xs uppercase tracking-[0.18em] text-slate-400">Курс</label>
                    <select
                      value={activeCourse?.id ?? ""}
                      onChange={(e) => {
                        setActiveCourseId(e.target.value || null);
                        setActiveLessonId(null);
                      }}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/60"
                    >
                      <option value="" disabled>
                        Выберите курс
                      </option>
                      {availableCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {activeCourse && activeCohort ? (
                    <div className="grid gap-2">
                      <label className="text-xs uppercase tracking-[0.18em] text-slate-400">Старт потока</label>
                      <input
                        type="datetime-local"
                        value={new Date(activeCohort.startAt).toISOString().slice(0, 16)}
                        onChange={(e) => {
                          const iso = new Date(e.target.value).toISOString();
                          setDb((prev) => setCohortStartAt(prev, activeCohort.id, iso));
                        }}
                        className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/60"
                      />
                      <div className="text-xs text-slate-400">Открытие уроков считается от этой даты.</div>
                    </div>
                  ) : null}

                  {activeCourse && activeCohort ? (
                    <button
                      type="button"
                      onClick={() => {
                        setDb((prev) => ensureEnrollment(prev, user.id, activeCourse.id, activeCohort.id));
                        setStatusMessage("Доступ к курсу выдан (демо).");
                        setTimeout(() => setStatusMessage(null), 2000);
                      }}
                      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      Выдать доступ к курсу (демо)
                    </button>
                  ) : null}

                  {statusMessage ? <div className="text-sm text-emerald-300">{statusMessage}</div> : null}
                </div>
              </div>
            </div>

            {!activeCourse || !activeCohort ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200">
            Нет данных курса/потока. Перезайдите через <Link className="underline" href="/auth">/auth</Link> или сбросьте демо-данные.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="px-2 py-2 text-sm font-semibold">{activeCourse.title}</div>
              <div className="px-2 pb-4 text-xs text-slate-400">
                Поток: {activeCohort.title} · Старт: {formatDateTime(new Date(activeCohort.startAt))}
              </div>
              <div className="space-y-2">
                {lessonsFlat.map(({ moduleTitle, lesson }) => {
                  const unlockAt = computeLessonUnlockAt(activeCohort.startAt, lesson.dayOffset);
                  const decision = isLessonAllowed({
                    now,
                    cohortStartAtIso: activeCohort.startAt,
                    course: activeCourse,
                    userId: user.id,
                    lesson,
                    dbHomeworks: db.homeworks
                  });

                  const hwItem = getHomework(db, user.id, lesson.id);
                  const statusLabel: Record<DemoHomeworkStatus, string> = {
                    draft: "черновик",
                    submitted: "на проверке",
                    accepted: "принято",
                    needs_changes: "доработать"
                  };

                  const isActive = activeLessonId === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={[
                        "w-full rounded-2xl border px-4 py-3 text-left transition",
                        isActive ? "border-cyan-500/50 bg-cyan-500/10" : "border-white/10 bg-slate-950/20 hover:bg-white/5"
                      ].join(" ")}
                    >
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{moduleTitle}</div>
                      <div className="mt-1 flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold">{lesson.title}</div>
                        <div className="text-xs text-slate-400">день {lesson.dayOffset}</div>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                        <span className="rounded-lg bg-white/5 px-2 py-1">{formatDateTime(unlockAt)}</span>
                        {lesson.requiresHomework ? <span className="rounded-lg bg-white/5 px-2 py-1">ДЗ обязательно</span> : null}
                        {hwItem ? <span className="rounded-lg bg-white/5 px-2 py-1">ДЗ: {statusLabel[hwItem.status]}</span> : null}
                        {!decision.allowed ? <span className="rounded-lg bg-amber-500/10 px-2 py-1 text-amber-200">{decision.reason}</span> : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              {activeLesson ? (
                (() => {
                  const decision = isLessonAllowed({
                    now,
                    cohortStartAtIso: activeCohort.startAt,
                    course: activeCourse,
                    userId: user.id,
                    lesson: activeLesson,
                    dbHomeworks: db.homeworks
                  });

                  if (!decision.allowed) {
                    return (
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Урок закрыт</div>
                        <h2 className="mt-3 text-2xl font-semibold">{activeLesson.title}</h2>
                        <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-100">
                          {decision.reason}
                        </div>
                      </div>
                    );
                  }

                  const hwStatusLabel: Record<DemoHomeworkStatus, string> = {
                    draft: "черновик",
                    submitted: "на проверке",
                    accepted: "принято",
                    needs_changes: "доработать"
                  };

                  return (
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Урок</div>
                        <h2 className="mt-3 text-2xl font-semibold">{activeLesson.title}</h2>
                        <div className="mt-3 text-sm text-slate-300">
                          Тип: <span className="text-white">{activeLesson.type}</span> · День:{" "}
                          <span className="text-white">{activeLesson.dayOffset}</span>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        {activeLesson.blocks.map((b) => {
                          if (b.type === "text") {
                            return (
                              <div key={b.id} className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
                                {b.title ? <div className="text-sm font-semibold">{b.title}</div> : null}
                                <div className="mt-2 text-sm text-slate-200">{b.markdown}</div>
                              </div>
                            );
                          }
                          if (b.type === "video") {
                            return (
                              <div key={b.id} className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
                                {b.title ? <div className="text-sm font-semibold">{b.title}</div> : null}
                                <div className="mt-2 text-sm text-slate-200">
                                  Видео:{" "}
                                  <a className="underline hover:text-white" href={b.url} target="_blank" rel="noreferrer">
                                    {b.url}
                                  </a>
                                </div>
                              </div>
                            );
                          }
                          if (b.type === "audio") {
                            return (
                              <div key={b.id} className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
                                {b.title ? <div className="text-sm font-semibold">{b.title}</div> : null}
                                <div className="mt-2 text-sm text-slate-200">
                                  Аудио:{" "}
                                  <a className="underline hover:text-white" href={b.url} target="_blank" rel="noreferrer">
                                    {b.url}
                                  </a>
                                </div>
                              </div>
                            );
                          }
                          if (b.type === "link") {
                            return (
                              <div key={b.id} className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
                                {b.title ? <div className="text-sm font-semibold">{b.title}</div> : null}
                                <div className="mt-2 text-sm text-slate-200">
                                  Ссылка:{" "}
                                  <a className="underline hover:text-white" href={b.url} target="_blank" rel="noreferrer">
                                    {b.url}
                                  </a>
                                </div>
                              </div>
                            );
                          }
                          if (b.type === "live") {
                            return (
                              <div key={b.id} className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
                                <div className="text-sm font-semibold">{b.title ?? "Эфир"}</div>
                                <div className="mt-2 text-sm text-slate-200">
                                  Платформа: <span className="text-white">{b.platform}</span> ·{" "}
                                  {formatDateTime(new Date(b.startsAt))}
                                </div>
                                <div className="mt-2 text-sm">
                                  <a className="underline hover:text-white" href={b.joinUrl} target="_blank" rel="noreferrer">
                                    Присоединиться
                                  </a>
                                </div>
                                {b.recordingUrl ? (
                                  <div className="mt-2 text-sm">
                                    Запись:{" "}
                                    <a className="underline hover:text-white" href={b.recordingUrl} target="_blank" rel="noreferrer">
                                      {b.recordingUrl}
                                    </a>
                                  </div>
                                ) : null}
                              </div>
                            );
                          }
                          if (b.type === "assignment") {
                            return (
                              <div key={b.id} className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
                                <div className="text-sm font-semibold">{b.title ?? "Домашнее задание"}</div>
                                <div className="mt-2 text-sm text-slate-200">{b.prompt}</div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>

                      {activeLesson.requiresHomework ? (
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-sm font-semibold">Домашняя работа</div>
                              <div className="mt-1 text-xs text-slate-400">Формат: текст. Проверка: до недели.</div>
                            </div>
                            {hw ? (
                              <div className="text-xs text-slate-300">
                                Статус: <span className="text-white">{hwStatusLabel[hw.status]}</span>
                              </div>
                            ) : null}
                          </div>

                          {hw?.teacherComment ? (
                            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-slate-200">
                              Комментарий: {hw.teacherComment}
                            </div>
                          ) : null}

                          <textarea
                            value={draftText}
                            onChange={(e) => setDraftText(e.target.value)}
                            rows={6}
                            placeholder="Напишите ответ…"
                            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/60"
                          />

                          <div className="mt-4 flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                setDb((prev) =>
                                  upsertHomework(prev, {
                                    userId: user.id,
                                    courseId: activeCourse.id,
                                    lessonId: activeLesson.id,
                                    text: draftText,
                                    status: "draft"
                                  })
                                );
                                setStatusMessage("Сохранено как черновик");
                                setTimeout(() => setStatusMessage(null), 1500);
                              }}
                              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                            >
                              Сохранить черновик
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setDb((prev) =>
                                  upsertHomework(prev, {
                                    userId: user.id,
                                    courseId: activeCourse.id,
                                    lessonId: activeLesson.id,
                                    text: draftText,
                                    status: "submitted"
                                  })
                                );
                                setStatusMessage("Отправлено на проверку");
                                setTimeout(() => setStatusMessage(null), 1500);
                              }}
                              className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                            >
                              Отправить на проверку
                            </button>
                          </div>

                          {statusMessage ? <div className="mt-3 text-sm text-emerald-300">{statusMessage}</div> : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })()
              ) : (
                <div className="text-slate-300">Выберите урок слева.</div>
              )}
            </div>
          </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
