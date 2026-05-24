"use client";

import { useState } from "react";

type Props = {
  accept?: string;
  label?: string;
  onUploaded: (url: string, fileName: string) => void;
};

export function LocalFileUpload({
  accept = "image/*,application/pdf",
  label = "העלאה מהמחשב",
  onUploaded,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    setUploading(true);
    setError("");

    const body = new FormData();
    body.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok || !result.url) {
        setError(result.message ?? "העלאה נכשלה");
        return;
      }
      onUploaded(result.url, file.name);
    } catch {
      setError("שגיאת רשת בהעלאה");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-brand">
        <input type="file" accept={accept} className="hidden" disabled={uploading} onChange={handleChange} />
        <span className="rounded-full border border-brand px-3 py-1">
          {uploading ? "מעלה..." : label}
        </span>
      </label>
      {error ? <span className="text-xs text-brand-2">{error}</span> : null}
    </div>
  );
}
