// src/components/request-form.tsx
"use client"

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitServiceRequest } from "@/lib/api";
import { AttachmentGallery } from "./attachment-gallery";
import { v4 as uuidv4 } from "uuid";

interface LocalFile {
  id: string;
  file: File;
  preview?: string;
}

interface Props {
  tenant: string;
  onSuccess?: () => void;
}

export function RequestForm({ tenant, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<string>("other");
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const allowedTypes = [
    { id: "leak", label: "Leak" },
    { id: "no-water", label: "No Water" },
    { id: "billing", label: "Billing" },
    { id: "other", label: "Other" },
  ];

  // create preview for images
  const toLocalFile = (file: File) =>
    new Promise<LocalFile>((resolve) => {
      const id = uuidv4();
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({ id, file, preview: String(reader.result) });
        };
        reader.readAsDataURL(file);
      } else {
        resolve({ id, file });
      }
    });

  const handleFiles = async (filesList: FileList | null) => {
    if (!filesList) return;
    const arr: File[] = [];
    for (let i = 0; i < filesList.length; i++) arr.push(filesList[i]);
    // optional: limit number & size
    const local = await Promise.all(arr.map((f) => toLocalFile(f)));
    setLocalFiles((prev) => [...prev, ...local]);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // reset input to allow same file reselect
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeLocalFile = (id: string) => {
    setLocalFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!title || !description) {
      setError("Please provide a title and description");
      return;
    }
    setLoading(true);
    try {
      // extract File[] from localFiles
      const files = localFiles.map((lf) => lf.file);
      await submitServiceRequest(tenant, { title, description, type, files });
      setTitle("");
      setDescription("");
      setLocalFiles([]);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.response?.data?.detail || err.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <label className="text-sm font-medium block mb-1">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Type</label>
        <Select value={type} onValueChange={(v) => setType(v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {allowedTypes.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Description</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Attach files (images & documents) — optional</label>

        <div className="flex items-center gap-3">
          <input ref={fileInputRef} type="file" multiple onChange={onFileInputChange} className="text-sm" />
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm">Choose files</Button>
        </div>

        {localFiles.length > 0 || <div className="text-sm text-muted-foreground mt-2">No files attached</div>}

        {localFiles.length > 0 && (
          <div className="mt-3">
            <AttachmentGallery
              localFiles={localFiles}
              remoteAttachments={[]}
              onRemoveLocal={removeLocalFile}
            />
          </div>
        )}
      </div>

      <div>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </div>
  );
}
