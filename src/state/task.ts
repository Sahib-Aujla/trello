import { atom } from "recoil";
import { TaskState } from "../types";

export const taskState = atom<TaskState>({
  key: "taskState",
  default: {
    Backlog: [],
    "To-Do": [],
    "In Progress": [],
    Done: [],
  },
});
