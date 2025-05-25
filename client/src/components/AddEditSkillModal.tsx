"use client";

import React, { useState, useEffect } from "react";
import Modal from "./modal";
import {
  Currency,
  SKILL_FIELD,
  SkillData,
  SkillDataWithProvider,
  WorkMode,
} from "@/utils/types";
import { Category, CategoryLabelMap } from "@/utils/constants";

interface AddEditSkillModalProps {
  isOpen: boolean;
  onClose: (fetch?: boolean) => void;
  initialData?: SkillDataWithProvider;
  onSubmit: (form: SkillData) => void;
}

const defaultData = {
  [SKILL_FIELD.Category]: Category.FRONTEND_DEVELOPMENT,
  [SKILL_FIELD.Experience]: 0,
  [SKILL_FIELD.Nature]: WorkMode.ONLINE,
  [SKILL_FIELD.Rate]: 0,
  [SKILL_FIELD.Currency]: Currency.USD,
};

const AddEditSkillModal: React.FC<AddEditSkillModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [form, setForm] = useState<SkillData>(defaultData);

  useEffect(() => {
    if (initialData) {
      const { id, provider_id, provider, ...skillData } = initialData;
      setForm(skillData);
    } else {
      setForm(defaultData);
    }
  }, [initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: [SKILL_FIELD.Experience, SKILL_FIELD.Rate].includes(
        name as SKILL_FIELD
      )
        ? Number(value)
        : value,
    }));
  };

  const isEditMode = !!initialData?.id;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Skill" : "Add Skill"}
      showFooter={false}
      height="fit-content"
    >
      <form className="w-full flex flex-col gap-4 px-4 py-2">
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name={SKILL_FIELD.Category}
            value={form[SKILL_FIELD.Category]}
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
          <label className="block text-sm font-medium">
            Experience (years)
          </label>
          <input
            name={SKILL_FIELD.Experience}
            type="number"
            value={form[SKILL_FIELD.Experience]}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nature Of Work</label>
          <select
            name={SKILL_FIELD.Nature}
            value={form[SKILL_FIELD.Nature]}
            onChange={handleChange}
            className="outline-none mt-1 w-full border rounded px-3 py-2 text-sm"
          >
            <option value={WorkMode.ONLINE}>Online</option>
            <option value={WorkMode.ONSITE}>Onsite</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Rate</label>
          <input
            name={SKILL_FIELD.Rate}
            type="number"
            value={form[SKILL_FIELD.Rate]}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
            placeholder="Hourly rate"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Currency</label>
          <select
            name={SKILL_FIELD.Currency}
            value={form[SKILL_FIELD.Currency]}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
          >
            {Object.values(Currency).map((curr) => (
              <option value={curr} key={curr}>
                {curr}
              </option>
            ))}
          </select>
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
          {isEditMode ? "Update Skill" : "Add Skill"}
        </button>
      </div>
    </Modal>
  );
};

export default AddEditSkillModal;
