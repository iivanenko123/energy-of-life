"use client";

import Link from "next/link";
import React from "react";
import { useDemo } from "../_demo/DemoProvider";
import {
  ensureEnrollment,
  getSessionUser,
  resetDemoDb,
  setCohortStartAt,
  upsertHomework,
  type DemoCourse,
  type DemoHomeworkStatus
} from "../_demo/storage";

function formatDateTime(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}.${mm}.${yyyy} ${hh}:${mi}`;
}

function buildLessonIndex(courses: DemoCourse[]) {
  const map = new Map<string, { courseTitle: string; lessonTitle: string }>();
  for (const course of courses) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        map.set(lesson.id, { courseTitle: course.title, lessonTitle: lesson.title });
      }
    }
  }
  return map;
}

const statusLabel: Record<DemoHomeworkStatus, string> = {
  draft: "черновик",
  submitted: "на проверке",
  accepted: "принято",
  needs_changes: "доработать"
};

export default function AdminPage() {
  const { db, setDb } = useDemo();
  const user = getSessionUser(db);

  const [commentDrafts, setCommentDrafts] = React.useState<Record<string, string>>({});
  const [toast, setToast] = React.useState<string | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-3xl font-semibold">Админ-панель</h1>
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
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-3xl font-semibold">Админ-панель</h1>
          <p className="mt-4 text-slate-300">Этот раздел доступен роли admin.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/cabinet" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
              В кабинет
            </Link>
            <Link href="/auth" className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              Сменить пользователя
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const lessonIndex = buildLessonIndex(db.courses);
  const students = db.users.filter((u) => u.role === "student");

  const submittedHomeworks = db.homeworks
    .slice()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Админка (демо)</div>
            <h1 className="mt-3 text-3xl font-semibold">Панель управления</h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
              <Link href="/" className="hover:text-white">
                На лендинг
              </Link>
              <Link href="/cabinet" className="hover:text-white">
                В кабинет
              </Link>
              <Link href="/auth" className="hover:text-white">
                Сменить пользователя
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                resetDemoDb();
                window.location.reload();
              }}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Сбросить демо-данные
            </button>
          </div>
        </div>

        {toast ? <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{toast}</div> : null}

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-lg font-semibold">Потоки (drip от старта)</div>
            <div className="mt-4 space-y-4">
              {db.cohorts.map((cohort) => {
                const course = db.courses.find((c) => c.id === cohort.courseId);
                return (
                  <div key={cohort.id} className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
                    <div className="text-sm font-semibold">{course?.title ?? "Курс"}</div>
                    <div className="mt-1 text-xs text-slate-400">{cohort.title}</div>
                    <div className="mt-3 grid gap-2">
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Старт потока</div>
                      <input
                        type="datetime-local"
                        value={new Date(cohort.startAt).toISOString().slice(0, 16)}
                        onChange={(e) => {
                          const iso = new Date(e.target.value).toISOString();
                          setDb((prev) => setCohortStartAt(prev, cohort.id, iso));
                          setToast("Старт потока обновлен");
                          setTimeout(() => setToast(null), 1200);
                        }}
                        className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/60"
                      />
                      <div className="text-xs text-slate-400">Текущее значение: {formatDateTime(new Date(cohort.startAt))}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-lg font-semibold">Выдача доступа (демо)</div>
            <p className="mt-2 text-sm text-slate-300">Можно вручную выдать доступ ученику к курсу/потоку.</p>
            <div className="mt-5 grid gap-3">
              {students.map((s) => {
                return (
                  <div key={s.id} className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
                    <div className="text-sm font-semibold">{s.phone}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {db.courses.map((course) => {
                        const cohort = db.cohorts.find((c) => c.courseId === course.id) ?? null;
                        const already = cohort
                          ? db.enrollments.some((e) => e.userId === s.id && e.courseId === course.id && e.cohortId === cohort.id)
                          : false;

                        return (
                          <button
                            key={course.id}
                            type="button"
                            disabled={!cohort || already}
                            onClick={() => {
                              if (!cohort) return;
                              setDb((prev) => ensureEnrollment(prev, s.id, course.id, cohort.id));
                              setToast(`Доступ выдан: ${s.phone} → ${course.title}`);
                              setTimeout(() => setToast(null), 1400);
                            }}
                            className={[
                              "rounded-xl px-3 py-2 text-xs font-semibold",
                              already ? "bg-emerald-500/10 text-emerald-100" : "bg-white/5 text-white hover:bg-white/10",
                              !cohort ? "opacity-50" : ""
                            ].join(" ")}
                          >
                            {already ? `Есть: ${course.title}` : `Выдать: ${course.title}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="text-lg font-semibold">Домашние задания</div>
          <p className="mt-2 text-sm text-slate-300">Проверка домашек ученика. Статус “принято” открывает следующий урок.</p>

          {submittedHomeworks.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/20 p-4 text-sm text-slate-300">
              Пока нет домашних. Зайдите учеником и отправьте домашку.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {submittedHomeworks.map((hw) => {
                const student = db.users.find((u) => u.id === hw.userId) ?? null;
                const lessonMeta = lessonIndex.get(hw.lessonId) ?? null;
                const commentDraft = commentDrafts[hw.id] ?? hw.teacherComment ?? "";

                return (
                  <div key={hw.id} className="rounded-2xl border border-white/10 bg-slate-950/20 p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Ученик</div>
                        <div className="mt-1 text-sm font-semibold text-white">{student?.phone ?? "—"}</div>
                        <div className="mt-2 text-xs text-slate-400">
                          {lessonMeta ? (
                            <>
                              {lessonMeta.courseTitle} · {lessonMeta.lessonTitle}
                            </>
                          ) : (
                            "Урок"
                          )}
                        </div>
                        <div className="mt-2 text-xs text-slate-400">
                          Обновлено: {formatDateTime(new Date(hw.updatedAt))} · Статус:{" "}
                          <span className="text-white">{statusLabel[hw.status]}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setDb((prev) =>
                              upsertHomework(prev, {
                                userId: hw.userId,
                                courseId: hw.courseId,
                                lessonId: hw.lessonId,
                                text: hw.text,
                                status: "accepted",
                                teacherComment: commentDraft
                              })
                            );
                            setToast("Домашка принята");
                            setTimeout(() => setToast(null), 1200);
                          }}
                          className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500"
                        >
                          Принять
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDb((prev) =>
                              upsertHomework(prev, {
                                userId: hw.userId,
                                courseId: hw.courseId,
                                lessonId: hw.lessonId,
                                text: hw.text,
                                status: "needs_changes",
                                teacherComment: commentDraft
                              })
                            );
                            setToast("Отправлено на доработку");
                            setTimeout(() => setToast(null), 1200);
                          }}
                          className="rounded-xl bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-500"
                        >
                          Доработать
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-slate-200 whitespace-pre-wrap">
                      {hw.text || "—"}
                    </div>

                    <div className="mt-4 grid gap-2">
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Комментарий</div>
                      <textarea
                        rows={3}
                        value={commentDraft}
                        onChange={(e) => setCommentDrafts((prev) => ({ ...prev, [hw.id]: e.target.value }))}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/60"
                        placeholder="Комментарий ученику…"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

