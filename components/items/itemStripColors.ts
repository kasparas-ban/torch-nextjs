import { ItemStatus } from "@/types/itemTypes"

export const getStripBgColor = (
  isEditActive: boolean,
  isEditPanelActive: boolean,
  itemStatus: ItemStatus,
  isRecurring?: boolean
) => {
  if (itemStatus === "COMPLETED") {
    return isEditActive
      ? isEditPanelActive
        ? "bg-green-50"
        : "bg-gray-50"
      : "bg-green-50"
  }

  if (isRecurring) {
    if (itemStatus !== "ACTIVE") {
      return isEditActive
        ? isEditPanelActive
          ? "bg-amber-50"
          : "bg-gray-50"
        : "bg-amber-50"
    }

    return isEditActive
      ? isEditPanelActive
        ? "bg-amber-300"
        : "bg-gray-300"
      : "bg-amber-300"
  }

  if (itemStatus !== "ACTIVE") {
    return isEditActive
      ? isEditPanelActive
        ? "bg-red-50"
        : "bg-gray-50"
      : "bg-red-50"
  }

  return isEditActive
    ? isEditPanelActive
      ? "bg-red-300"
      : "bg-gray-300"
    : "bg-red-300"
}

export const getStripTextColor = (isActive?: boolean) => {
  return isActive ? "text-gray-800" : "text-gray-400"
}

export const getStripBorderColor = (isActive?: boolean) => {
  return isActive ? "border-gray-700" : "border-gray-400"
}

export const getStripBulletColor = (isActive?: boolean) => {
  return isActive ? "border-gray-700" : "border-gray-400"
}

export const getStripDotsColor = (
  isEditActive: boolean,
  isEditPanelActive: boolean,
  itemStatus: ItemStatus,
  isRecurring?: boolean
) => {
  if (itemStatus === "COMPLETED") {
    return isEditActive
      ? isEditPanelActive
        ? "hover:bg-green-100"
        : "hover:bg-gray-100"
      : "hover:bg-green-100"
  }

  if (isRecurring) {
    if (itemStatus !== "ACTIVE") {
      return isEditActive
        ? isEditPanelActive
          ? "hover:bg-amber-100"
          : "hover:bg-gray-100"
        : "hover:bg-amber-100"
    }

    return isEditActive
      ? isEditPanelActive
        ? "hover:bg-amber-200"
        : "hover:bg-gray-200"
      : "hover:bg-amber-200"
  }

  if (itemStatus !== "ACTIVE") {
    return isEditActive
      ? isEditPanelActive
        ? "hover:bg-red-100"
        : "hover:bg-gray-100"
      : "hover:bg-red-100"
  }

  return isEditActive
    ? isEditPanelActive
      ? "hover:bg-red-200"
      : "hover:bg-gray-200"
    : "hover:bg-red-200"
}

export const getProgressBgColor = (
  isEditActive: boolean,
  isEditPanelActive: boolean,
  isActive?: boolean,
  isRecurring?: boolean
) => {
  if (isRecurring) {
    if (!isActive) {
      return isEditActive
        ? isEditPanelActive
          ? "bg-amber-100"
          : "bg-gray-100"
        : "bg-amber-100"
    }
    return isEditActive
      ? isEditPanelActive
        ? "bg-amber-500"
        : "bg-gray-300"
      : "bg-amber-500"
  }

  if (!isActive) {
    return isEditActive
      ? isEditPanelActive
        ? "bg-red-100"
        : "bg-gray-100"
      : "bg-red-100"
  }

  return isEditActive
    ? isEditPanelActive
      ? "bg-red-400"
      : "bg-gray-400"
    : "bg-red-400"
}

export const getStripPercentageColor = (
  isEditActive: boolean,
  isEditPanelActive: boolean,
  itemStatus: ItemStatus,
  isRecurring?: boolean
) => {
  if (itemStatus === "COMPLETED") {
    return isEditActive
      ? isEditPanelActive
        ? "text-green-300"
        : "text-gray-300"
      : "text-green-300"
  }

  if (isRecurring) {
    if (itemStatus !== "ACTIVE") {
      return isEditActive
        ? isEditPanelActive
          ? "text-amber-300"
          : "text-gray-300"
        : "text-amber-300"
    }
    return isEditActive
      ? isEditPanelActive
        ? "text-amber-50"
        : "text-gray-400"
      : "text-amber-50"
  }

  if (itemStatus !== "ACTIVE") {
    return isEditActive
      ? isEditPanelActive
        ? "text-red-300"
        : "text-gray-300"
      : "text-red-300"
  }

  return isEditActive
    ? isEditPanelActive
      ? "text-red-50"
      : "text-gray-400"
    : "text-red-50"
}
