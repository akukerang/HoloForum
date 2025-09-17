import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-crust placeholder:text-subtext0 selection:bg-red-300 focus-visible:border-blue focus-visible:ring-blue/50 aria-invalid:ring-red/20 dark:aria-invalid:ring-red/40 aria-invalid:border-red flex field-sizing-content min-h-16 w-full rounded-md border bg-crust px-3 py-2 text-text shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
