"use client";

import React from "react";
import { loadDemoDb, saveDemoDb, type DemoDb } from "./storage";

type DemoContextValue = {
  db: DemoDb;
  setDb: (next: DemoDb | ((prev: DemoDb) => DemoDb)) => void;
};

const DemoContext = React.createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [db, setDbState] = React.useState<DemoDb>(() => loadDemoDb());

  const setDb = React.useCallback((next: DemoDb | ((prev: DemoDb) => DemoDb)) => {
    setDbState((prev) => {
      const computed = typeof next === "function" ? (next as (p: DemoDb) => DemoDb)(prev) : next;
      saveDemoDb(computed);
      return computed;
    });
  }, []);

  const value = React.useMemo<DemoContextValue>(() => ({ db, setDb }), [db, setDb]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = React.useContext(DemoContext);
  if (!ctx) throw new Error("DemoProvider is missing");
  return ctx;
}

