"use client"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import Select, { GroupBase, Props } from "react-select"
import AsyncSelect, { AsyncProps } from "react-select/async"
import { cn } from "@/lib/utils"

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group>

type AsyncSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = AsyncProps<Option, IsMulti, Group>

const getCache = () =>
  createCache({
    key: "with-tailwind",
    insertionPoint: document.querySelector("title")!,
  })

export const SelectField = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  // if (typeof document === "undefined") return null

  return (
    // <CacheProvider value={getCache()}>
    <Select
      {...props}
      instanceId="select-field"
      classNames={{
        control: ({ isFocused }) =>
          cn(
            "h-10 w-full rounded-2xl bg-gray-200 px-2 text-gray-900 border-none",
            isFocused && "!shadow-none !border-none !ring-2 !ring-ring bg-white"
          ),
        menu: () =>
          cn(
            "rounded-lg overflow-hidden max-[320px]:w-[calc(100vw-2rem)] max-[400px]:w-[calc(100vw-3rem)]"
          ),
        menuList: () => cn("p-0"),
        dropdownIndicator: ({ isFocused }) => cn(isFocused && "fill-red-300"),
      }}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary50: "rgb(217, 221, 226)",
          primary25: "rgb(230, 230, 230)",
          primary: "rgb(179, 179, 179)",
        },
      })}
    />
    // </CacheProvider>
  )
}

export const SelectTypeFirstField = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  // if (typeof document === "undefined") return null

  return (
    // <CacheProvider value={getCache()}>
    <Select
      {...props}
      instanceId="select-field-1"
      classNames={{
        control: ({ isFocused }) =>
          cn(
            "h-10 rounded-l-2xl rounded-r-none bg-gray-200 px-2 text-gray-900 border-0 border-r border-solid border-gray-300",
            isFocused && "!shadow-none !border-none bg-gray-100"
          ),
        menu: () =>
          cn(
            "rounded-lg overflow-hidden max-[320px]:w-[calc(100vw-2rem)] max-[400px]:w-[calc(100vw-3rem)]"
          ),
        menuList: () => cn("p-0"),
        indicatorSeparator: () => cn("hidden"),
        clearIndicator: () => cn("cursor-pointer"),
        option: state => cn("cursor-pointer", state.isSelected && "text-black"),
        singleValue: () => cn("[&>div>div]:truncate"),
      }}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary50: "rgb(217, 221, 226)",
          primary25: "rgb(230, 230, 230)",
          primary: "rgb(200, 200, 200)",
        },
      })}
    />
    // </CacheProvider>
  )
}

export const SelectTypeSecondField = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  // if (typeof document === "undefined") return null

  return (
    // <CacheProvider value={getCache()}>
    <Select
      {...props}
      instanceId="select-field-2"
      classNames={{
        control: ({ isFocused }) =>
          cn(
            "w-28 h-10 rounded-l-none rounded-r-2xl bg-gray-200 text-gray-900 border-none",
            isFocused && "!shadow-none !border-none bg-gray-100"
          ),
        menu: () => cn("rounded-lg overflow-hidden"),
        menuList: () => cn("p-0"),
        indicatorSeparator: () => cn("hidden"),
        clearIndicator: () => cn("cursor-pointer"),
        option: () => cn("cursor-pointer"),
      }}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary50: "rgb(217, 221, 226)",
          primary25: "rgb(230, 230, 230)",
          primary: "rgb(200, 200, 200)",
        },
      })}
    />
    // </CacheProvider>
  )
}

export default SelectField
