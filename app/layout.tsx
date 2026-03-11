import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "./_demo/DemoProvider";

export const metadata: Metadata = {
  title: "Ирина Иваненко",
  description: "Сайт эксперта: осознанность, медитация, курсы"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
