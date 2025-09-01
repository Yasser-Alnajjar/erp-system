import React, { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import { ThemeProvider, Toaster } from "@components";
import { routing } from "@navigation";
import AuthProvider from "src/AuthProvider";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout(props: Props) {
  const { params, children } = props;
  const locale = (await params).locale;

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(error);
  }
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  if (!messages) notFound();
  else {
    const layoutDir = locale === "ar" ? "rtl" : "ltr";
    return (
      <html
        lang={locale}
        dir={layoutDir}
        data-layout-dir={layoutDir}
        suppressHydrationWarning
      >
        <body dir={layoutDir}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster />
                <main className="flex flex-1 flex-col gap-4  mx-10">
                  {children}
                </main>
              </ThemeProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }
}
