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

/** סגנונות מותאמים לעיצוב נקי, מקצועי ובוגר */
const styles = {
  card: "rounded-lg bg-white shadow-sm border border-[#e5e7eb] p-6 md:p-8",
  cardHeader: "text-xl md:text-2xl font-bold text-[#111827] mb-1",
  cardDesc: "text-sm text-[#6b7280] mb-6",
  field: "w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4FDAB3]/30 focus:border-[#4FDAB3] transition",
  label: "block text-sm font-medium text-[#374151] mb-1",
  btnPrimary: "rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#111827] hover:bg-[#f3f4f6] transition disabled:opacity-40",
  btnSecondary: "rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition",
  btnDanger: "rounded-md border border-[#fca5a5] bg-white px-4 py-2 text-sm font-medium text-[#dc2626] hover:bg-[#fef2f2] transition",
  badgePublished: "inline-flex items-center rounded-md bg-[#dcfce7] px-2 py-0.5 text-xs font-medium text-[#166534]",
  badgeDraft: "inline-flex items-center rounded-md bg-[#f3f4f6] px-2 py-0.5 text-xs font-medium text-[#6b7280]",
  sectionTitle: "text-base font-semibold text-[#111827] mb-3",
};

export function ProgramManager() {
  const [programs, setPrograms] = useState<ProgramRow[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [form, setForm] = useState<ProgramInput>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "", sortOrder: 0 });
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

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
      showMessage(programsData.message, "error");
    }
    setLoading(false);
  }

  function showMessage(text: string, type: "success" | "error" = "success") {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
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
    if (response.ok) {
      showMessage(result.message ?? "התוכנית נשמרה בהצלחה ");
      setForm(initialForm);
      setEditingId(null);
      await loadData();
    } else {
      showMessage(result.message ?? "שגיאה בשמירה", "error");
    }
  }

  async function startEdit(id: string) {
    setMessage("");
    const response = await fetch(`/api/admin/programs/${id}`);
    const result = await response.json();
    if (!response.ok || !result.form) {
      showMessage(result.message ?? "לא ניתן לטעון תוכנית", "error");
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
    if (response.ok) {
      showMessage(result.message ?? "התוכנית נמחקה");
      if (editingId === id) {
        cancelEdit();
      }
      await loadData();
    } else {
      showMessage(result.message ?? "שגיאה במחיקה", "error");
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
    if (response.ok) {
      showMessage(result.message ?? "הקטגוריה נוספה");
      setCategoryForm({ name: "", slug: "", sortOrder: 0 });
      await loadData();
    } else {
      showMessage(result.message ?? "שגיאה בהוספת קטגוריה", "error");
    }
  }

  async function deleteCategory(id: string) {
    const response = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (response.ok) {
      showMessage("הקטגוריה נמחקה");
      await loadData();
    } else {
      showMessage(result.message ?? "שגיאה במחיקת קטגוריה", "error");
    }
  }

  /** מוסיפה קטגוריה חדשה אוטמטית (כשנקלט שם חדש) */
  async function addCategoryOnTheFly(name: string) {
    if (!name.trim()) return null;
    // Check if already exists
    const existing = categories.find(
      (c) => c.name === name.trim() || c.slug === slugify(name.trim())
    );
    if (existing) return existing.slug;

    const slug = slugify(name.trim());
    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), slug, sortOrder: 0 }),
    });
    const result = await response.json();
    if (response.ok) {
      showMessage(`הקטגוריה "${name.trim()}" נוספה בהצלחה!`);
      await loadData();
      return slug;
    } else {
      showMessage(result.message ?? "שגיאה בהוספת קטגוריה", "error");
      return null;
    }
  }

  function slugify(text: string): string {
    const heb = text.trim();
    // תומך בעברית (תחום יוניקוד 0590-05FF), אותיות לועזיות, ספרות ומקפים
    if (/^[֐-׿\s]+$/.test(heb)) {
      // טקסט בעברית מלאה — מחזירים תעתיק פשוט (לפי האותיות הראשונות) או את הטקסט כמו שהוא
      return heb.replace(/\s+/g, "-");
    }
    return heb
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9֐-׿-]/g, "")
      .toLowerCase();
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto" dir="rtl">
      {/* הודעה */}
      {message ? (
        <div
          className={`rounded-xl px-5 py-3 text-sm font-medium border transition-all ${
            messageType === "success"
              ? "bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]"
              : "bg-[#fef2f2] border-[#fecaca] text-[#991b1b]"
          }`}
        >
          {message}
        </div>
      ) : null}

      {/* טופס יצירה/עריכת תוכנית */}
      <form onSubmit={saveProgram} className={styles.card}>
        <div className="flex items-center justify-between mb-1">
          <h2 className={styles.cardHeader}>
            {editingId ? " עריכת תוכנית" : " תוכנית חדשה"}
          </h2>
          {editingId ? (
            <button type="button" onClick={cancelEdit} className={styles.btnSecondary}>
              ביטול
            </button>
          ) : null}
        </div>
        <p className={styles.cardDesc}>כל השדות אופציונליים מלבד שם התוכנית.</p>

        {/* שם תוכנית */}
        <div className="mb-5">
          <label className={styles.label}>שם התוכנית *</label>
          <input
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className={styles.field}
            placeholder="לדוגמה: מחנה קיץ תשפ״ו"
            required
          />
        </div>

        {/* קטגוריה + נושא */}
        <div className="grid gap-4 md:grid-cols-2 mb-5">
          <div>
            <label className={styles.label}>קטגוריה</label>
            <div className="flex gap-2">
              <select
                value={form.category === "__new__" ? "__new__" : (form.category ?? "")}
                onChange={async (e) => {
                  const val = e.target.value;
                  if (val === "__new__") {
                    setForm((prev) => ({ ...prev, category: "__new__" }));
                    setNewCategoryInput("");
                  } else {
                    setForm((prev) => ({
                      ...prev,
                      category: (val || undefined) as ProgramInput["category"],
                    }));
                    setNewCategoryInput("");
                  }
                }}
                className={styles.field}
              >
                <option value="">ללא קטגוריה</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
                <option value="__new__"> קטגוריה חדשה...</option>
              </select>
            </div>

            {/* שדה קלט חופשי לקטגוריה חדשה */}
            {form.category === "__new__" && (
              <div className="flex gap-2 mt-2">
                <input
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  className={styles.field}
                  placeholder="שם הקטגוריה החדשה"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={async () => {
                    const slug = await addCategoryOnTheFly(newCategoryInput);
                    if (slug) {
                      setForm((prev) => ({ ...prev, category: slug }));
                      setNewCategoryInput("");
                    }
                  }}
                  disabled={!newCategoryInput.trim()}
                  className={styles.btnPrimary}
                >
                  הוספה
                </button>
              </div>
            )}
          </div>
          <div>
            <label className={styles.label}>נושא</label>
            <input
              value={form.topic ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))}
              className={styles.field}
              placeholder="לדוגמה: מנהיגות, בטחון, חברות"
            />
          </div>
        </div>

        {/* תיאורים */}
        <div className="mb-5">
          <label className={styles.label}>תיאור קצר</label>
          <textarea
            value={form.shortDescription ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value }))}
            className={styles.field}
            placeholder="שורה קצרה שמופיעה בתצוגה המקדימה"
            rows={2}
          />
        </div>
        <div className="mb-5">
          <label className={styles.label}>תיאור מלא</label>
          <textarea
            value={form.fullDescription ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, fullDescription: e.target.value }))}
            className={styles.field}
            placeholder="תיאור מפורט שמופיע בעמוד התוכנית"
            rows={5}
          />
        </div>

        {/* קהל יעד + אורך */}
        <div className="grid gap-4 md:grid-cols-2 mb-5">
          <div>
            <label className={styles.label}>קהל יעד</label>
            <input
              value={form.targetAudience ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, targetAudience: e.target.value }))}
              className={styles.field}
              placeholder="לדוגמה: ז׳-ח׳"
            />
          </div>
          <div>
            <label className={styles.label}>אורך</label>
            <input
              value={form.duration ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
              className={styles.field}
              placeholder="לדוגמה: 3 שעות"
            />
          </div>
        </div>

        {/* הערות */}
        <div className="mb-5">
          <label className={styles.label}>הערות (לא מופיעות באתר)</label>
          <textarea
            value={form.notes ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
            className={styles.field}
            placeholder="הערות פנימיות למנהלת"
            rows={2}
          />
        </div>

        {/* תמונות, גרפיקות, PDF */}
        <div className="rounded-xl border border-[#eef0f4] bg-[#fafbfc] p-5 mb-5">
          <h3 className={styles.sectionTitle}> תמונות, גרפיקות ו-PDF</h3>
          <p className="text-xs text-[#9ca3af] mb-4">העלי מהמחשב (תמונה, PDF) או הדביקי קישור ישיר. סמני  לאחת שתוצג בגדול.</p>
          {(form.images ?? []).map((img, index) => (
            <div key={index} className="mb-3 flex flex-wrap items-center gap-3 bg-white rounded-xl border border-[#eef0f4] p-3">
              <div className="w-full flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[120px]">
                  <select
                    value={img.assetType}
                    onChange={(e) => {
                      const images = [...(form.images ?? [])];
                      images[index] = { ...images[index], assetType: e.target.value as "photo" | "graphic" };
                      setForm((prev) => ({ ...prev, images }));
                    }}
                    className={styles.field}
                  >
                    <option value="photo"> תמונה</option>
                    <option value="graphic"> גרפיקה</option>
                  </select>
                </div>
                <div className="flex-[3] min-w-[200px] space-y-2">
                  <input
                    value={img.url}
                    onChange={(e) => {
                      const images = [...(form.images ?? [])];
                      images[index] = { ...images[index], url: e.target.value };
                      setForm((prev) => ({ ...prev, images }));
                    }}
                    className={styles.field}
                    placeholder="https://..."
                  />
                  <LocalFileUpload
                    accept="image/*,application/pdf"
                    label=" בחרי קובץ מהמחשב (תמונה / PDF)"
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
                  className={styles.btnDanger}
                  style={{  cursor: "pointer" }}
                >
                  ✕ הסרה
                </button>
              </div>
              {/* Cover checkbox */}
              <label className="flex items-center gap-2 text-sm text-[#6b7280] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={img.isCover === true}
                  onChange={(e) => {
                    const images = [...(form.images ?? [])];
                    if (e.target.checked) {
                      // Uncheck all others
                      images.forEach((im) => (im.isCover = false));
                    }
                    images[index] = { ...images[index], isCover: e.target.checked };
                    setForm((prev) => ({ ...prev, images }));
                  }}
                  className="w-4 h-4 rounded accent-[#4FDAB3]"
                />
                 תמונת קאבר (מוצגת בגדול)
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, images: [...(prev.images ?? []), { ...emptyImage }] }))}
            className="text-sm font-medium text-[#4FDAB3] hover:text-[#3ab890] transition-colors mt-2"
          >
            + הוספת תמונה/גרפיקה/PDF
          </button>
        </div>

        {/* סטטוס */}
        <div className="mb-6">
          <label className={styles.label}>סטטוס</label>
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ProgramInput["status"] }))}
            className={styles.field}
          >
            <option value="draft"> טיוטה — לא גלויה באתר</option>
            <option value="published"> מפורסם — גלוי לכולן</option>
          </select>
        </div>

        {/* כפתורי שמירה */}
        <div className="flex flex-wrap gap-3 ">
          <button type="submit" className={`{styles.btnPrimary} cursor="pointer"}`} style={{ cursor: "pointer" }}>
            {editingId ? " עדכון תוכנית" : " יצירת תוכנית"}
          </button>
          {editingId ? (
            <button type="button" onClick={cancelEdit} className={styles.btnSecondary} style={{ cursor: "pointer" }}>
              ביטול עריכה
            </button>
          ) : null}
        </div>
      </form>

      {/* רשימת תוכניות קיימות */}
      <div className={styles.card}>
        <h2 className={styles.cardHeader}> התוכניות שלי</h2>
        <p className={styles.cardDesc}>ניהול התוכניות הקיימות — עריכה, מחיקה, שינוי סטטוס.</p>
        {loading ? (
          <div className="flex items-center justify-center py-12 text-[#6b7280]">
            <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            טוען תוכניות...
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-12 text-[#9ca3af]">
            <p className="text-lg mb-2">אין תוכניות עדיין</p>
            <p className="text-sm">צרי תוכנית ראשונה בטופס למעלה.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {programs.map((program) => (
              <article
                key={program.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#eef0f4] bg-white p-4 hover:shadow-sm transition-shadow"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-[#1a1d23] truncate">{program.title}</p>
                    <span className={program.status === "published" ? styles.badgePublished : styles.badgeDraft}>
                      {program.status === "published" ? "מפורסם" : "טיוטה"}
                    </span>
                  </div>
                  <p className="text-xs text-[#9ca3af] truncate">
                    {program.slug}
                    {program.topic ? ` · ${program.topic}` : ""}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(program.id)}
                    className={styles.btnSecondary}
                    style={{ cursor: "pointer" }}
                  >
                     עריכה
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProgram(program.id)}
                    className={styles.btnDanger}
                    style={{ cursor: "pointer" }}
                  >
                     מחיקה
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ניהול קטגוריות */}
      <div className={styles.card}>
        <h2 className={styles.cardHeader}> ניהול קטגוריות</h2>
        <p className={styles.cardDesc}>הוסיפי קטגוריות חדשות למיון התוכניות.</p>

        <form onSubmit={createCategory} className="flex flex-wrap items-end gap-3 mb-6">
          <div className="flex-1 min-w-[140px]">
            <label className={styles.label}>שם</label>
            <input
              value={categoryForm.name}
              onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
              className={styles.field}
              placeholder="לדוגמה: סדנאות"
              required
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            {/* <label className={styles.label}>מזהה (slug)</label>
            <input
              value={categoryForm.slug}
              onChange={(e) => setCategoryForm((prev) => ({ ...prev, slug: e.target.value }))}
              className={styles.field}
              placeholder="workshops"
              required
            /> */}
          </div>
          <div className="w-20">
            <label className={styles.label}>סדר</label>
            <input
              type="number"
              min={0}
              value={categoryForm.sortOrder}
              onChange={(e) => setCategoryForm((prev) => ({ ...prev, sortOrder: Number(e.target.value) || 0 }))}
              className={styles.field}
              placeholder="0"
            />
          </div>
          <button type="submit" className={styles.btnPrimary} style={{ cursor: "pointer" }}>
            הוספה
          </button>
        </form>

        {categories.length === 0 ? (
          <p className="text-sm text-[#9ca3af] text-center py-6">אין קטגוריות מותאמות אישית עדיין.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="inline-flex items-center gap-2 rounded-full border border-[#eef0f4] bg-white px-4 py-2 text-sm text-[#374151]"
              >
                <span className="font-medium">{category.name}</span>
                {/* <span className="text-[#9ca3af] text-xs">({category.slug})</span> */}
                <button
                  onClick={() => deleteCategory(category.id)}
                  type="button"
                  className="mr-1 text-[#9ca3af] hover:text-[#dc2626] transition-colors"
                  aria-label={`מחיקת ${category.name}`}
                  style={{ cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
