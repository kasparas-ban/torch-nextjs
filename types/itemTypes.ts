// === Items ===

export type ResponseItem = {
  itemID: number
  title: string
  type: ItemType
  targetDate: string | null
  priority: "LOW" | "MEDIUM" | "HIGH" | null
  duration: number | null
  recurring: RecurringType | null
  parentID: number | null
  timeSpent: number
  createdAt: string
}

export type GeneralItem = Omit<ResponseItem, "parentID"> & {
  progress: number
}

export type Task = GeneralItem & {
  goal: GeneralItem | null
}

export type Goal = GeneralItem & {
  totalTimeSpent: number
  tasks: GeneralItem[]
  dream: GeneralItem | null
}

export type Dream = GeneralItem & {
  totalTimeSpent: number
  goals: GeneralItem[]
}

// === Rest ===

// export type GeneralItem = Task | Goal | Dream

export type GroupedItems<T> = {
  [parentId: number | string | "empty" | "other"]: {
    parentLabel?: string
    items: T[]
  }
}

export type FormattedItems = {
  tasks: Task[]
  goals: Goal[]
  dreams: Dream[]
}

export type ItemTypeLabel = "Tasks" | "Goals" | "Dreams"

export type ItemType = "TASK" | "GOAL" | "DREAM"

export type ItemOptionType = {
  value: number
  label: string
  type: ItemType
  containsTasks: boolean
  progress?: number
  timeSpent?: number
  totalTimeSpent?: number
  duration?: number
}

export type GroupedOptionType = {
  value: number
  label: string
  options: Array<ItemOptionType & { parent?: number }>
}

export type TimerState = "idle" | "paused" | "running"

export type RecurringType = {
  times: number
  period: ReccuringPeriod
  progress: number
}

export type ReccuringPeriod = "DAY" | "WEEK" | "MONTH"

export type TimerHistoryRecord = {
  timeSpent: number
  focusOn?: { label: string; value: number; type: ItemType }
  progress?: number
  progressDifference?: number
  startTime: string
  finishTime: string
}

export type Profile = {
  username: string
  email: string
  birthday?: Date
  gender?: GenderOption
  joinedSince: Date
  country?: { label: string; value: string }
}

export type GenderOption =
  | { label: "Male"; value: "MALE" }
  | { label: "Female"; value: "FEMALE" }
  | { label: "Other"; value: "OTHER" }
