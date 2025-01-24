import * as React from "react"
import { cn } from "../../../lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md px-6 py-2.5 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-[#556B2F] text-white hover:bg-[#556B2F]/90",
          variant === "outline" && "border border-[#556B2F] text-[#556B2F] hover:bg-[#556B2F]/10",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }