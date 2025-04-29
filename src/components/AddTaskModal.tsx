import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useTaskContext } from "../state/TaskContext";
import { v4 as uuidv4 } from 'uuid';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { tasks, setTasks } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: uuidv4(),
      title,
      description,
    };

    setTasks((prev) => ({
      ...prev,
      Backlog: [...prev.Backlog, newTask],
    }));

    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-bold mb-4">Add New Task</Dialog.Title>

          <input
            type="text"
            placeholder="Task Title"
            className="w-full border p-2 mb-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description (optional)"
            className="w-full border p-2 mb-4 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
              onClick={handleAddTask}
            >
              Add
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddTaskModal;
