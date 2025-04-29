import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task, ColumnType } from "../types";
import { useTaskContext } from "../state/TaskContext";

interface Props {
  task: Task;
  index: number;
  column: ColumnType;
}

const TaskCard: React.FC<Props> = ({ task, index, column }) => {
  const { tasks, setTasks } = useTaskContext();

  const handleDelete = () => {
    const newTasks = tasks[column].filter((t) => t.id !== task.id);
    setTasks({
      ...tasks,
      [column]: newTasks,
    });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="bg-gray-100 p-3 rounded shadow flex justify-between items-start"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <p className="font-semibold">{task.title}</p>
            {task.description && <p className="text-sm">{task.description}</p>}
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 font-bold text-sm hover:underline ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
