import { cva } from "class-variance-authority";

export const filterButtonVariants = cva(
  [
    "inline-flex",
    "cursor-pointer",
    "items-center",
    "justify-center",
    "gap-1.5",
    "rounded-full",
    "border",
    "px-3",
    "py-1.5",
    "text-xs",
    "font-medium",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-[#7A1C1C]/30",
    "sm:text-sm",
  ],
  {
    variants: {
      active: {
        true: [
          "border-[#7A1C1C]",
          "bg-[#7A1C1C]",
          "font-semibold",
          "text-white",
          "shadow-sm",
          "dark:border-[#A94444]",
          "dark:bg-[#A94444]",
        ],
        false: [
          "border-[#EADDC9]",
          "bg-white",
          "text-[#2C221E]",
          "hover:border-[#7A1C1C]/50",
          "dark:border-[#3D322C]",
          "dark:bg-[#26201D]",
          "dark:text-[#F4EFE6]",
          "dark:hover:border-[#A94444]/70",
        ],
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export const selectBoxVariants = cva([
  "h-10",
  "w-full",
  "cursor-pointer",
  "rounded-lg",
  "border",
  "border-[#EADDC9]",
  "bg-[#FAFAFA]",
  "px-3",
  "text-sm",
  "font-semibold",
  "text-[#2C221E]",
  "outline-none",
  "transition-colors",
  "focus:border-[#7A1C1C]",
  "focus:ring-2",
  "focus:ring-[#7A1C1C]/30",
  "dark:border-[#3D322C]",
  "dark:bg-[#221C19]",
  "dark:text-[#F4EFE6]",
]);
