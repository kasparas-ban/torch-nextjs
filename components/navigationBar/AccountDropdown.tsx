"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { SignOutButton, useAuth, useUser } from "@clerk/clerk-react"
import { ROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"
import AccountIcon from "@/public/icons/navigationIcons/account.svg"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
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

export default function AccountDropdown() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full bg-white p-0 outline-offset-8 hover:bg-slate-200"
        >
          <Avatar className={cn(user?.imageUrl ? "h-9 w-9" : "h-6 w-6")}>
            <AvatarImage src={user?.imageUrl} alt="Profile image" />
            <AvatarFallback className="bg-transparent">
              <AccountIcon
                className="h-8 hover:cursor-pointer"
                alt="Sign-up/Sign-In"
              />
            </AvatarFallback>
          </Avatar>
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
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href={ROUTES.account.path}>
          <DropdownMenuItem className="hover:cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href={ROUTES.account.path}>
          <DropdownMenuItem className="hover:cursor-pointer">
            Billing
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <SignOutButton signOutCallback={() => router.push(ROUTES.index.path)}>
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
