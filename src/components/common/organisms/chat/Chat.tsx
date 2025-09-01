"use client";
import React, { useState } from "react";
import {
  Button,
  FieldRenderer,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components";
import { ChevronsRight, MessageCircleMore } from "lucide-react";
import { Form, FormikProvider, useFormik } from "formik";
import { cn } from "@lib/utils";

export const Chat = () => {
  const [messages, setMessages] = useState<Array<string>>([]);
  const initialValues = {
    message: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      setMessages([...messages, values.message]);
      resetForm();
    },
    enableReinitialize: true,
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed size-12 bottom-10 end-8 z-40 rounded-full">
          <MessageCircleMore />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col border border-gray-300 bg-gray-300 p-0">
        <SheetHeader closeClassName="hidden" className="flex-col px-8 py-4">
          <div className="flex items-center justify-between w-full">
            <SheetTitle>Chat</SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-foreground/20 rounded-full"
              >
                <ChevronsRight size={14} />
              </Button>
            </SheetClose>
          </div>
          <SheetDescription className="text-xs">
            (BETA) Ask the AI anything. Please click
            <span className="text-primary underline cursor-pointer px-1">
              here
            </span>
            if you need help from a human.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 max-h-full overflow-y-auto">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <div className="mb-4 last:mb-0 flex justify-end px-8">
                <div
                  className={cn(
                    "relative  bg-chat text-white text-xs px-4 py-2 rounded-2xl rounded-ee-none w-fit",
                    "before:absolute before:bottom-0 before:bg-chat before:-end-2 before:size-4 before:[clip-path:polygon(0_37%,_0_100%,_100%_100%)]"
                  )}
                >
                  {message}
                </div>
              </div>
              <div className="mb-4 last:mb-0  px-8">
                <div
                  className={cn(
                    "relative mb-4 last:mb-0 bg-chat text-white text-xs px-4 py-2 rounded-2xl rounded-es-none w-fit",
                    "before:absolute before:bottom-0 before:bg-chat before:-start-2 before:size-4 before:[clip-path:polygon(100%_37%,_0_100%,_100%_100%)]"
                  )}
                >
                  We are still in beta! Coming soon!
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <SheetFooter className="p-4 pt-0">
          <FormikProvider value={formik}>
            <Form
              onSubmit={formik.handleSubmit}
              className="w-full flex items-center gap-2"
            >
              <FieldRenderer
                field={{
                  name: "message",
                  label: "Message",
                  type: "text",
                  placeholder: "Waiting on your question...",
                  col: "col-span-12",
                  className: "bg-gray-100",
                }}
              />
              <Button
                variant="success"
                type="submit"
                disabled={!formik.values.message}
              >
                Send
              </Button>
            </Form>
          </FormikProvider>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
