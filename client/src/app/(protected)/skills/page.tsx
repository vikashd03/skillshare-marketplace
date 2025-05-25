"use client";

import AddEditSkillModal from "@/components/AddEditSkillModal";
import DeleteModal from "@/components/DeleteModal";
import Skills, { SKILLS_FROM } from "@/components/Skills";
import { API_URL } from "@/utils/config";
import { requestInterceptor } from "@/utils/helper";
import { SkillData, SkillDataWithProvider } from "@/utils/types";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

enum MODAL_TYPE {
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

const page = () => {
  const [skills, setSkills] = useState<SkillDataWithProvider[]>([]);
  const [search, setSearch] = useState("");
  const [skillModal, setSkillModal] = useState<{
    open: boolean;
    type: MODAL_TYPE | "";
    data: SkillDataWithProvider | undefined;
  }>({
    open: false,
    type: "",
    data: undefined,
  });

  const fetchMySkills = () => {
    axios.get(`${API_URL}/skill/me`, requestInterceptor()).then((res) => {
      setSkills(res.data);
    });
  };

  useEffect(() => {
    fetchMySkills();
  }, []);

  const handleEdit = (skill: SkillDataWithProvider) => {
    setSkillModal({
      open: true,
      data: skill,
      type: MODAL_TYPE.EDIT,
    });
  };

  const handleDelete = (skill: SkillDataWithProvider) => {
    setSkillModal({
      open: true,
      data: skill,
      type: MODAL_TYPE.DELETE,
    });
  };

  const handleAddEditSkill = (data: SkillData) => {
    axios[skillModal.type === MODAL_TYPE.EDIT ? "put" : "post"](
      `${API_URL}/skill/${skillModal.data?.id || "new"}`,
      data,
      requestInterceptor()
    ).then(() => {
      setSkillModal({ open: false, data: undefined, type: "" });
      fetchMySkills();
    });
  };

  const handleDeleteSkill = () => {
    axios
      .delete(`${API_URL}/skill/${skillModal.data?.id}`, requestInterceptor())
      .then(() => {
        setSkillModal({ open: false, data: undefined, type: "" });
        fetchMySkills();
      });
  };

  const filteredSkills = useMemo(
    () =>
      search
        ? skills.filter((skill) =>
            Object.values(skill)
              .join()
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        : skills,
    [skills, search]
  );

  return (
    <div>
      {skillModal.type &&
        [MODAL_TYPE.CREATE, MODAL_TYPE.EDIT].includes(skillModal.type) && (
          <AddEditSkillModal
            isOpen={skillModal.open}
            initialData={skillModal.data}
            onClose={() =>
              setSkillModal({
                open: false,
                type: "",
                data: undefined,
              })
            }
            onSubmit={handleAddEditSkill}
          />
        )}
      {skillModal.type === MODAL_TYPE.DELETE && (
        <DeleteModal
          isOpen={skillModal.open}
          title="Delete Skill"
          desc="Do you want to Delete this skill?"
          onClose={(fetch = false) => {
            setSkillModal((prev) => ({
              ...prev,
              open: !prev.open,
              type: "",
            }));
            fetch && fetchMySkills();
          }}
          onSubmit={handleDeleteSkill}
        />
      )}
      <div className="px-10 pt-5 flex flex-row items-center justify-between">
        <button
          className="px-[15px] py-[5px] text-lg border-2 rounded-lg border-black/60 hover:bg-blue-200 cursor-pointer"
          onClick={() =>
            setSkillModal((prev) => ({
              ...prev,
              open: !prev.open,
              type: MODAL_TYPE.CREATE,
            }))
          }
        >
          Add Skill
        </button>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-[12px] py-[6px] border-zinc-400 rounded-lg border-2 w-[400px]"
          placeholder="Search Skills..."
        />
      </div>
      <Skills
        skills={filteredSkills}
        from={SKILLS_FROM.MY_SKILLS}
        actionComp={(skill: SkillDataWithProvider) => {
          return (
            <div className="flex flex-row gap-[10px] ml-auto">
              <button
                className="underline underline-offset-2 cursor-pointer text-blue-500 font-bold"
                onClick={() => handleEdit(skill)}
              >
                Edit
              </button>
              <button
                className="underline underline-offset-2 cursor-pointer text-blue-500 font-bold"
                onClick={() => handleDelete(skill)}
              >
                Delete
              </button>
            </div>
          );
        }}
      />
    </div>
  );
};

export default page;
