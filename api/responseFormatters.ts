import { Dream, Goal, ResponseItem, Task } from "@/types/itemTypes"

const formatTaskResponse = (tasks: ResponseItem[]) => {
  return tasks.map(task => ({
    ...task,
    progress: getProgress(task.timeSpent, task.duration),
  }))
}

const formatGoalResponse = (
  tasks: ResponseItem[],
  goals: ResponseItem[],
  dreams: ResponseItem[]
) => {
  return goals.map(goal => {
    const goalTasks = tasks.filter(item => item.parentID === goal.itemID)

    let [tasksDuration, tasksTimeSpent] = [0, 0]
    goalTasks.forEach(task => {
      tasksDuration += task.duration || 0
      tasksTimeSpent += task.timeSpent
    })

    return {
      ...goal,
      progress: getProgress(tasksTimeSpent, tasksDuration),
      dream: dreams.find(dream => dream.itemID === goal.parentID) || null,
      totalTimeSpent: goal.timeSpent + tasksTimeSpent,
    }
  })
}

const formatDreamResponse = (
  tasks: ResponseItem[],
  goals: ResponseItem[],
  dreams: ResponseItem[]
) => {
  return dreams.map(dream => {
    const dreamGoals = goals.filter(goal => goal.parentID === dream.itemID)

    let [tasksDuration, tasksTimeSpent] = [0, 0]
    dreamGoals.forEach(goal => {
      tasks.forEach(task => {
        if (task.parentID === goal.itemID) {
          tasksDuration += task.duration || 0
          tasksTimeSpent += task.timeSpent
        }
      })
    })

    return {
      ...dream,
      progress: getProgress(tasksTimeSpent, tasksDuration),
      totalTimeSpent: dream.timeSpent + tasksTimeSpent,
    }
  })
}

export const formatItemResponse = (response: ResponseItem[]) => {
  const tasksResp = response.filter(item => item.type === "TASK")
  const goalsResp = response.filter(item => item.type === "GOAL")
  const dreamsResp = response.filter(item => item.type === "DREAM")

  let tasks = formatTaskResponse(tasksResp)
  let goals = formatGoalResponse(tasksResp, goalsResp, dreamsResp)
  let dreams = formatDreamResponse(tasksResp, goalsResp, dreamsResp)

  // Add child & parent elements
  const formattedTasks: Task[] = tasks.map(task => {
    const { parentID, ...rest } = task
    return {
      ...rest,
      goal: goals.find(goal => goal.itemID === parentID) || null,
    }
  })

  const formattedGoals: Goal[] = goals.map(goal => {
    const { parentID, ...rest } = goal
    return {
      ...rest,
      tasks: tasks.filter(task => task.parentID === goal.itemID),
      dream: dreams.find(dream => dream.itemID === parentID) || null,
    }
  })

  const formattedDream: Dream[] = dreams.map(dream => {
    return {
      ...dream,
      goals: goals.filter(goal => goal.parentID === dream.itemID),
    }
  })

  return {
    tasks: formattedTasks,
    goals: formattedGoals,
    dreams: formattedDream,
  }
}

const getProgress = (timeSpent: number, duration: number | null) => {
  const progress = duration
    ? Math.round((timeSpent / duration) * 1000) / 1000
    : 0
  return progress > 1 ? 1 : progress
}
