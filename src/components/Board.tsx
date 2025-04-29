import Column from "./Column";
import { ColumnType } from "../types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskContext } from "../state/TaskContext";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";

const columns: ColumnType[] = ["Backlog", "To-Do", "In Progress", "Done"];

const Board = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, setTasks } = useTaskContext();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId as ColumnType;
    const destCol = destination.droppableId as ColumnType;

    const draggedTask = tasks[sourceCol][source.index];

    for (let i = 0; i < tasks[destCol].length; i++) {
      if (tasks[destCol][i].id === draggedTask.id) {
        return;
      }
    }

    const newSourceTasks = Array.from(tasks[sourceCol]);
    newSourceTasks.splice(source.index, 1);

    const newDestTasks = Array.from(tasks[destCol]);
    newDestTasks.splice(destination.index, 0, draggedTask);

    setTasks({
      ...tasks,
      [sourceCol]: newSourceTasks,
      [destCol]: newDestTasks,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Task Board</h1>
        <button
          className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-600 "
          onClick={() => setIsModalOpen(true)}
        >
          + Add Task
        </button>
      </div>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((column) => (
            <Column key={column} column={column} tasks={tasks[column]} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
