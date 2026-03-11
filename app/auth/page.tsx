"use client";

import Link from "next/link";
import React from "react";
import { useDemo } from "../_demo/DemoProvider";
import { getSessionUser, login, logout, registerStudent, resetDemoDb } from "../_demo/storage";

export default function AuthPage() {
  const { db, setDb } = useDemo();
  const user = getSessionUser(db);

  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mode, setMode] = React.useState<"login" | "register">("login");
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Демо-кабинет</div>
            <h1 className="mt-3 text-3xl font-semibold">Вход / Регистрация</h1>
            <p className="mt-3 text-slate-300">
              Режим A: данные сохраняются в браузере. Для проверки есть тестовые пользователи.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link href="/" className="text-sm text-slate-300 hover:text-white">
              На лендинг
            </Link>
            <Link href="/cabinet" className="text-sm text-slate-300 hover:text-white">
              В кабинет
            </Link>
            <Link href="/admin" className="text-sm text-slate-300 hover:text-white">
              В админку
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          {user ? (
            <div className="space-y-4">
              <div className="text-sm text-slate-300">
                Вы вошли как <span className="font-semibold text-white">{user.phone}</span> (
                <span className="text-slate-200">{user.role}</span>)
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={user.role === "admin" ? "/admin" : "/cabinet"}
                  className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                >
                  Перейти
                </Link>
                <button
                  type="button"
                  onClick={() => setDb((prev) => logout(prev))}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Выйти
                </button>
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
          ) : (
            <>
              <div className="mb-6 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                  }}
                  className={[
                    "rounded-xl px-4 py-2 text-sm font-semibold",
                    mode === "login" ? "bg-white text-black" : "bg-white/5 text-white hover:bg-white/10"
                  ].join(" ")}
                >
                  Вход
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError(null);
                  }}
                  className={[
                    "rounded-xl px-4 py-2 text-sm font-semibold",
                    mode === "register" ? "bg-white text-black" : "bg-white/5 text-white hover:bg-white/10"
                  ].join(" ")}
                >
                  Регистрация
                </button>
              </div>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setError(null);
                  try {
                    setDb((prev) => {
                      const next = mode === "login" ? login(prev, phone, password) : registerStudent(prev, phone, password);
                      return next;
                    });
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Ошибка");
                  }
                }}
              >
                <div className="grid gap-2">
                  <label className="text-sm text-slate-300">Телефон</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+79991112233"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-500/60"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-slate-300">Пароль</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="••••"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-500/60"
                  />
                </div>

                {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm">{error}</div> : null}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
                >
                  {mode === "login" ? "Войти" : "Зарегистрироваться"}
                </button>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  <div className="font-semibold text-white">Тестовые данные</div>
                  <div className="mt-2 grid gap-1">
                    <div>
                      Админ: <span className="text-white">+79990000000</span> / <span className="text-white">admin</span>
                    </div>
                    <div>
                      Ученик: <span className="text-white">+79991112233</span> / <span className="text-white">demo</span>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

