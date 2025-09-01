"use client";
import React, { useEffect } from "react";
import { useToast, useTranslate } from "@hooks";
import { Link, useRouter } from "@navigation";
import { FormikHelpers } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button, DynamicForm, GrowSpinner } from "@components";
import * as Yup from "yup";
import { Regex } from "@lib/regex";
import { useLocale } from "next-intl";
// import { Actions } from "@lib/actions";
export const CsrLogin = () => {
  const t = useTranslate("auth");
  const { toast } = useToast();
  const locale = useLocale();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(searchParams.get("callbackUrl") ?? "/");
    }
  }, [status, router, searchParams]);

  const fields = [
    {
      name: "email",
      type: "text",
      label: t("email"),
      placeholder: t("email"),
      className: "h-8",
    },
    {
      name: "password",
      type: "password",
      placeholder: t("password"),
      label: (
        <div className="flex items-center justify-between gap-2 text-sm">
          <label>{t("password")}</label>
          <Link href="/reset-password" className="hover:underline text-primary">
            {t("forgot-password")}
          </Link>
        </div>
      ),
    },
  ];
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        Regex.format.EmailFormat,
        Regex.message[locale as "ar" | "en"].EmailFormat
      )
      .required(t("email-required")),
    password: Yup.string()
      .matches(
        Regex.format.PasswordRegExp,
        Regex.message[locale as "ar" | "en"].PasswordRegExp
      )
      .required(t("password-required")),
  });
  const onSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
    // const { data } = await Actions.auth.Login({
    //   email: values.email,
    //   password: values.password,
    // });

    await signIn("credentials", {
      jwt: JSON.stringify({
        id: "akhsfl",
        username: "yasser-alnajjar",
        email: "yasseralnajjar@gmail.com",
        first_name: "yasser",
        last_name: "alnajjar",
        updated_at: "2024-01-01",
        created_at: "2023-01-01",
      }),
      redirect: true,
      callbackUrl: searchParams.get("callbackUrl") ?? "/",
    });

    toast({
      title: t("login-success"),
      description: t("welcome-back"),
    });
    formikHelpers.setSubmitting(false);
  };

  return (
    <div className="flex items-center lg:gap-10 gap-4 h-screen">
      <div className="max-w-lg w-full p-4 mx-auto">
        <h1 className="text-center text-4xl font-extrabold mb-4">
          {t("login")}
        </h1>
        <DynamicForm
          fields={fields}
          initialValues={{
            email: "admin@example.com",
            password: "password",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <div className="flex w-full justify-center mt-4">
                <Button
                  type="submit"
                  className="w-full h-12 flex items-center justify-center gap-1"
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting ? (
                    <GrowSpinner className="bg-white dark:bg-background" />
                  ) : (
                    t("login")
                  )}
                </Button>
              </div>
            );
          }}
        </DynamicForm>
      </div>
    </div>
  );
};
