"use client";

import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { Button } from "@components";
import type { IComment } from "@types";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { cn } from "@lib/utils";

export const Comments = ({
  data,
  onSubmit,
  className,
}: {
  data: Array<IComment>;
  onSubmit?: (value: any) => void;
  className?: string;
}) => {
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formik = useFormik({
    initialValues: { message: "" },
    onSubmit: (values, { resetForm }) => {
      if (!values.message.trim()) return;
      if (onSubmit) onSubmit?.(values);
      resetForm();
    },
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        formik.handleSubmit();
      }
    },
    [formik]
  );

  const formattedDates = useMemo(() => {
    return data.reduce((acc, comment) => {
      acc[comment.id] = new Date(comment.created_at).toLocaleDateString(
        "en-US",
        {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
      return acc;
    }, {} as Record<string, string>);
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <div className={cn("flex flex-col  relative", className)}>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 mb-6">
        {data.length > 0 ? (
          data.map((item, index) => {
            const isCurrentUser = item.author_email === session?.user?.email;

            return (
              <div
                key={index}
                className={`max-w-[80%] flex gap-2 rounded-lg p-3 ${
                  isCurrentUser ? "mr-auto" : "ms-auto flex-row-reverse"
                }`}
              >
                <div
                  className={cn(
                    `row-span-2 shrink-0 self-end inline-flex items-center justify-center !size-8 rounded-full text-xs font-medium uppercase bg-chat text-white`
                  )}
                >
                  {item.author_email?.at(0)}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-xs mb-1 flex flex-col">
                    <span className="text-xs opacity-50">
                      {formattedDates[item.id]}
                    </span>
                    <p className="font-normal">{item.author_email}</p>
                  </div>

                  <div
                    className={cn(
                      `relative rounded-2xl px-4 py-2 text-sm max-w-[90%] min-w-full min-h-[2.75rem] bg-chat text-white`,
                      isCurrentUser
                        ? "rounded-es-none  before:absolute before:bottom-0 before:bg-chat before:-start-3 before:size-4 before:[clip-path:polygon(100%_37%,_0_100%,_100%_100%)]"
                        : "rounded-ee-none before:absolute before:bottom-0 before:bg-chat before:-end-3 before:size-4 before:[clip-path:polygon(0_37%,_0_100%,_100%_100%)]"
                    )}
                  >
                    {item.message}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center min-h-96">
            <h2 className="text-xl font-semibold">No Comments!</h2>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="sticky bottom-2 left-0 border-t p-3 pe-2 gap-2 flex h-10 items-center w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-xs"
      >
        <input
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 h-8 focus:outline-none bg-transparent"
        />
        <Button type="submit" className="h-7">
          Send
        </Button>
      </form>
    </div>
  );
};
