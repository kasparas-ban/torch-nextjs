"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { SignOutButton, useAuth, useUser } from "@clerk/clerk-react"
import { ROUTES } from "@/config/routes"
import AccountIcon from "@/public/icons/navigationIcons/account.svg"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import UserAvatar from "../userAvatar/UserAvatar"

export default function AccountDropdown() {
  const { isSignedIn } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full bg-transparent p-0 hover:bg-slate-200 focus-visible:ring-offset-0"
        >
          <UserAvatar className="h-9 w-9 justify-center outline-offset-2">
            <AccountIcon
              className="h-6 hover:cursor-pointer"
              alt="Sign-up/Sign-In"
            />
          </UserAvatar>
        </Button>
      </DropdownMenuTrigger>
      {isSignedIn ? <SignedInContent /> : <NonSignedInContent />}
    </DropdownMenu>
  )
}

function SignedInContent() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <DropdownMenuContent className="w-fit min-w-[140px]" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="font-medium leading-none">{user?.username}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </DropdownMenuLabel>
      {/* <DropdownMenuSeparator /> */}
      <DropdownMenuGroup>
        <Link href={ROUTES.account.path}>
          <DropdownMenuItem className="hover:cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        {/* <Link href={ROUTES.account.path}>
          <DropdownMenuItem className="hover:cursor-pointer">
            Billing
          </DropdownMenuItem>
        </Link> */}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <SignOutButton signOutCallback={() => router.push(ROUTES.signIn.path)}>
        <DropdownMenuItem className="hover:cursor-pointer">
          Log out
        </DropdownMenuItem>
      </SignOutButton>
    </DropdownMenuContent>
  )
}

function NonSignedInContent() {
  return (
    <DropdownMenuContent className="min-w-10" align="end" forceMount>
      <DropdownMenuItem className="hover:cursor-pointer" asChild>
        <Link href={ROUTES.signIn.path}>Sign In</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="hover:cursor-pointer">
        <Link href={ROUTES.signUp.path}>Sign Up</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
