import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const emailFormSchema = z.object({ email: z.string().email() })

type EmailFormType = z.infer<typeof emailFormSchema>

const defaultEmail = "kasparas@gmail.com"

export default function EmailChangeForm({
  setComplete,
}: {
  setComplete: () => void
}) {
  const form = useForm<EmailFormType>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: defaultEmail },
  })

  const onSubmit = (data: EmailFormType) => {
    setComplete()
  }

  return (
    <motion.div
      className="flex h-full flex-col px-0 pb-2 sm:px-10"
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <h5 className="mb-5 flex justify-center text-4xl font-semibold">
        Change email
      </h5>

      <Form {...form}>
        <form
          className="flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-3">
                  Enter your new email address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@host.com"
                    className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />

          <div className="relative mb-6 mt-auto flex justify-center sm:mb-0">
            <motion.button
              layout
              className="mt-6 px-3 py-1 text-xl font-medium"
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}
