// src/components/attachment-preview.tsx
"use client"

import React from "react";
import { FileText, ImageIcon } from "lucide-react";
import clsx from "clsx";

type LocalFile = {
  id: string; // unique local id (Date.now+index)
  file: File;
  preview?: string; // local data url for image preview
};

type RemoteAttachment = {
  id?: number | string;
  url: string;
  filename?: string;
  content_type?: string;
};

type Props =
  | { kind: "local"; file: LocalFile; onRemove?: (id: string) => void }
  | { kind: "remote"; file: RemoteAttachment; onRemove?: () => void; openInNewTab?: boolean };

export function AttachmentPreview(props: Props) {
  if (props.kind === "local") {
    const { file, onRemove } = props;
    const isImage = file.file.type.startsWith("image/");
    return (
      <div className="relative w-28">
        <div className="h-20 w-28 rounded-md overflow-hidden border bg-card flex items-center justify-center">
          {isImage && file.preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={file.preview} alt={file.file.name} className="object-cover h-full w-full" />
          ) : (
            <div className="flex flex-col items-center justify-center text-sm text-muted-foreground p-2">
              <FileText className="mb-1" />
              <div className="leading-tight text-xs text-center">{file.file.name}</div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs line-clamp-1">{file.file.name}</div>
          {onRemove && (
            <button
              onClick={() => onRemove(file.id)}
              className="ml-2 text-xs text-red-600 hover:underline"
              aria-label={`Remove ${file.file.name}`}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    );
  }

  // remote
  const { file, onRemove, openInNewTab } = props;
  const isImage = file.content_type?.startsWith?.("image/") ?? file.url.match(/\.(jpeg|jpg|png|gif|webp)$/i);
  const filename = file.filename || file.url.split("/").pop() || "attachment";
  return (
    <div className="relative w-28">
      <div className="h-20 w-28 rounded-md overflow-hidden border bg-card flex items-center justify-center">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={file.url} alt={filename} className="object-cover h-full w-full" />
        ) : (
          <div className="flex flex-col items-center justify-center text-sm text-muted-foreground p-2">
            <FileText className="mb-1" />
            <div className="leading-tight text-xs text-center">{filename}</div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <a
          href={file.url}
          target={openInNewTab ? "_blank" : "_self"}
          rel="noreferrer"
          className="text-xs line-clamp-1 hover:underline"
        >
          {filename}
        </a>
        {onRemove && (
          <button
            onClick={() => onRemove()}
            className="ml-2 text-xs text-red-600 hover:underline"
            aria-label={`Remove ${filename}`}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
