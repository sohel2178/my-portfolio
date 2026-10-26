import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-fg text-bg hover:bg-route",
        outline: "border border-line-strong bg-transparent text-fg hover:border-fg/40 hover:bg-fg/[0.04]",
        ghost: "text-muted hover:text-fg hover:bg-fg/[0.05]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-[13px]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>;

// Every button on the page is navigation, so this renders an anchor.
export function ButtonLink({ className, variant, size, ...props }: ButtonProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
