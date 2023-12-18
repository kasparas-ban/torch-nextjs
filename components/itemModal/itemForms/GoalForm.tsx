import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { useFieldArray, useForm } from "react-hook-form"
import { Goal } from "@/types/itemTypes"
import { pruneObject } from "@/lib/utils"
import { useItemsList } from "@/api/hooks/items/useItemsList"
import { useUpsertItem } from "@/api/hooks/items/useUpsertItem"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import PriorityInput from "@/components/inputs/PriorityInput"
import SelectField from "@/components/inputs/SelectField"
import SubmitButton from "@/components/submitButton/SubmitButton"
import MinusSmallIcon from "@/public/icons/minus_small.svg"
import PlusSmallIcon from "@/public/icons/plus_small.svg"

import useEditItem from "../hooks/useEditItem"
import useItemModal from "../hooks/useItemModal"
import { goalFormSchema, GoalFormType } from "./schemas"

type InputType = keyof GoalFormType

const formVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  addInitial: { opacity: 0, scale: 0.8 },
  remove: {
    opacity: [1, 0, 0],
    scale: [1, 0.8, 0.8],
    transition: { duration: 0.5 },
  },
}

const getInitialGoalForm = (initialGoal: Goal): GoalFormType => ({
  title: initialGoal?.title || "",
  priority: initialGoal?.priority,
  targetDate: initialGoal?.targetDate,
  tasks:
    initialGoal?.tasks?.map(task => ({ ...task, itemID: task.itemID })) || [],
  dream: initialGoal?.dream
    ? { label: initialGoal.dream.title, value: initialGoal.dream.itemID }
    : undefined,
})

function GoalForm() {
  const { dreams } = useItemsList()
  const { toast } = useToast()
  const { editItem } = useEditItem()
  const { closeModal } = useItemModal()
  const { mutateAsync, reset, isPending, isError, isSuccess } =
    useUpsertItem("GOAL")
  const defaultGoal = getInitialGoalForm(editItem as Goal)

  const defaultInputOrder = (Object.keys(defaultGoal) as InputType[]).filter(
    key => !!defaultGoal[key]
  )
  const [inputOrder, setInputOrder] = useState(defaultInputOrder)

  const form = useForm<GoalFormType>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: defaultGoal,
    shouldUnregister: true,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  })

  const onSubmit = (data: GoalFormType) => {
    const { dream, tasks, ...rest } = data
    const newGoal = {
      ...pruneObject(rest),
      ...(editItem ? { itemID: editItem.itemID } : {}),
      ...(dream ? { parentID: dream.value } : {}),
      type: "GOAL" as const,
    }

    mutateAsync(newGoal)
      .then(() => {
        setTimeout(() => {
          closeModal()
        }, 2000)
      })
      .catch(() => {
        setTimeout(
          () =>
            toast({
              title: "Failed to save",
              description:
                "Your goal has not been saved. Please try adding it again later.",
            }),
          100
        )
        setTimeout(() => reset(), 2000)
      })
  }

  return (
    <div className="grow px-0 pb-2 pt-4 sm:px-10">
      <Form {...form}>
        <form
          className="flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div layout className="relative">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-3 tracking-wide">
                        Goal title
                      </FormLabel>
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
              </motion.div>

              {inputOrder.map(input => {
                if (input === "dream") {
                  const dreamOptions =
                    dreams?.map(dream => ({
                      label: dream.title,
                      value: dream.itemID,
                    })) || []

                  return (
                    <motion.div
                      layout
                      key="goal_dream"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <FormField
                        control={form.control}
                        name="dream"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="pl-3 tracking-wide">
                                Dream
                              </FormLabel>
                              <FormControl>
                                <SelectField
                                  name="dream"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={dreamOptions}
                                  isClearable
                                  menuPosition="fixed"
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </motion.div>
                  )
                }
                if (input === "priority")
                  return (
                    <motion.div
                      layout
                      key="goal_priority"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="pl-3 tracking-wide">
                                Priority
                              </FormLabel>
                              <FormControl>
                                <PriorityInput
                                  value={field.value ?? undefined}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </motion.div>
                  )
                if (input === "targetDate")
                  return (
                    <motion.div
                      layout
                      key="goal_target_date"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <FormField
                        control={form.control}
                        name="targetDate"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="pl-3 tracking-wide">
                                Target date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className={clsx(
                                    "bg-gray-200 placeholder:text-red-200 focus:bg-white",
                                    field.value
                                      ? "text-gray-800"
                                      : "text-gray-400"
                                  )}
                                  type="date"
                                  min={new Date().toLocaleDateString("en-CA")}
                                  onFocus={e => e.target.showPicker()}
                                  onClick={e =>
                                    (e.target as HTMLInputElement).showPicker()
                                  }
                                  value={field.value || ""}
                                  onChange={e => field.onChange(e.target.value)}
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </motion.div>
                  )
              })}
            </AnimatePresence>
          </div>

          <AddGoalSections
            inputOrder={inputOrder}
            setInputOrder={setInputOrder}
          />

          <div className="relative mt-auto flex justify-center">
            <SubmitButton
              isLoading={isPending}
              isSuccess={isSuccess}
              isError={isError}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

function AddGoalSections({
  inputOrder,
  setInputOrder,
}: {
  inputOrder: InputType[]
  setInputOrder: React.Dispatch<React.SetStateAction<InputType[]>>
}) {
  const addInput = (input: InputType) => setInputOrder(prev => [...prev, input])
  const removeInput = (input: InputType) =>
    setInputOrder(prev => prev.filter(inp => inp !== input))

  const getInput = (input: InputType) => inputOrder.find(inp => inp === input)

  return (
    <motion.div layout className="my-4 flex flex-wrap justify-center gap-2">
      <button
        className={clsx(
          "flex rounded-xl px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300",
          getInput("dream") ? "bg-[#d0d0d0]" : "bg-gray-200"
        )}
        onClick={e => {
          e.preventDefault()
          getInput("dream") ? removeInput("dream") : addInput("dream")
        }}
      >
        Assign Dream
        <div className="relative top-1 ml-0.5">
          {getInput("dream") ? (
            <MinusSmallIcon className="h-4 w-4" />
          ) : (
            <PlusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
      <button
        className={clsx(
          "flex rounded-xl px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300",
          getInput("targetDate") ? "bg-[#d0d0d0]" : "bg-gray-200"
        )}
        onClick={e => {
          e.preventDefault()
          getInput("targetDate")
            ? removeInput("targetDate")
            : addInput("targetDate")
        }}
      >
        Target date
        <div className="relative top-1 ml-0.5">
          {getInput("targetDate") ? (
            <MinusSmallIcon className="h-4 w-4" />
          ) : (
            <PlusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
      <button
        className={clsx(
          "flex rounded-xl px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300",
          getInput("priority") ? "bg-[#d0d0d0]" : "bg-gray-200"
        )}
        onClick={e => {
          e.preventDefault()
          getInput("priority") ? removeInput("priority") : addInput("priority")
        }}
      >
        Priority
        <div className="relative top-1 ml-0.5">
          {getInput("priority") ? (
            <MinusSmallIcon className="h-4 w-4" />
          ) : (
            <PlusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
    </motion.div>
  )
}

export default GoalForm
