import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { ColumnType, Task } from "../types";
import TaskCard from "./TaskCard";

interface Props {
  column: ColumnType;
  tasks: Task[];
}

const Column: React.FC<Props> = ({ column, tasks = [] }) => {
  console.log(column);
  console.log(tasks);
  return (
    <div className="bg-white rounded-lg shadow p-3 min-h-[400px]">
      <h2 className="text-lg font-semibold mb-2">{column}</h2>
      <div>
        <Droppable  droppableId={column} isDropDisabled={false}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-2 min-h-[200px] ${
                snapshot.isDraggingOver ? "bg-gray-50" : ""
              }`}
            >
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  column={column}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
