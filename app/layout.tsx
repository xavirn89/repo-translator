import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Author } from "next/dist/lib/metadata/types/metadata-types";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Repo Translator - Genera archivos de traducción fácilmente",
  description: "Usa Repo Translator para generar fácilmente archivos de traducción para tu proyecto con un enlace a tu repositorio en GitHub. Identificación de texto visible y generación de archivos de traducción para todos los idiomas seleccionados mediante IA.",
  keywords: ["traducción", "GitHub", "repositorio", "IA", "archivos de traducción", "localización"],
  authors: [{ name: "Xavi Ramon Nicolau" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content={metadata.description || ""} />
        <meta name="keywords" content={(metadata.keywords as string[])?.join(", ")} />
        <meta name="author" content={(metadata.authors as Author[]).map((author) => author.name).join(", ")} />
        <title>{metadata.title as string}</title>
        {/* Puedes agregar más metadatos aquí según sea necesario */}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
