"use client"

import Image from "next/image"
import accountIcon from "@/public/images/navigationIcons/account.svg"

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
          className="relative h-8 w-8 rounded-full focus-visible:ring-transparent"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={accountIcon} alt="Profile" />
            <AvatarFallback className="bg-transparent hover:bg-slate-200">
              <Image
                src={accountIcon}
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
    <DropdownMenuContent className="w-8" align="end" forceMount>
      <DropdownMenuItem className="hover:cursor-pointer">
        Sign In
      </DropdownMenuItem>
      <DropdownMenuItem className="hover:cursor-pointer">
        Sign Up
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
