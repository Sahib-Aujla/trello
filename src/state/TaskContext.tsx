import React, { createContext, useContext, useState, ReactNode } from "react";
import { TaskState } from "../types";

const defaultState: TaskState = {
  Backlog: [],
  "To-Do": [],
  "In Progress": [],
  Done: [],
};

interface TaskContextType {
  tasks: TaskState;
  setTasks: React.Dispatch<React.SetStateAction<TaskState>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<TaskState>(defaultState);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
