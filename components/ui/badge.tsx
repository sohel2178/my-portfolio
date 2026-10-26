import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[2px] border border-line px-1.5 py-0.5 text-[12.5px] leading-5 text-muted",
        className,
      )}
      {...props}
    />
  );
}
