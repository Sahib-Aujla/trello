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
    console.log("here")
    const { source, destination } = result;
    console.log("Drag result:", result);
    if (!destination) return;

    const sourceCol = source.droppableId as ColumnType;
    const destCol = destination.droppableId as ColumnType;
    
    const draggedTask = tasks[sourceCol][source.index];
    const isDuplicate = tasks[destCol].some(
      (task) =>
        task.title.toLowerCase() === draggedTask.title.toLowerCase() &&
        task.id !== draggedTask.id
    );

    if (isDuplicate) {
      // Optionally show an error message
      console.log(
        "Cannot move task: A task with this title already exists in the destination column"
      );
      return;
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
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
