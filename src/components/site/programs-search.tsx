type Props = {
  defaultQuery?: string;
  category?: string;
};

export function ProgramsSearch({ defaultQuery = "", category }: Props) {
  return (
    <form action="/programs" method="get" className="mb-6 flex flex-wrap gap-2">
      {category && category !== "all" ? <input type="hidden" name="category" value={category} /> : null}
      <input
        type="search"
        name="q"
        defaultValue={defaultQuery}
        placeholder="חיפוש לפי שם, נושא, קהל יעד..."
        className="min-w-[220px] flex-1 rounded-xl border border-stroke bg-transparent px-3 py-2 outline-none"
      />
      <button type="submit" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-[#041410]">
        חיפוש
      </button>
    </form>
  );
}
