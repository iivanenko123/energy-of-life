export type DemoRole = "student" | "admin";

export type DemoUser = {
  id: string;
  phone: string;
  password: string;
  role: DemoRole;
  createdAt: string;
};

export type DemoCourse = {
  id: string;
  slug: string;
  title: string;
  priceRub: number | null;
  description: string;
  modules: DemoModule[];
};

export type DemoModule = {
  id: string;
  title: string;
  order: number;
  lessons: DemoLesson[];
};

export type DemoLessonType = "practice" | "theory" | "assignment" | "live";

export type DemoContentBlockType = "text" | "video" | "audio" | "link" | "assignment" | "live";

export type DemoContentBlock =
  | { id: string; type: "text"; title?: string; markdown: string }
  | { id: string; type: "video"; title?: string; url: string; provider?: "vk" | "rutube" | "youtube" | "other" }
  | { id: string; type: "audio"; title?: string; url: string }
  | { id: string; type: "link"; title?: string; url: string }
  | { id: string; type: "assignment"; title?: string; prompt: string }
  | { id: string; type: "live"; title?: string; startsAt: string; platform: "zoom" | "telegram" | "vk"; joinUrl: string; recordingUrl?: string };

export type DemoLesson = {
  id: string;
  title: string;
  type: DemoLessonType;
  dayOffset: number;
  requiresHomework: boolean;
  blocks: DemoContentBlock[];
};

export type DemoCohort = {
  id: string;
  courseId: string;
  title: string;
  startAt: string;
};

export type DemoEnrollment = {
  id: string;
  userId: string;
  courseId: string;
  cohortId: string;
  createdAt: string;
};

export type DemoHomeworkStatus = "draft" | "submitted" | "accepted" | "needs_changes";

export type DemoHomework = {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  text: string;
  status: DemoHomeworkStatus;
  teacherComment: string;
  updatedAt: string;
};

export type DemoDb = {
  version: number;
  users: DemoUser[];
  courses: DemoCourse[];
  cohorts: DemoCohort[];
  enrollments: DemoEnrollment[];
  homeworks: DemoHomework[];
  session: { userId: string | null };
};

const STORAGE_KEY = "demo_db_v1";

function safeJsonParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function nowIso() {
  return new Date().toISOString();
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function createSeedDb(): DemoDb {
  const courseId = uid("course");
  const cohortId = uid("cohort");

  const course: DemoCourse = {
    id: courseId,
    slug: "intuition",
    title: "Интуиция",
    priceRub: 6000,
    description: "Онлайн-курс в записи на 1 месяц. 4 модуля.",
    modules: [
      {
        id: uid("module"),
        title: "Модуль 1. Настройка восприятия",
        order: 1,
        lessons: [
          {
            id: uid("lesson"),
            title: "Урок 1. Опора и состояние",
            type: "theory",
            dayOffset: 0,
            requiresHomework: true,
            blocks: [
              {
                id: uid("block"),
                type: "text",
                title: "Суть",
                markdown:
                  "Цель урока — почувствовать опору на себя и научиться замечать состояние как основу любых решений."
              },
              {
                id: uid("block"),
                type: "assignment",
                title: "Домашнее задание",
                prompt: "Опишите в 5–10 предложениях: что сейчас является вашей опорой и что её разрушает?"
              }
            ]
          },
          {
            id: uid("lesson"),
            title: "Урок 2. Ясность: как её вернуть",
            type: "practice",
            dayOffset: 2,
            requiresHomework: true,
            blocks: [
              {
                id: uid("block"),
                type: "text",
                title: "Практика",
                markdown: "Короткая практика на наблюдение мыслей и возвращение внимания в тело."
              },
              {
                id: uid("block"),
                type: "assignment",
                title: "Домашнее задание",
                prompt: "Опишите наблюдения после практики: что стало яснее и что мешало удерживать внимание?"
              }
            ]
          }
        ]
      },
      {
        id: uid("module"),
        title: "Модуль 2. Чувствование",
        order: 2,
        lessons: [
          {
            id: uid("lesson"),
            title: "Урок 3. Чувствование себя",
            type: "practice",
            dayOffset: 4,
            requiresHomework: true,
            blocks: [
              {
                id: uid("block"),
                type: "text",
                markdown: "Практика на контакт с ощущениями и распознавание сигналов тела."
              },
              {
                id: uid("block"),
                type: "assignment",
                prompt: "Запишите 3 сигнала тела за день и что вы сделали в ответ на них."
              }
            ]
          }
        ]
      },
      {
        id: uid("module"),
        title: "Модуль 3. Решения",
        order: 3,
        lessons: [
          {
            id: uid("lesson"),
            title: "Урок 4. Решения из целостности",
            type: "theory",
            dayOffset: 6,
            requiresHomework: true,
            blocks: [
              {
                id: uid("block"),
                type: "text",
                markdown: "Как принимать решения, удерживая баланс духовного и материального."
              },
              {
                id: uid("block"),
                type: "assignment",
                prompt:
                  "Опишите ситуацию «по-старому не хочу, по-новому не знаю как» и шаг, который вы готовы сделать."
              }
            ]
          }
        ]
      },
      {
        id: uid("module"),
        title: "Модуль 4. Интеграция",
        order: 4,
        lessons: [
          {
            id: uid("lesson"),
            title: "Урок 5. Интеграция и ритм",
            type: "practice",
            dayOffset: 8,
            requiresHomework: true,
            blocks: [
              {
                id: uid("block"),
                type: "text",
                markdown: "Собираем личный ритм практики, чтобы состояние стало устойчивым."
              },
              {
                id: uid("block"),
                type: "assignment",
                prompt: "Составьте план практики на 7 дней: время, длительность, формат."
              }
            ]
          }
        ]
      }
    ]
  };

  const admin: DemoUser = {
    id: uid("user"),
    phone: "+79990000000",
    password: "admin",
    role: "admin",
    createdAt: nowIso()
  };

  const student: DemoUser = {
    id: uid("user"),
    phone: "+79991112233",
    password: "demo",
    role: "student",
    createdAt: nowIso()
  };

  const cohort: DemoCohort = {
    id: cohortId,
    courseId,
    title: "Поток 1",
    startAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  };

  const enrollment: DemoEnrollment = {
    id: uid("enroll"),
    userId: student.id,
    courseId,
    cohortId,
    createdAt: nowIso()
  };

  return {
    version: 1,
    users: [admin, student],
    courses: [course],
    cohorts: [cohort],
    enrollments: [enrollment],
    homeworks: [],
    session: { userId: null }
  };
}

export function loadDemoDb(): DemoDb {
  if (typeof window === "undefined") {
    return createSeedDb();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeJsonParse<DemoDb>(raw) : null;
  if (parsed && parsed.version === 1) return parsed;

  const seed = createSeedDb();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

export function saveDemoDb(db: DemoDb) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function resetDemoDb() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function getSessionUser(db: DemoDb): DemoUser | null {
  const userId = db.session.userId;
  if (!userId) return null;
  return db.users.find((u) => u.id === userId) ?? null;
}

export function login(db: DemoDb, phone: string, password: string): DemoDb {
  const user = db.users.find((u) => u.phone.trim() === phone.trim() && u.password === password) ?? null;
  if (!user) throw new Error("Неверный телефон или пароль");
  return { ...db, session: { userId: user.id } };
}

export function logout(db: DemoDb): DemoDb {
  return { ...db, session: { userId: null } };
}

export function registerStudent(db: DemoDb, phone: string, password: string): DemoDb {
  const normalizedPhone = phone.trim();
  if (!normalizedPhone) throw new Error("Телефон обязателен");
  if (password.length < 4) throw new Error("Пароль должен быть минимум 4 символа");
  if (db.users.some((u) => u.phone.trim() === normalizedPhone)) throw new Error("Пользователь с таким телефоном уже есть");

  const student: DemoUser = {
    id: uid("user"),
    phone: normalizedPhone,
    password,
    role: "student",
    createdAt: nowIso()
  };

  return {
    ...db,
    users: [...db.users, student],
    session: { userId: student.id }
  };
}

export function setCohortStartAt(db: DemoDb, cohortId: string, startAtIso: string): DemoDb {
  const cohorts = db.cohorts.map((c) => (c.id === cohortId ? { ...c, startAt: startAtIso } : c));
  return { ...db, cohorts };
}

export function ensureEnrollment(db: DemoDb, userId: string, courseId: string, cohortId: string): DemoDb {
  const exists = db.enrollments.some((e) => e.userId === userId && e.courseId === courseId && e.cohortId === cohortId);
  if (exists) return db;
  const enrollment: DemoEnrollment = { id: uid("enroll"), userId, courseId, cohortId, createdAt: nowIso() };
  return { ...db, enrollments: [...db.enrollments, enrollment] };
}

export function upsertHomework(
  db: DemoDb,
  input: { userId: string; courseId: string; lessonId: string; text: string; status: DemoHomeworkStatus; teacherComment?: string }
): DemoDb {
  const existing = db.homeworks.find((h) => h.userId === input.userId && h.lessonId === input.lessonId) ?? null;
  const updatedAt = nowIso();

  if (!existing) {
    const hw: DemoHomework = {
      id: uid("hw"),
      userId: input.userId,
      courseId: input.courseId,
      lessonId: input.lessonId,
      text: input.text,
      status: input.status,
      teacherComment: input.teacherComment ?? "",
      updatedAt
    };
    return { ...db, homeworks: [...db.homeworks, hw] };
  }

  const homeworks = db.homeworks.map((h) =>
    h.id === existing.id
      ? { ...h, text: input.text, status: input.status, teacherComment: input.teacherComment ?? h.teacherComment, updatedAt }
      : h
  );

  return { ...db, homeworks };
}

export function getHomework(db: DemoDb, userId: string, lessonId: string): DemoHomework | null {
  return db.homeworks.find((h) => h.userId === userId && h.lessonId === lessonId) ?? null;
}

export function computeLessonUnlockAt(cohortStartAtIso: string, dayOffset: number): Date {
  const start = new Date(cohortStartAtIso);
  return new Date(start.getTime() + dayOffset * 24 * 60 * 60 * 1000);
}

