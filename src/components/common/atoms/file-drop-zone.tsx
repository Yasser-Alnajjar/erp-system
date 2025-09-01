"use client";

import React, { useRef, useState } from "react";
import { Check, UploadCloud } from "lucide-react";
import { Button } from "@components";
import { cn } from "@lib/utils";

interface FileDropZoneProps {
  value?: File[];
  multiple?: boolean;
  onChange?: (files: File[]) => void;
}

export function FileDropZone({
  multiple,
  value = [],
  onChange,
}: FileDropZoneProps) {
  const [files, setFiles] = useState<File[]>(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const fileArray = Array.from(fileList);
    setFiles(fileArray);
    onChange?.(fileArray);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <div className="w-full space-y-4">
      {/* صندوق الرفع */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          "w-full border-2 border-input border-dashed rounded-xl text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center px-4 py-16 bg-blue-50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <UploadCloud className="w-10 h-10 mb-2" />
        <p className="font-bold">اسحب و أفلت الملفات هنا للرفع</p>
        <p className="text-sm font-light">
          الحد الأقصى لحجم الملف المسموح به هو 10 ميجا بايت، وتشمل الصيغ
          المدعومة .jpg و .png و .pdf
        </p>

        <Button className="mt-4 rounded-md px-4 py-2">تصفح الملفات</Button>
      </div>
      {files.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center justify-between border rounded-xl px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center size-5 bg-primary text-cta-foreground rounded-full">
                <Check size={14} />
              </span>
              <span className="">{files[0].name}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-between border rounded-xl px-4 py-2">
            {files[0].type}
          </div>
        </div>
      )}
    </div>
  );
}
