import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Avatar({ size, priority, className }: { size: number; priority?: boolean; className?: string }) {
  return (
    <Image
      src="/avater.jpeg"
      alt={`Portrait of ${site.name}`}
      width={size}
      height={size}
      priority={priority}
      sizes={`${size}px`}
      className={cn("object-cover", className)}
    />
  );
}
