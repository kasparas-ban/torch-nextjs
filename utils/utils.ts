// import { Time } from "@internationalized/date"
import { StoreApi, UseBoundStore } from "zustand"

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store(s => s[k as keyof typeof s])
  }

  return store
}

export const capitalizeString = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

export const formatDate = (date: Date) =>
  date.toISOString().slice(0, 19).replace("T", " ")
