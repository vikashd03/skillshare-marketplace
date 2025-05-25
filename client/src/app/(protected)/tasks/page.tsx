"use client";

import AddEditTaskModal from "@/components/AddEditTaskModal";
import DeleteModal from "@/components/DeleteModal";
import Tasks from "@/components/Tasks";
import { API_URL } from "@/utils/config";
import { MODAL_TYPE, ROLE, TaskStatus } from "@/utils/constants";
import { requestInterceptor } from "@/utils/helper";
import {
  RSVPStatus,
  RSVPStatusLabelMap,
  TASK_FIELD,
  TaskData,
  TaskDetails,
} from "@/utils/types";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [taskModal, setTaskModal] = useState<{
    open: boolean;
    type: MODAL_TYPE | "";
    data: TaskData | undefined;
  }>({
    open: false,
    type: "",
    data: undefined,
  });

  const fetchMyTasks = () => {
    axios.get(`${API_URL}/task/me`, requestInterceptor()).then((res) => {
      setTasks(res.data);
    });
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const filteredTasks = useMemo(
    () =>
      search
        ? tasks.filter((task) =>
            Object.values(task)
              .join()
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        : tasks,
    [tasks, search]
  );

  const handleOfferRsvpChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    task: TaskDetails
  ) => {
    const { value } = e.target;
    axios
      .put(
        `${API_URL}/task/${task.id}/offer/rsvp`,
        {
          offerRsvp: value,
        },
        requestInterceptor()
      )
      .then(() => {
        fetchMyTasks();
      });
  };

  const handleCompletionRsvp = (
    e: React.ChangeEvent<HTMLSelectElement>,
    task: TaskDetails
  ) => {
    const { value } = e.target;
    axios
      .put(
        `${API_URL}/task/${task.id}/complete/rsvp`,
        {
          completionRsvp: value,
        },
        requestInterceptor()
      )
      .then(() => {
        fetchMyTasks();
      });
  };

  const handleEdit = (task: TaskDetails) => {
    setTaskModal({
      open: true,
      data: task,
      type: MODAL_TYPE.EDIT,
    });
  };

  const handleDelete = (task: TaskDetails) => {
    setTaskModal({
      open: true,
      data: task,
      type: MODAL_TYPE.DELETE,
    });
  };

  const handleDeleteTask = () => {
    axios
      .delete(`${API_URL}/task/${taskModal.data?.id}`, requestInterceptor())
      .then(() => {
        setTaskModal({ open: false, data: undefined, type: "" });
        fetchMyTasks();
      });
  };

  const handleUpdateTask = (data: TaskData) => {
    axios
      .put(`${API_URL}/task/${taskModal.data?.id}`, data, requestInterceptor())
      .then(() => {
        setTaskModal({
          open: false,
          type: "",
          data: undefined,
        });
        fetchMyTasks();
      });
  };

  return (
    <div>
      {taskModal.type === MODAL_TYPE.EDIT && taskModal.data && (
        <AddEditTaskModal
          isOpen={taskModal.open}
          onClose={() =>
            setTaskModal({ open: false, type: "", data: undefined })
          }
          onSubmit={handleUpdateTask}
          initialData={taskModal.data}
        />
      )}
      {taskModal.type === MODAL_TYPE.DELETE && (
        <DeleteModal
          isOpen={taskModal.open}
          title="Delete Task"
          desc="Do you want to Delete this tasj?"
          onClose={(fetch = false) => {
            setTaskModal((prev) => ({
              ...prev,
              open: !prev.open,
              type: "",
            }));
            fetch && fetchMyTasks();
          }}
          onSubmit={handleDeleteTask}
        />
      )}
      <div className="px-10 pt-5 flex flex-row items-center justify-between">
        <span className="font-bold text-3xl">Browse Tasks</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-[12px] py-[6px] border-zinc-400 rounded-lg border-2 w-[400px]"
          placeholder="Search Tasks..."
        />
      </div>
      <Tasks
        role={ROLE.USER}
        tasks={filteredTasks}
        topActionComp={(task: TaskDetails) => {
          return (
            <div className="flex flex-row gap-[10px] ml-auto">
              <button
                className="underline underline-offset-2 cursor-pointer text-blue-500 font-bold"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button
                className="underline underline-offset-2 cursor-pointer text-blue-500 font-bold"
                onClick={() => handleDelete(task)}
              >
                Delete
              </button>
            </div>
          );
        }}
        bottomActionComp={(task: TaskDetails) => {
          if (task[TASK_FIELD.TaskStatus] === TaskStatus.COMPLETED) {
            return (
              <div className="w-full flex flex-row items-center justify-between">
                <div className="font-bold text-green-700">Completed</div>
                <div className="flex flex-row items-center gap-[5px]">
                  <label className="block text-sm font-medium">
                    RSVP&nbsp;:
                  </label>
                  <select
                    name={TASK_FIELD.CompletionRsvp}
                    value={task[TASK_FIELD.CompletionRsvp]}
                    onChange={(e) => handleCompletionRsvp(e, task)}
                    className="border outline-none border-zinc-500 rounded px-1 py-[1px] text-sm"
                  >
                    {Object.values(RSVPStatus).map((curr) => (
                      <option value={curr} key={curr}>
                        {RSVPStatusLabelMap[curr]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          }
          if (!task.offered)
            return (
              <div className="font-bold text-gray-600">Awaiting offer</div>
            );
          return (
            <div className="w-full flex flex-row items-center justify-between">
              <div className="font-bold text-green-700">Offered</div>
              <div className="flex flex-row items-center gap-[5px]">
                <label className="block text-sm font-medium">RSVP&nbsp;:</label>
                <select
                  name={TASK_FIELD.OfferRsvp}
                  value={task[TASK_FIELD.OfferRsvp]}
                  onChange={(e) => handleOfferRsvpChange(e, task)}
                  className="border outline-none border-zinc-500 rounded px-1 py-[1px] text-sm"
                >
                  {Object.values(RSVPStatus).map((curr) => (
                    <option value={curr} key={curr}>
                      {RSVPStatusLabelMap[curr]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default BrowseTasks;
