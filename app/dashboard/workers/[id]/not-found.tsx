import Link from "next/link";
import { UserMinus, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function WorkerNotFound() {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
          <UserMinus size={22} />
        </span>
        <h1 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          Worker not found
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          This worker may have been reassigned or removed.
        </p>
        <Link
          href="/dashboard/map"
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/92"
        >
          <ArrowLeft size={15} /> Back to map
        </Link>
      </div>
    </div>
  );
}
