import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { GenderOption, Profile } from "@/types/itemTypes"
import { getAllCountries } from "@/utils/utils"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SelectField from "@/components/inputs/SelectField"

const accountFormSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must contain at least 5 characters" })
    .max(20, { message: "Username cannot exceed 20 characters" }),
  birthday: z.date().optional(),
  gender: z
    .union([
      z.object({ label: z.literal("Male"), value: z.literal("MALE") }),
      z.object({ label: z.literal("Female"), value: z.literal("FEMALE") }),
      z.object({ label: z.literal("Other"), value: z.literal("OTHER") }),
    ])
    .optional(),
  country: z.object({ label: z.string(), value: z.string() }).optional(),
})

type AccountFormType = z.infer<typeof accountFormSchema>

const genderOptions: GenderOption[] = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
]

const countryOptions = getAllCountries()

const profileData: Profile = {
  username: "kaspis245",
  email: "kasparas@gmail.com",
  birthday: new Date("1997-02-04"),
  gender: { label: "Male", value: "MALE" },
  joinedSince: new Date(),
  country: { label: "Lithuania", value: "LT" },
}

export default function AccountDetailsForm() {
  const form = useForm<AccountFormType>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: profileData,
  })

  const onSubmit = (data: AccountFormType) => {
    console.log("onSubmit", data)
  }

  return (
    <div className="flex h-full flex-col px-0 pb-2 sm:px-10">
      <h5 className="mb-4 flex justify-center text-4xl font-semibold">
        Edit Account
      </h5>

      <Form {...form}>
        <form
          className="flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3 tracking-wide">Username</FormLabel>
                  <FormControl>
                    <Input
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
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3 tracking-wide">Birthday</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      onFocus={e => e.target.showPicker()}
                      onClick={e => (e.target as HTMLInputElement).showPicker()}
                      value={
                        field.value
                          ? new Date(field.value)?.toLocaleDateString("en-CA")
                          : ""
                      }
                      onChange={e => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="pl-3 tracking-wide">Gender</FormLabel>
                    <FormControl>
                      <SelectField
                        name="gender"
                        value={field.value}
                        onChange={field.onChange}
                        options={genderOptions}
                        isSearchable={false}
                        isClearable
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="pl-3 tracking-wide">
                      Country
                    </FormLabel>
                    <FormControl>
                      <SelectField
                        name="location.country"
                        value={field.value}
                        onChange={field.onChange}
                        options={countryOptions}
                        isClearable
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          </div>

          <div className="relative mb-6 mt-auto flex justify-center pt-6 sm:mb-0">
            <motion.button
              layout
              className="px-3 py-1 text-xl font-medium"
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
          </div>
        </form>
      </Form>
    </div>
  )
}
