// src/components/attachment-gallery.tsx
"use client"

import React, { useState } from "react";
import { AttachmentPreview } from "./attachment-preview";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

type RemoteAttachment = {
  id?: string | number;
  url: string;
  filename?: string;
  content_type?: string;
};

type Props = {
  remoteAttachments?: RemoteAttachment[]; // attachments from backend
  localFiles?: { id: string; file: File; preview?: string }[]; // previews for upload UX
  onRemoveLocal?: (id: string) => void;
  onRemoveRemote?: (id: string | number) => void;
};

export function AttachmentGallery({ remoteAttachments = [], localFiles = [], onRemoveLocal, onRemoveRemote }: Props) {
  const [open, setOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const openViewer = (url: string) => {
    setActiveUrl(url);
    setOpen(true);
  };

  const all = [
    ...localFiles.map((f) => ({ type: "local", src: f.preview || "", id: f.id, file: f.file })),
    ...remoteAttachments.map((a) => ({ type: "remote", src: a.url, id: a.id, file: a })),
  ] as any[];

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {localFiles.map((f) => (
          <div key={f.id} onClick={() => f.preview && openViewer(f.preview)} role="button">
            <AttachmentPreview kind="local" file={f} onRemove={onRemoveLocal} />
          </div>
        ))}

        {remoteAttachments.map((a) => (
          <div key={a.id ?? a.url} onClick={() => openViewer(a.url)} role="button">
            <AttachmentPreview kind="remote" file={a} onRemove={() => onRemoveRemote?.(a.id as any)} openInNewTab={false} />
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/60" aria-hidden />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-card max-w-3xl w-full rounded-md overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="text-sm font-medium">Attachment</div>
              <button onClick={() => setOpen(false)} className="p-2">
                <X />
              </button>
            </div>
            <div className="p-4">
              {activeUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={activeUrl} alt="attachment" className="w-full max-h-[70vh] object-contain" />
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
