"use client";

import { useEffect, useState } from "react";
import { LocalFileUpload } from "@/components/admin/local-file-upload";
import type { ProgramInput } from "@/lib/validations/program";

type ProgramRow = {
  id: string;
  title: string;
  slug: string;
  status: string;
  topic?: string | null;
};

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

const emptyImage = { url: "", alt: "", assetType: "photo" as const, isCover: false };
const emptyMaterial = { label: "", url: "" };

const initialForm: ProgramInput = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  topic: "",
  targetAudience: "",
  duration: "",
  notes: "",
  category: "events",
  status: "draft",
  images: [],
  materials: [],
};

export function ProgramManager() {
  const [programs, setPrograms] = useState<ProgramRow[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [form, setForm] = useState<ProgramInput>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "", sortOrder: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadData() {
    setLoading(true);
    const [programsRes, categoriesRes] = await Promise.all([
      fetch("/api/admin/programs", { cache: "no-store" }),
      fetch("/api/admin/categories", { cache: "no-store" }),
    ]);
    const programsData = await programsRes.json();
    const categoriesData = await categoriesRes.json();
    setPrograms(programsData.programs ?? []);
    setCategories(categoriesData.categories ?? []);
    if (!programsRes.ok && programsData.message) {
      setMessage(programsData.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function saveProgram(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const payload: ProgramInput = {
      ...form,
      images: (form.images ?? []).filter((img) => img.url.trim()),
      materials: (form.materials ?? []).filter((m) => m.url.trim()),
    };

    const response = await fetch(editingId ? `/api/admin/programs/${editingId}` : "/api/admin/programs", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    setMessage(result.message ?? "");
    if (response.ok) {
      setForm(initialForm);
      setEditingId(null);
      await loadData();
    }
  }

  async function startEdit(id: string) {
    setMessage("");
    const response = await fetch(`/api/admin/programs/${id}`);
    const result = await response.json();
    if (!response.ok || !result.form) {
      setMessage(result.message ?? "לא ניתן לטעון תוכנית");
      return;
    }
    setEditingId(id);
    setForm(result.form);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function deleteProgram(id: string) {
    if (!confirm("למחוק את התוכנית?")) {
      return;
    }
    const response = await fetch(`/api/admin/programs/${id}`, { method: "DELETE" });
    const result = await response.json();
    setMessage(result.message ?? "");
    if (response.ok) {
      if (editingId === id) {
        cancelEdit();
      }
      await loadData();
    }
  }

  async function createCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryForm),
    });
    const result = await response.json();
    setMessage(result.message ?? "");
    if (response.ok) {
      setCategoryForm({ name: "", slug: "", sortOrder: 0 });
      await loadData();
    }
  }

  async function deleteCategory(id: string) {
    const response = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    const result = await response.json();
    setMessage(result.message ?? "");
    if (response.ok) {
      await loadData();
    }
  }

  const fieldClass = "w-full rounded-xl border border-stroke bg-transparent px-3 py-2";

  return (
    <section className="space-y-8">
      <form onSubmit={saveProgram} className="space-y-4 rounded-2xl border border-stroke bg-surface p-5">
        <h2 className="text-2xl font-bold">{editingId ? "עריכת תוכנית" : "יצירת תוכנית חדשה"}</h2>
        <p className="text-sm text-muted">רק שם התוכנית חובה. כל השאר אופציונלי — כולל קטגוריה ותיאורים.</p>

        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          className={fieldClass}
          placeholder="שם התוכנית *"
          required
        />

        <div className="grid gap-3 md:grid-cols-2">
          <select
            value={form.category ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                category: (e.target.value || undefined) as ProgramInput["category"],
              }))
            }
            className={fieldClass}
          >
            <option value="">ללא קטגוריה</option>
            <option value="events">אירועים</option>
            <option value="camp">מחנה</option>
            <option value="year-circle">מעגל השנה</option>
            <option value="workshops">סדנאות</option>
          </select>
          <input
            value={form.topic ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))}
            className={fieldClass}
            placeholder="נושא"
          />
        </div>

        <textarea
          value={form.shortDescription ?? ""}
          onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value }))}
          className={fieldClass}
          placeholder="תיאור קצר (פירוט)"
          rows={2}
        />
        <textarea
          value={form.fullDescription ?? ""}
          onChange={(e) => setForm((prev) => ({ ...prev, fullDescription: e.target.value }))}
          className={fieldClass}
          placeholder="פירוט מלא"
          rows={5}
        />

        <div className="grid gap-3 md:grid-cols-2">
          <input
            value={form.targetAudience ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, targetAudience: e.target.value }))}
            className={fieldClass}
            placeholder="קהל יעד"
          />
          <input
            value={form.duration ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
            className={fieldClass}
            placeholder="אורך (למשל: 3 שעות)"
          />
        </div>

        <textarea
          value={form.notes ?? ""}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          className={fieldClass}
          placeholder="הערות פנימיות (לא מוצג באתר)"
          rows={2}
        />

        <div className="rounded-xl border border-stroke p-4">
          <h3 className="mb-3 font-semibold">תמונות וגרפיקות</h3>
          <p className="mb-3 text-xs text-muted">העלאה מהמחשב (JPG, PNG, WEBP, GIF) או הדבקת קישור.</p>
          {(form.images ?? []).map((img, index) => (
            <div key={index} className="mb-3 grid gap-2 md:grid-cols-4">
              <select
                value={img.assetType}
                onChange={(e) => {
                  const images = [...(form.images ?? [])];
                  images[index] = { ...images[index], assetType: e.target.value as "photo" | "graphic" };
                  setForm((prev) => ({ ...prev, images }));
                }}
                className={fieldClass}
              >
                <option value="photo">תמונה</option>
                <option value="graphic">גרפיקה</option>
              </select>
              <div className="md:col-span-2 space-y-2">
                <input
                  value={img.url}
                  onChange={(e) => {
                    const images = [...(form.images ?? [])];
                    images[index] = { ...images[index], url: e.target.value };
                    setForm((prev) => ({ ...prev, images }));
                  }}
                  className={fieldClass}
                  placeholder="https://..."
                />
                <LocalFileUpload
                  accept="image/*"
                  label="בחרי תמונה מהמחשב"
                  onUploaded={(url) => {
                    const images = [...(form.images ?? [])];
                    images[index] = { ...images[index], url };
                    setForm((prev) => ({ ...prev, images }));
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    images: (prev.images ?? []).filter((_, i) => i !== index),
                  }))
                }
                className="rounded-full border border-brand-2 px-3 py-1 text-sm text-brand-2"
              >
                הסר
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, images: [...(prev.images ?? []), { ...emptyImage }] }))}
            className="text-sm text-brand"
          >
            + הוספת תמונה/גרפיקה
          </button>
        </div>

        <div className="rounded-xl border border-stroke p-4">
          <h3 className="mb-3 font-semibold">חומרים נלווים</h3>
          <p className="mb-3 text-xs text-muted">העלאת PDF או תמונה מהמחשב (עד 10MB).</p>
          {(form.materials ?? []).map((file, index) => (
            <div key={index} className="mb-3 grid gap-2 md:grid-cols-3">
              <input
                value={file.label ?? ""}
                onChange={(e) => {
                  const materials = [...(form.materials ?? [])];
                  materials[index] = { ...materials[index], label: e.target.value };
                  setForm((prev) => ({ ...prev, materials }));
                }}
                className={fieldClass}
                placeholder="שם הקובץ"
              />
              <div className="space-y-2">
                <input
                  value={file.url}
                  onChange={(e) => {
                    const materials = [...(form.materials ?? [])];
                    materials[index] = { ...materials[index], url: e.target.value };
                    setForm((prev) => ({ ...prev, materials }));
                  }}
                  className={fieldClass}
                  placeholder="https://..."
                />
                <LocalFileUpload
                  accept="image/*,application/pdf"
                  label="בחרי קובץ מהמחשב"
                  onUploaded={(url, fileName) => {
                    const materials = [...(form.materials ?? [])];
                    materials[index] = {
                      ...materials[index],
                      url,
                      label: materials[index].label || fileName,
                    };
                    setForm((prev) => ({ ...prev, materials }));
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    materials: (prev.materials ?? []).filter((_, i) => i !== index),
                  }))
                }
                className="rounded-full border border-brand-2 px-3 py-1 text-sm text-brand-2"
              >
                הסר
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({ ...prev, materials: [...(prev.materials ?? []), { ...emptyMaterial }] }))
            }
            className="text-sm text-brand"
          >
            + הוספת חומר
          </button>
        </div>

        <select
          value={form.status}
          onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ProgramInput["status"] }))}
          className={fieldClass}
        >
          <option value="draft">טיוטה</option>
          <option value="published">מפורסם באתר</option>
        </select>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="rounded-full bg-brand px-4 py-2 font-semibold text-[#041410]">
            {editingId ? "עדכון" : "שמירה"}
          </button>
          {editingId ? (
            <button type="button" onClick={cancelEdit} className="chip">
              ביטול עריכה
            </button>
          ) : null}
        </div>
        {message ? <p className="text-sm text-brand-2">{message}</p> : null}
      </form>

      <div className="rounded-2xl border border-stroke bg-surface p-5">
        <h2 className="mb-4 text-2xl font-bold">תוכניות קיימות</h2>
        {loading ? <p>טוען...</p> : null}
        <div className="space-y-3">
          {programs.map((program) => (
            <article
              key={program.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stroke p-3"
            >
              <div>
                <p className="font-semibold">{program.title}</p>
                <p className="text-sm text-muted">
                  {program.slug} · {program.status === "published" ? "מפורסם" : "טיוטה"}
                  {program.topic ? ` · ${program.topic}` : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(program.id)}
                  className="rounded-full border border-stroke px-3 py-1 text-sm"
                >
                  עריכה
                </button>
                <button
                  type="button"
                  onClick={() => deleteProgram(program.id)}
                  className="rounded-full border border-brand-2 px-3 py-1 text-sm text-brand-2"
                >
                  מחיקה
                </button>
              </div>
            </article>
          ))}
          {!loading && programs.length === 0 ? <p className="text-muted">אין תוכניות עדיין.</p> : null}
        </div>
      </div>

      <form onSubmit={createCategory} className="space-y-3 rounded-2xl border border-stroke bg-surface p-5">
        <h2 className="text-2xl font-bold">ניהול קטגוריות (מתקדם)</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={categoryForm.name}
            onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
            className={fieldClass}
            placeholder="שם"
            required
          />
          <input
            value={categoryForm.slug}
            onChange={(e) => setCategoryForm((prev) => ({ ...prev, slug: e.target.value }))}
            className={fieldClass}
            placeholder="slug"
            required
          />
          <input
            type="number"
            min={0}
            value={categoryForm.sortOrder}
            onChange={(e) => setCategoryForm((prev) => ({ ...prev, sortOrder: Number(e.target.value) || 0 }))}
            className={fieldClass}
            placeholder="סדר"
          />
        </div>
        <button type="submit" className="rounded-full bg-brand px-4 py-2 font-semibold text-[#041410]">
          הוספת קטגוריה
        </button>
        <div className="space-y-2">
          {categories.map((category) => (
            <article key={category.id} className="flex items-center justify-between rounded-xl border border-stroke p-3">
              <div>
                <p className="font-semibold">{category.name}</p>
                <p className="text-sm text-muted">{category.slug}</p>
              </div>
              <button
                onClick={() => deleteCategory(category.id)}
                type="button"
                className="rounded-full border border-brand-2 px-3 py-1 text-sm text-brand-2"
              >
                מחיקה
              </button>
            </article>
          ))}
        </div>
      </form>
    </section>
  );
}
