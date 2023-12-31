"use client"

import dayjs from "dayjs"
import { motion } from "framer-motion"
import { capitalizeString, getCountryName } from "@/lib/utils"
import useUserInfo from "@/hooks/useUserInfo"
import { Button } from "@/components/ui/button"
import AccountInfoModal from "@/components/accountModals/AccountInfo/AccountInfoModal"
import DeleteAccountModal from "@/components/accountModals/DeleteAccount/DeleteAccountModal"
import PasswordChangeModal from "@/components/accountModals/PasswordChange/PasswordChangeModal"
import UserAvatar from "@/components/userAvatar/UserAvatar"
import AccountIcon from "@/public/icons/account.svg"
import AccountIcon2 from "@/public/icons/account2.svg"
import ArrowIcon from "@/public/icons/arrow.svg"
import LockIcon from "@/public/icons/lock.svg"
import PaymentIcon from "@/public/icons/payment.svg"
import SignOutIcon from "@/public/icons/sign_out.svg"
import DeleteIcon from "@/public/icons/trash.svg"

export default function AccountDetails() {
  const { data: userInfo } = useUserInfo()

  return (
    <motion.div
      className="flex flex-col gap-4 max-sm:pb-32"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween" }}
    >
      <section className="flex flex-col gap-4 sm:flex-row">
        <section className="flex items-center rounded-xl bg-gray-200 px-5 py-4 shadow-lg sm:w-1/2">
          <UserAvatar className="h-24 w-24">
            <div className="flex h-24 w-24 rounded-full bg-gray-400">
              <AccountIcon2
                className="m-auto h-12 text-gray-200"
                alt="Profile image"
              />
            </div>
          </UserAvatar>
          <div className="flex flex-col justify-between px-5">
            <div className="font-bold">kaspis245</div>
            <div className="flex items-end">
              <span className="mr-0.5 text-4xl font-bold">32</span>
              <span className="mr-2 text-xl font-bold">h</span>
              <span className="mr-0.5 text-4xl font-bold">44</span>
              <span className="text-xl font-bold">min</span>
            </div>
            <div className="mt-2 flex w-32 justify-center rounded-lg bg-gray-400 py-0.5 text-sm font-medium">
              Free account
            </div>
          </div>
        </section>

        {/* <motion.button
          className="bg-multi-color group m-auto flex h-32 w-full flex-col items-center justify-around rounded-xl px-5 py-3 text-sm text-gray-700 shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-lg font-semibold text-gray-800">
            Unlock more features
          </div>
          <div className="flex items-center text-left font-medium tracking-wide text-gray-800">
            <div>
              <span className="mr-1">📈</span>
              Stats
            </div>
            <div className="mx-2 h-1 w-1 rounded-full bg-gray-800/40" />
            <div>
              <span className="mr-1">📅</span>Calendar
            </div>
            <div className="mx-2 h-1 w-1 rounded-full bg-gray-800/40" />
            <div>
              <span className="mr-1">🤝</span>Support
            </div>
          </div>
          <div className="relative rounded-md text-2xl font-bold text-white transition-all duration-75 ease-in">
            Become a member
          </div>
        </motion.button> */}
      </section>

      <section className="flex sm:hidden">
        <motion.div className="mx-auto w-full" whileTap={{ scale: 0.95 }}>
          <Button className="text-md w-full bg-gray-600 pl-8 pr-10 text-white hover:bg-gray-600">
            <SignOutIcon className="t-2 relative top-px mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </motion.div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Account details
        </h2>
        <div className="flex gap-20">
          <div className="flex flex-col space-y-2 text-gray-500">
            <div>Username</div>
            <div>Email</div>
            <div>Age</div>
            <div>Gender</div>
            <div>Joined since</div>
            <div>Location</div>
          </div>
          <div className="flex flex-col space-y-2 font-semibold text-gray-800">
            <div>{userInfo?.username || "-"}</div>
            <div>{userInfo?.email || "-"}</div>
            <div>
              {userInfo?.birthday
                ? dayjs().diff(userInfo.birthday, "year")
                : "-"}
            </div>
            <div>
              {userInfo?.gender ? capitalizeString(userInfo.gender) : "-"}
            </div>
            <div>
              {userInfo?.createdAt
                ? dayjs(userInfo.createdAt).format("MMMM D, YYYY")
                : "-"}
            </div>
            <div>
              {userInfo?.countryCode
                ? getCountryName(userInfo.countryCode)
                : "-"}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-800">Settings</h2>
        <div className="flex flex-col">
          <AccountInfoModal>
            <motion.button
              className="flex w-full items-center py-3"
              whileTap={{ scale: 0.99 }}
            >
              <AccountIcon className="mr-3 h-7 w-7" />
              <div className="font-medium">Edit account info</div>
              <ArrowIcon className="ml-auto h-4 w-4 rotate-[270deg]" />
            </motion.button>
          </AccountInfoModal>
          <div className="h-px bg-gray-200" />
          <PasswordChangeModal>
            <motion.button
              className="flex w-full items-center py-3"
              whileTap={{ scale: 0.99 }}
            >
              <LockIcon className="mr-3 h-7 w-7" />
              <div className="font-medium">Change password</div>
              <ArrowIcon className="ml-auto h-4 w-4 rotate-[270deg]" />
            </motion.button>
          </PasswordChangeModal>
          <div className="h-px bg-gray-200" />
          {/* <motion.button
            className="flex w-full items-center py-3"
            whileTap={{ scale: 0.99 }}
          >
            <PaymentIcon className="mr-3 h-7 w-7" />
            <div className="font-medium">Manage subscription</div>
            <ArrowIcon className="ml-auto h-4 w-4 rotate-[270deg]" />
          </motion.button>
          <div className="h-px bg-gray-200" /> */}
          <DeleteAccountModal>
            <motion.button
              className="flex w-full items-center py-3"
              whileTap={{ scale: 0.99 }}
            >
              <DeleteIcon className="mr-3 h-7 w-7" />
              <div className="font-medium">Delete account</div>
              <ArrowIcon className="ml-auto h-4 w-4 rotate-[270deg]" />
            </motion.button>
          </DeleteAccountModal>
        </div>
      </section>
    </motion.div>
  )
}
