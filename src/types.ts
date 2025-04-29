export interface Task {
    id: string;
    title: string;
    description?: string;
  }
  
  export type ColumnType = "Backlog" | "To-Do" | "In Progress" | "Done";
  
  export type TaskState = {
    [key in ColumnType]: Task[];
  };
  