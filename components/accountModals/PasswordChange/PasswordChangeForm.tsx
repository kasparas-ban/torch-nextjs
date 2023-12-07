import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUpdateUserPassword } from "@/api/hooks/useUser"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import SubmitButton from "@/components/submitButton/SubmitButton"

const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(30, { message: "Password must be less than 30 characters" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(30, { message: "Password must be less than 30 characters" })
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).*$/, {
        message:
          "Password must contain at least one number and both lowercase and uppercase characters",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(30, { message: "Password must be less than 30 characters" }),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type PasswordFormType = z.infer<typeof passwordFormSchema>

export default function PasswordChangeForm({
  closeModal,
}: {
  closeModal: () => void
}) {
  const { toast } = useToast()
  const { mutateAsync, reset, isPending, isError, isSuccess } =
    useUpdateUserPassword()

  const form = useForm<PasswordFormType>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: PasswordFormType) => {
    mutateAsync(data)
      .then(() => {
        setTimeout(() => {
          closeModal()
        }, 2000)
        toast({
          title: "Password updated successfully",
        })
      })
      .catch(() => {
        setTimeout(
          () =>
            toast({
              title: "Failed to update password",
              description: "Try updating it later.",
            }),
          100
        )
        setTimeout(() => reset(), 2000)
      })
  }

  return (
    <div className="mt-4 h-full px-0 pb-2 sm:mt-0 sm:px-10">
      <motion.h5
        layout
        className="mb-5 flex justify-center text-4xl font-semibold"
      >
        Change password
      </motion.h5>

      <Form {...form}>
        <form
          className="flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-y-2">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">Current password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Aa..."
                      className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">New password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Aa..."
                      className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">Repeat new password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Aa..."
                      className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />
          </div>

          <div className="relative mt-auto flex justify-center">
            <SubmitButton
              isLoading={isPending}
              isSuccess={isSuccess}
              isError={isError}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
