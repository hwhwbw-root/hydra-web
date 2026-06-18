import { CheckCircle, MinusCircle } from "@phosphor-icons/react/dist/ssr";
import type { PhotoItem } from "@/lib/mock/types";

/** Documentation checklist — which required site items the worker captured.
   No images rendered; just provided / missing status per bilingual item. */
export function DocChecklist({ items }: { items: PhotoItem[] }) {
  return (
    <ul className="grid gap-x-6 sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-2.5 border-b border-border py-2.5 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
        >
          {item.hasPhoto ? (
            <CheckCircle
              size={18}
              weight="fill"
              className="shrink-0 text-online"
            />
          ) : (
            <MinusCircle size={18} className="shrink-0 text-muted-foreground/40" />
          )}
          <div className="min-w-0 leading-tight">
            <p
              className={
                item.hasPhoto
                  ? "truncate text-sm font-medium text-foreground"
                  : "truncate text-sm text-muted-foreground"
              }
            >
              {item.en}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {item.ms}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
