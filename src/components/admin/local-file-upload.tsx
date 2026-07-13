"use client";

import { useState } from "react";

type Props = {
  accept?: string;
  label?: string;
  multiple?: boolean;
  onUploaded: (url: string, fileName: string) => void;
};

export function LocalFileUpload({
  accept = "image/*,application/pdf",
  label = "העלאה מהמחשב",
  multiple = false,
  onUploaded,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progressText, setProgressText] = useState("");

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      for (const [index, file] of files.entries()) {
        setProgressText(files.length > 1 ? `מעלה ${index + 1} מתוך ${files.length}...` : "מעלה...");

        const body = new FormData();
        body.append("file", file);

        const response = await fetch("/api/admin/upload", { method: "POST", body });
        const result = await response.json();
        if (!response.ok || !result.url) {
          setError(result.message ?? "העלאה נכשלה");
          return;
        }

        onUploaded(result.url, file.name);
      }
    } catch {
      setError("שגיאת רשת בהעלאה");
    } finally {
      setProgressText("");
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-brand">
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          disabled={uploading}
          onChange={handleChange}
        />
        <span className="rounded-full border border-brand px-3 py-1">
          {uploading ? progressText || "מעלה..." : label}
        </span>
      </label>
      {error ? <span className="text-xs text-brand-2">{error}</span> : null}
    </div>
  );
}
