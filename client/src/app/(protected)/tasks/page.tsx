"use client";

import Tasks from "@/components/Tasks";
import { API_URL } from "@/utils/config";
import { ROLE, TaskStatus } from "@/utils/constants";
import { requestInterceptor } from "@/utils/helper";
import {
  RSVPStatus,
  RSVPStatusLabelMap,
  TASK_FIELD,
  TaskDetails,
} from "@/utils/types";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

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

  return (
    <div>
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
