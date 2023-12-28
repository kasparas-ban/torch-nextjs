import { Time } from "@internationalized/date"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalizeString = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

export const formatDate = (date: Date) =>
  date.toISOString().slice(0, 19).replace("T", " ")

export const toPercent = (input?: number) => {
  if (input === undefined) return ""

  const percent = input * 100
  const rounded = Math.round(input * 100)

  if (percent !== 0 && rounded === 0) return "<0%"
  if (percent !== 100 && rounded === 100) return "99%"

  return `${rounded.toString()}%`
}

export const formatPercentages = (fraction?: number) => {
  if (fraction === undefined) return "-"
  const rounded = Math.round(fraction * 100 * 10) / 10

  if (rounded === 0 && fraction !== 0) return "<0.1"
  if (rounded === 100 && fraction !== 1) return ">99"

  return `${rounded}`
}

export const formatTimeSpent = (totalSeconds: number) => {
  if (totalSeconds === 0) return "0 h"

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours && minutes) return `${hours} h ${minutes} min`
  if (hours) return `${hours} h`
  if (minutes) return `${minutes} min`
  if (seconds) return `${seconds} sec`
  return "0 h"
}

export const secondsToMinutes = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds - minutes * 60
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}

export const getAllCountries = (lang = "en") => {
  const A = 65
  const Z = 90
  const countryName = new Intl.DisplayNames([lang], { type: "region" })
  const countries: { [key: string]: string | undefined } = {}
  for (let i = A; i <= Z; ++i) {
    for (let j = A; j <= Z; ++j) {
      let code = String.fromCharCode(i) + String.fromCharCode(j)
      let name = countryName.of(code)
      if (code !== name) {
        countries[code] = name
      }
    }
  }

  const countryOptions = Object.entries(countries)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => ({ label: value as string, value: key }))
  return countryOptions
}

export const getCountryName = (countryCode: string) => {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" })
  return regionNames.of(countryCode)
}

export const pruneObject = <T extends Object>(obj: T) => {
  const deepCopy = structuredClone(obj)
  Object.keys(deepCopy).forEach(
    (key: string) =>
      !deepCopy[key as keyof T] && delete deepCopy[key as keyof T]
  )
  return deepCopy
}

export const getTime = (seconds?: number | null) => {
  if (!seconds) return new Time(0)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return new Time(hours, minutes)
}

export function capitalize(text: string) {
  return text[0].toUpperCase() + text.substring(1).toLowerCase()
}
