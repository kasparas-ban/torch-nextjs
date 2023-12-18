"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { useNotify } from "@/api/hooks/user/useNotify"

import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useToast } from "./ui/use-toast"

const notifyFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email("Please provide a valid email"),
})

type NotifyFormType = z.infer<typeof notifyFormSchema>

function ComingSoon() {
  const { toast } = useToast()
  const { mutateAsync, isPending } = useNotify()

  const form = useForm<NotifyFormType>({
    resolver: zodResolver(notifyFormSchema),
    defaultValues: { email: "" },
    shouldUnregister: true,
  })

  const onSubmit = (data: NotifyFormType) => {
    console.log(data)
    mutateAsync(data.email)
      .then(() =>
        toast({
          title: "Email added to the mailing list",
          description: "We'll keep you posted on any updates.",
        })
      )
      .catch(e => {
        console.error(e)
        toast({
          title: "Failed to find user in the database",
          description: "Try to log in later.",
        })
      })
    form.reset()
  }

  return (
    <motion.div
      className="animate-fade-up animate-once animate-ease-out flex flex-col justify-center max-[768px]:px-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween" }}
    >
      <div className="text-center text-5xl font-bold tracking-wide text-gray-700">
        COMING SOON
      </div>

      <div className="mt-6 text-center">
        Enter your email below and be the first to know when it goes live!
      </div>

      <Form {...form}>
        <form
          className="relative mx-auto mt-6 justify-center gap-2 min-[500px]:flex"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative !mt-0">
                    <Input
                      placeholder="Enter your email"
                      className="mt-0 h-11 w-72 rounded-lg bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                      {...field}
                    />
                    {isPending && (
                      <Loader2 className="absolute right-3 top-[10px] animate-spin text-gray-500" />
                    )}
                  </div>
                </FormControl>
                <FormMessage className="mt-1 pl-3" />
              </FormItem>
            )}
          />
          <div className="text-center max-[500px]:mt-4">
            <motion.button
              className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-rose-100 group-hover:from-rose-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-rose-800",
                isPending && "opacity-40"
              )}
              whileHover={{ scale: isPending ? 1 : 1.06 }}
              disabled={isPending}
              type="submit"
            >
              <span
                className={cn(
                  "relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in hover:text-white group-hover:bg-white/0 dark:bg-gray-900",
                  isPending && "group-hover:bg-white/1 hover:text-gray-700"
                )}
              >
                Notify Me!
              </span>
            </motion.button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}

export default ComingSoon
