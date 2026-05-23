import Link from "next/link";
import { categoryLabels } from "@/lib/data/programs";

type Props = {
  active: string;
};

export function CategoryFilter({ active }: Props) {
  const categories = Object.entries(categoryLabels);

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {categories.map(([value, label]) => {
        const isActive = active === value;
        return (
          <Link
            key={value}
            href={value === "all" ? "/programs" : `/programs?category=${value}`}
            className={isActive ? "chip chip-active" : "chip"}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
