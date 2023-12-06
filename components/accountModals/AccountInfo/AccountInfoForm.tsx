import { useUser } from "@clerk/clerk-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { GenderOption, UpdateProfileReq } from "@/types/userTypes"
import {
  capitalizeString,
  formatDate,
  getAllCountries,
  getCountryName,
} from "@/lib/utils"
import useUserInfo from "@/hooks/useUserInfo"
import { useUpdateUser } from "@/api/hooks/useUser"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AvatarUploadInput from "@/components/inputs/AvatarUploadInput"
import SelectField from "@/components/inputs/SelectField"
import SubmitButton from "@/components/submitButton/SubmitButton"

const accountFormSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must contain at least 5 characters" })
    .max(20, { message: "Username cannot exceed 20 characters" }),
  birthday: z.date().nullable().optional(),
  gender: z
    .union([
      z.object({ label: z.literal("Male"), value: z.literal("MALE") }),
      z.object({ label: z.literal("Female"), value: z.literal("FEMALE") }),
      z.object({ label: z.literal("Other"), value: z.literal("OTHER") }),
    ])
    .nullable()
    .optional(),
  country: z.object({ label: z.string(), value: z.string() }).optional(),
  avatarImage: z
    .any()
    .refine(
      file =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
})

type AccountFormType = z.infer<typeof accountFormSchema>

const genderOptions: GenderOption[] = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
]

const countryOptions = getAllCountries()

export default function AccountDetailsForm({
  closeModal,
}: {
  closeModal: () => void
}) {
  const { data: userInfo } = useUserInfo()
  const { user } = useUser()
  const {
    mutateAsync: updateUser,
    isPending,
    isSuccess,
    isError,
  } = useUpdateUser()

  const defaultValues = {
    username: userInfo?.username,
    birthday: userInfo?.birthday ? new Date(userInfo.birthday) : undefined,
    gender:
      userInfo?.gender &&
      ({
        label: capitalizeString(userInfo?.gender),
        value: userInfo?.gender,
      } as GenderOption),
    country: userInfo?.countryCode
      ? {
          label: getCountryName(userInfo.countryCode),
          value: userInfo?.countryCode,
        }
      : undefined,
  }

  const form = useForm<AccountFormType>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: defaultValues,
  })

  const onSubmit = async (data: AccountFormType) => {
    const updatedProfile: UpdateProfileReq = {
      username: data.username,
      birthday: data.birthday ? formatDate(data.birthday) : undefined,
      gender: data.gender?.value,
      countryCode: data.country?.value,
    }

    try {
      if (data.avatarImage)
        await user?.setProfileImage({ file: data.avatarImage })

      await updateUser(updatedProfile)
    } catch (e) {
      console.error("Failed to update user", e)
    }
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
              name="avatarImage"
              disabled={true}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3 tracking-wide">Avatar</FormLabel>
                  <FormControl>
                    <div className="w-fit">
                      <AvatarUploadInput onChange={field.onChange} />
                    </div>
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              disabled={isPending || isSuccess}
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
              disabled={isPending || isSuccess}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3 tracking-wide">Birthday</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                      type="date"
                      max={new Date().toLocaleDateString("en-CA")}
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
                        isDisabled={isPending || isSuccess}
                        menuPosition="fixed"
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
                        isDisabled={isPending || isSuccess}
                        menuPosition="fixed"
                        isClearable
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          </div>

          <div className="relative mb-6 mt-auto flex justify-center pt-6 sm:mb-0">
            <SubmitButton
              isSuccess={isSuccess}
              isError={isError}
              isLoading={isPending}
              onSuccess={closeModal}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
