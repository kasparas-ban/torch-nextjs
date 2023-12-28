export const getStripBgColor = (
  isEditActive: boolean,
  isEditPanelActive: boolean,
  isArchived: boolean,
  isRecurring?: boolean
) => {
  if (isRecurring) {
    if (isArchived) {
      return isEditActive
        ? isEditPanelActive
          ? "bg-amber-50"
          : "bg-gray-50"
        : "bg-amber-50"
    }

    return isEditActive
      ? isEditPanelActive
        ? "bg-amber-400"
        : "bg-gray-300"
      : "bg-amber-400"
  }

  if (isArchived) {
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

export const getStripTextColor = (isArchived?: boolean) => {
  return isArchived ? "text-gray-400" : "text-gray-800"
}

export const getStripBorderColor = (isArchived?: boolean) => {
  return isArchived ? "border-gray-400" : "border-gray-700"
}

export const getStripBulletColor = (isArchived?: boolean) => {
  return isArchived ? "border-gray-400" : "border-gray-700"
}

export const getStripDotsColor = (
  isEditActive: boolean,
  isEditPanelActive: boolean,
  isArchived: boolean,
  isRecurring?: boolean
) => {
  if (isRecurring) {
    if (isArchived) {
      return isEditActive
        ? isEditPanelActive
          ? "hover:bg-amber-100"
          : "hover:bg-gray-100"
        : "hover:bg-amber-100"
    }

    return isEditActive
      ? isEditPanelActive
        ? "hover:bg-amber-500"
        : "hover:bg-gray-400"
      : "hover:bg-amber-500"
  }

  if (isArchived) {
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
  isArchived?: boolean,
  isRecurring?: boolean
) => {
  if (isRecurring) {
    if (isArchived) {
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

  if (isArchived) {
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
