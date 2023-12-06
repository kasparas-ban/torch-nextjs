import { useUser } from "@clerk/clerk-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FE_HOST } from "@/api/utils/apiConfig"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/submitButton/SubmitButton"

const emailFormSchema = z.object({ email: z.string().email() })

type EmailFormType = z.infer<typeof emailFormSchema>

export default function EmailChangeForm({
  setComplete,
}: {
  setComplete: () => void
}) {
  const { user } = useUser()

  const form = useForm<EmailFormType>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: user?.primaryEmailAddress
      ? { email: user?.primaryEmailAddress.toString() }
      : undefined,
  })

  const updateEmail = async (data: EmailFormType) =>
    user
      ?.createEmailAddress({ email: data.email })
      .then(emailInfo => {
        emailInfo.prepareVerification({
          strategy: "email_link",
          redirectUrl: `${FE_HOST}?emailChangeSuccess=true`,
        })
      })
      .catch(err => {
        const msg = "Failed to update user"
        console.error(msg, err)
        throw Error(msg)
      })

  const { isPending, isSuccess, isError, mutateAsync } = useMutation({
    mutationFn: (data: EmailFormType) => updateEmail(data),
  })

  const onSubmit = (data: EmailFormType) => {
    mutateAsync(data)
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
          className="flex h-full flex-col gap-5"
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
                    placeholder="name@email.com"
                    className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />

          <div className="relative mb-6 mt-auto flex justify-center sm:mb-0">
            <SubmitButton
              isSuccess={isSuccess}
              isError={isError}
              isLoading={isPending}
              onSuccess={setComplete}
            />
          </div>
        </form>
      </Form>
    </motion.div>
  )
}
