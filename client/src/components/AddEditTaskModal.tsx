"use client";

import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { TASK_FIELD, TaskData } from "@/utils/types";
import { Category, CategoryLabelMap } from "@/utils/constants";

interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: (fetch?: boolean) => void;
  initialData: TaskData;
  onSubmit: (form: TaskData) => void;
}

export const defaultTaskData: TaskData = {
  category: Category.FRONTEND_DEVELOPMENT,
  name: "",
  description: "",
  expectedStartDate: new Date().toISOString().split("T")[0],
  expectedHours: 1,
};

const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [form, setForm] = useState<TaskData>(defaultTaskData);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        expectedStartDate: new Date(initialData.expectedStartDate)
          .toISOString()
          .split("T")[0],
      });
    } else {
      setForm(defaultTaskData);
    }
  }, [initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev: TaskData) => ({
      ...prev,
      [name]: name === "expectedHours" ? Number(value) : value,
    }));
  };

  const isEditMode = !!initialData.id;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Task" : "Add Task"}
      showFooter={false}
      height="fit-content"
    >
      <form className="w-full flex flex-col gap-4 px-4 py-2">
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name={TASK_FIELD.Category}
            value={form[TASK_FIELD.Category]}
            onChange={handleChange}
            className="outline-none mt-1 w-full border rounded px-3 py-2 text-sm"
          >
            {Object.values(Category).map((curr) => (
              <option value={curr} key={curr}>
                {CategoryLabelMap[curr]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Task Name</label>
          <input
            name={TASK_FIELD.Name}
            value={form[TASK_FIELD.Name]}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
            placeholder="e.g., Build Landing Page"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name={TASK_FIELD.Description}
            value={form[TASK_FIELD.Description]}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
            placeholder="Describe the task..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Expected Start Date
          </label>
          <input
            name={TASK_FIELD.ExpectedStartDate}
            type="date"
            value={form[TASK_FIELD.ExpectedStartDate]}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Expected Hours</label>
          <input
            name={TASK_FIELD.ExpectedHours}
            type="number"
            value={form[TASK_FIELD.ExpectedHours]}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </form>
      <div className="w-full flex justify-between px-4 pb-3 mt-6">
        <button
          onClick={() => onClose()}
          className="bg-white border rounded px-4 py-1 hover:bg-gray-100 text-sm cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit(form)}
          className="bg-teal-600 font-bold text-white rounded px-4 py-1 hover:bg-teal-600 text-sm cursor-pointer"
        >
          {isEditMode ? "Update Task" : "Add Task"}
        </button>
      </div>
    </Modal>
  );
};

export default AddEditTaskModal;
