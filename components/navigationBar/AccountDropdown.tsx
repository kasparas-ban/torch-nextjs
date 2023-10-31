"use client"

import Link from "next/link"
import { ROUTES } from "@/config/routes"
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
  const isSignedIn = false

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full p-0 hover:bg-slate-200 focus-visible:ring-2"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage alt="Profile" />
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
  return (
    <DropdownMenuContent className="w-fit min-w-[140px]" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">shadcn</p>
          <p className="text-xs leading-none text-muted-foreground">
            m@example.com
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className="hover:cursor-pointer">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          Billing
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="hover:cursor-pointer">
        Log out
      </DropdownMenuItem>
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
