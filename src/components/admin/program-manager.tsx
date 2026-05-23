"use client";

import { useEffect, useState } from "react";

type ProgramRow = {
  id: string;
  title: string;
  slug: string;
};

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

type ProgramInput = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: "events" | "camp" | "year-circle" | "workshops";
  status: "draft" | "published";
};

const initialForm: ProgramInput = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  category: "events",
  status: "draft",
};

export function ProgramManager() {
  const [programs, setPrograms] = useState<ProgramRow[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [form, setForm] = useState<ProgramInput>(initialForm);
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
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, []);

  async function createProgram(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/admin/programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    setMessage(result.message ?? "");
    if (response.ok) {
      setForm(initialForm);
      await loadData();
    }
  }

  async function deleteProgram(id: string) {
    const response = await fetch(`/api/admin/programs/${id}`, { method: "DELETE" });
    const result = await response.json();
    setMessage(result.message ?? "");
    if (response.ok) {
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

  return (
    <section className="space-y-8">
      <form onSubmit={createProgram} className="space-y-3 rounded-2xl border border-stroke bg-surface p-5">
        <h2 className="text-2xl font-bold">יצירת תוכנית חדשה</h2>
        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full rounded-xl border border-stroke bg-transparent px-3 py-2"
          placeholder="שם תוכנית"
          required
        />
        <input
          value={form.slug}
          onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
          className="w-full rounded-xl border border-stroke bg-transparent px-3 py-2"
          placeholder="slug באנגלית"
          required
        />
        <textarea
          value={form.shortDescription}
          onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value }))}
          className="w-full rounded-xl border border-stroke bg-transparent px-3 py-2"
          placeholder="תיאור קצר"
          required
        />
        <textarea
          value={form.fullDescription}
          onChange={(e) => setForm((prev) => ({ ...prev, fullDescription: e.target.value }))}
          className="w-full rounded-xl border border-stroke bg-transparent px-3 py-2"
          placeholder="תיאור מלא"
          rows={5}
          required
        />
        <div className="grid gap-3 md:grid-cols-2">
          <select
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as ProgramInput["category"] }))}
            className="rounded-xl border border-stroke bg-transparent px-3 py-2"
          >
            <option value="events">אירועים</option>
            <option value="camp">מחנה</option>
            <option value="year-circle">מעגל השנה</option>
            <option value="workshops">סדנאות</option>
          </select>
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ProgramInput["status"] }))}
            className="rounded-xl border border-stroke bg-transparent px-3 py-2"
          >
            <option value="draft">טיוטה</option>
            <option value="published">מפורסם</option>
          </select>
        </div>
        <button type="submit" className="rounded-full bg-brand px-4 py-2 font-semibold text-[#041410]">
          שמירה
        </button>
        {message ? <p className="text-sm text-brand-2">{message}</p> : null}
      </form>

      <div className="rounded-2xl border border-stroke bg-surface p-5">
        <h2 className="mb-4 text-2xl font-bold">תוכניות קיימות</h2>
        {loading ? <p>טוען...</p> : null}
        <div className="space-y-3">
          {programs.map((program) => (
            <article key={program.id} className="flex items-center justify-between rounded-xl border border-stroke p-3">
              <div>
                <p className="font-semibold">{program.title}</p>
                <p className="text-sm text-muted">{program.slug}</p>
              </div>
              <button
                onClick={() => deleteProgram(program.id)}
                className="rounded-full border border-brand-2 px-3 py-1 text-sm text-brand-2"
              >
                מחיקה
              </button>
            </article>
          ))}
        </div>
      </div>
      <form onSubmit={createCategory} className="space-y-3 rounded-2xl border border-stroke bg-surface p-5">
        <h2 className="text-2xl font-bold">ניהול קטגוריות</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={categoryForm.name}
            onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
            className="rounded-xl border border-stroke bg-transparent px-3 py-2"
            placeholder="שם"
            required
          />
          <input
            value={categoryForm.slug}
            onChange={(e) => setCategoryForm((prev) => ({ ...prev, slug: e.target.value }))}
            className="rounded-xl border border-stroke bg-transparent px-3 py-2"
            placeholder="slug"
            required
          />
          <input
            type="number"
            min={0}
            value={categoryForm.sortOrder}
            onChange={(e) => setCategoryForm((prev) => ({ ...prev, sortOrder: Number(e.target.value) || 0 }))}
            className="rounded-xl border border-stroke bg-transparent px-3 py-2"
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
