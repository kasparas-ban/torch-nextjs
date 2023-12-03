"use client"

import Select, { components, GroupBase, Props } from "react-select"
import { cn } from "@/lib/utils"
import ChevronIcon from "@/public/icons/chevronDown.svg"

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group>

export const SelectField = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  return (
    <Select
      {...props}
      unstyled
      instanceId="select-field"
      classNames={{
        control: ({ isFocused }) =>
          cn(
            "h-10 w-full rounded-2xl border-none bg-gray-200 px-2 text-gray-900",
            isFocused && "!border-none bg-white !shadow-none !ring-2 !ring-ring"
          ),
        placeholder: () => "text-gray-500 pl-2 py-0.5",
        input: () => "pl-2 py-0.5",
        menu: () =>
          "overflow-hidden rounded-lg max-[400px]:w-[calc(100vw-3rem)] max-[320px]:w-[calc(100vw-2rem)] bg-white border mt-1 border-gray-200 drop-shadow-lg",
        singleValue: () => "ml-2 [&>div>div]:truncate",
        indicatorSeparator: () => "my-2 bg-gray-300 mx-2",
        clearIndicator: () => "cursor-pointer hover:text-gray-600",
        option: state =>
          cn(
            "cursor-pointer px-3 py-2 hover:bg-gray-300",
            state.isSelected && "bg-slate-200"
          ),
        indicatorsContainer: () => "mr-1 text-gray-300",
        dropdownIndicator: () => "hover:text-gray-600",
        noOptionsMessage: () => "text-gray-500 my-3",
        groupHeading: () =>
          "text-gray-400 ml-3 font-semibold mt-2 uppercase text-sm",
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
  )
}

export const SelectTypeFirstField = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  return (
    <Select
      {...props}
      unstyled
      instanceId="select-field-1"
      components={{ DropdownIndicator }}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            "h-10 rounded-l-2xl rounded-r-none border-0 border-r border-solid border-gray-300 bg-gray-200 px-2 text-gray-900",
            isFocused && "bg-gray-100 !shadow-none"
          ),
        menu: () =>
          "overflow-hidden rounded-lg max-[400px]:w-[calc(100vw-3rem)] max-[320px]:w-[calc(100vw-2rem)] bg-white border mt-1 border-gray-200 drop-shadow-lg",
        placeholder: () => "text-gray-500 pl-2 py-0.5",
        input: () => "pl-2 py-0.5",
        menuList: () => "p-2",
        indicatorSeparator: () => "hidden",
        clearIndicator: () => "cursor-pointer",
        option: state => cn("cursor-pointer", state.isSelected && "text-black"),
        singleValue: () => "[&>div>div]:truncate",
        indicatorsContainer: () => "mr-1 text-gray-400",
        noOptionsMessage: () => "text-gray-500",
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
  )
}

export function SelectTypeSecondField<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: SelectProps<Option, IsMulti, Group>) {
  return (
    <Select
      {...props}
      unstyled
      instanceId="select-field-2"
      components={{ DropdownIndicator }}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            "h-10 w-28 rounded-l-none rounded-r-2xl border-none bg-gray-200 text-gray-900",
            isFocused && "!border-none bg-gray-100 !shadow-none"
          ),
        menu: () =>
          "overflow-hidden rounded-lg border mt-1 border-gray-200 bg-white drop-shadow-lg",
        input: () => "pl-2 py-0.5",
        singleValue: () => "leading-7 ml-3",
        menuList: () => "p-0",
        indicatorSeparator: () => "hidden",
        clearIndicator: () => "cursor-pointer",
        option: ({ isSelected }) =>
          cn(
            "cursor-pointer px-3 py-2 hover:bg-gray-200",
            isSelected && "bg-slate-200"
          ),
        indicatorsContainer: () => "mr-3 text-gray-400",
        noOptionsMessage: () => "text-gray-500",
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
      isClearable={false}
      isSearchable={false}
    />
  )
}

function DropdownIndicator(props: any) {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronIcon className="relative top-[1px] h-5 w-5" />
    </components.DropdownIndicator>
  )
}

export default SelectField
