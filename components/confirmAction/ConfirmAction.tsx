import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

type SubmitButtonProps = {
  onSubmit: () => void
  onCancel: () => void
  isLoading?: boolean
  isDestructive?: boolean
  submitLabel?: string
}

export default function ConfirmAction({
  onSubmit,
  onCancel,
  isLoading,
  isDestructive,
  submitLabel,
}: SubmitButtonProps) {
  return (
    <>
      <Button
        asChild
        className={cn(
          "text-md h-8 w-28 rounded-lg font-medium tracking-wide text-white",
          isDestructive
            ? "bg-red-600 hover:bg-red-400"
            : "bg-gray-800 hover:bg-gray-600"
        )}
        onClick={onSubmit}
        disabled={isLoading}
      >
        <motion.button whileTap={{ scale: 0.96 }}>
          {isLoading && (
            <Loader2 className="relative left-[-6px] animate-spin text-white" />
          )}
          {submitLabel ?? "Confirm"}
        </motion.button>
      </Button>
      <Button
        asChild
        className="text-md h-8 w-28 rounded-lg border border-gray-200 bg-white font-medium tracking-wide text-gray-500 hover:bg-gray-100"
        onClick={onCancel}
        disabled={isLoading}
      >
        <motion.button whileTap={{ scale: 0.96 }}>Cancel</motion.button>
      </Button>
    </>
  )
}
