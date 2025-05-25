import AddEditTaskModal, {
  defaultTaskData,
} from "@/components/AddEditTaskModal";
import Skills, { SKILLS_FROM } from "@/components/Skills";
import { API_URL } from "@/utils/config";
import { requestInterceptor } from "@/utils/helper";
import { SKILL_FIELD, SkillDataWithProvider, TaskData } from "@/utils/types";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const BrowseSkills = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [taskModal, setTaskModal] = useState<{
    open: boolean;
    data: SkillDataWithProvider | undefined;
  }>({
    open: false,
    data: undefined,
  });

  const fetchMySkills = () => {
    axios.get(`${API_URL}/skill/all`, requestInterceptor()).then((res) => {
      setSkills(res.data);
    });
  };

  useEffect(() => {
    fetchMySkills();
  }, []);

  const handleCreateAction = (skill: SkillDataWithProvider) => {
    setTaskModal({
      open: true,
      data: skill,
    });
  };

  const handleCreateTask = (data: TaskData) => {
    axios
      .post(
        `${API_URL}/task/new`,
        { ...data, providerId: taskModal.data?.provider_id },
        requestInterceptor()
      )
      .then(() => {
        setTaskModal({
          open: false,
          data: undefined,
        });
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
      <div className="px-10 pt-5 flex flex-row items-center justify-between">
        <span className="font-bold text-3xl">Browse Skills</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-[12px] py-[6px] border-zinc-400 rounded-lg border-2 w-[400px]"
          placeholder="Search Skills..."
        />
      </div>
      {taskModal.data && (
        <AddEditTaskModal
          isOpen={taskModal.open}
          onClose={() => setTaskModal({ open: false, data: undefined })}
          onSubmit={handleCreateTask}
          initialData={{
            ...defaultTaskData,
            category: taskModal.data[SKILL_FIELD.Category],
          }}
        />
      )}
      <Skills
        from={SKILLS_FROM.ALL_SKILLS}
        skills={filteredSkills}
        actionComp={(skill: SkillDataWithProvider) => {
          return (
            <div className="flex flex-row ml-auto">
              <button
                className="underline underline-offset-2 cursor-pointer text-blue-500 font-bold"
                onClick={() => handleCreateAction(skill)}
              >
                Create Task
              </button>
            </div>
          );
        }}
      />
    </div>
  );
};

export default BrowseSkills;
