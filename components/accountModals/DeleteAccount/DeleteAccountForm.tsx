import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, useUser } from "@clerk/clerk-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useUserInfo from "@/hooks/useUserInfo"
import { deleteAccount } from "@/api/endpoints/userAPI"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const altText = "delete my account"

const getDeleteAccountFormSchema = (username: string) =>
  z.object({
    checkText: z.literal(username, {
      errorMap: () => ({ message: "Enter required text" }),
    }),
  })

export default function DeleteAccountForm() {
  const router = useRouter()
  const { getToken, signOut } = useAuth()
  const { user } = useUser()
  const { data } = useUserInfo()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const deleteAccountSchema = getDeleteAccountFormSchema(
    data?.username ?? altText
  )

  const form = useForm<z.infer<typeof deleteAccountSchema>>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { checkText: "" },
  })

  const handleDeleteAccount = async () => {
    setIsLoading(true)

    const token = await getToken()
    if (!token) throw Error("No token found")

    deleteAccount(token)
      .then(() => {
        signOut()
        router.push("/")
        toast({
          title: "Account deleted successfully",
        })
      })
      .catch(() =>
        toast({
          title: "Failed to delete your account",
          description: "Unexpected error has occured.",
        })
      )
      .finally(() => setIsLoading(false))
  }

  const onSubmit = () => handleDeleteAccount()

  return (
    <div className="mt-4 h-full px-0 pb-2 sm:mt-0 sm:px-10">
      <motion.h5
        layout
        className="mb-5 flex justify-center text-4xl font-semibold"
      >
        Delete account
      </motion.h5>

      <p className="mb-2">
        This action <span className="font-semibold">cannot</span> be undone.
        This will permanently delete your account and all associated information
        with it.
      </p>

      <p className="mb-2">
        Please type <span className="font-semibold">{data?.username}</span> to
        confirm.
      </p>

      <Form {...form}>
        <form
          className="flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-y-2">
            <FormField
              control={form.control}
              name="checkText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
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

          <div className="relative mt-6 flex justify-center">
            <Button
              variant="destructive"
              className="w-48 rounded-xl"
              disabled={isLoading}
            >
              Delete account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
