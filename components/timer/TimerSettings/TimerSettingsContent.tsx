import { Dispatch, SetStateAction } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DialogClose } from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import useTimerStore from "../hooks/useTimer"
import useTimerSettings from "../hooks/useTimerSettings"

const timerSettingsSchema = z.object({
  timer: z.number().nonnegative().int(),
  break: z.number().nonnegative().int(),
  longBreak: z.number().nonnegative().int(),
})

type TimerSettingsForm = z.infer<typeof timerSettingsSchema>

export default function TimerSettingsContent({
  setModalOpen,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>
}) {
  const {
    timerDuration,
    breakDuration,
    longBreakDuration,
    setDurations: setStorageDurations,
  } = useTimerSettings()

  const setTimerDurations = useTimerStore.use.setDurations()

  const defaultSettings = {
    timer: timerDuration,
    break: breakDuration,
    longBreak: longBreakDuration,
  }

  const form = useForm<TimerSettingsForm>({
    resolver: zodResolver(timerSettingsSchema),
    defaultValues: defaultSettings,
  })

  const onSubmit = (data: TimerSettingsForm) => {
    setStorageDurations(data.timer, data.break, data.longBreak)
    setTimerDurations(data.timer * 60, data.break * 60, data.longBreak * 60)
    setModalOpen(false)
  }

  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <Form {...form}>
        <form
          className="flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6 px-0 pb-2 sm:px-4">
            <div className="mt-4 inline-flex w-full items-center justify-center">
              <hr className="my-2 h-0.5 w-full rounded border-0 bg-gray-200 dark:bg-gray-700"></hr>
              <div className="absolute left-1/2 -translate-x-1/2 bg-white px-4 dark:bg-gray-900">
                <h2 className="text-xl font-semibold">Duration (min)</h2>
              </div>
            </div>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="timer"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mb-1.5 block p-0 text-center text-base tracking-wide">
                      Timer
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="25"
                        type="number"
                        min={1}
                        max={99}
                        className="bg-gray-200 text-center text-lg placeholder:text-gray-400 focus:bg-white"
                        {...field}
                        onBlur={() => Number(field.value) || field.onChange(1)}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="pl-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="break"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mb-1.5 block p-0 text-center text-base tracking-wide">
                      Break
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="5"
                        type="number"
                        min={1}
                        max={99}
                        className="bg-gray-200 text-center text-lg placeholder:text-gray-400 focus:bg-white"
                        {...field}
                        onBlur={() => Number(field.value) || field.onChange(1)}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="pl-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longBreak"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mb-1.5 block p-0 text-center text-base tracking-wide">
                      Long Break
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="15"
                        type="number"
                        min={1}
                        max={99}
                        className="bg-gray-200 text-center text-lg placeholder:text-gray-400 focus:bg-white"
                        {...field}
                        onBlur={() => Number(field.value) || field.onChange(1)}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="pl-3" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mb-4 mt-auto flex justify-center">
            <DialogClose asChild>
              <motion.button
                className="mt-4 text-xl font-semibold"
                whileHover={{ scale: 1.06 }}
                type="submit"
              >
                Save
              </motion.button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </div>
  )
}
