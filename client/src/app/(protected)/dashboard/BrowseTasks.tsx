import OfferTaskModal from "@/components/OfferModal";
import Tasks from "@/components/Tasks";
import { API_URL } from "@/utils/config";
import {
  Currency,
  ROLE,
  TaskStatus,
  TaskStatusLabelMap,
} from "@/utils/constants";
import { requestInterceptor } from "@/utils/helper";
import { RSVPStatus, TASK_FIELD, TaskDetails } from "@/utils/types";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [offerModal, setOfferModal] = useState<{
    open: boolean;
    data: TaskDetails | undefined;
  }>({
    open: false,
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

  const handleOfferAction = (task: TaskDetails) => {
    setOfferModal({
      open: true,
      data: task,
    });
  };

  const handleOfferSubmit = (rate: number, currency: Currency) => {
    axios
      .post(
        `${API_URL}/task/${offerModal.data?.id}/offer`,
        {
          hourlyRateOffered: rate,
          rateCurrency: currency,
        },
        requestInterceptor()
      )
      .then(() => {
        setOfferModal({
          open: false,
          data: undefined,
        });
        fetchMyTasks();
      });
  };

  const handleTaskStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    task: TaskDetails
  ) => {
    const { value } = e.target;
    axios
      .put(
        `${API_URL}/task/${task.id}/status`,
        {
          taskStatus: value,
        },
        requestInterceptor()
      )
      .then(() => {
        fetchMyTasks();
      });
  };

  return (
    <div>
      {offerModal.data && (
        <OfferTaskModal
          isOpen={offerModal.open}
          onClose={() => setOfferModal({ open: false, data: undefined })}
          onSubmit={handleOfferSubmit}
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
        role={ROLE.PROVIDER}
        tasks={filteredTasks}
        topActionComp={(task: TaskDetails) => {
          if (task.offered)
            return (
              <div className="font-bold ml-auto text-green-700">Offered</div>
            );
          return (
            <button
              className="underline underline-offset-2 cursor-pointer text-blue-500 font-bold ml-auto"
              onClick={() => handleOfferAction(task)}
            >
              Offer
            </button>
          );
        }}
        bottomActionComp={(task: TaskDetails) => {
          if (
            !task.offered ||
            task[TASK_FIELD.OfferRsvp] !== RSVPStatus.ACCEPTED
          )
            return null;
          return (
            <div className="flex flex-row items-center gap-[5px] ml-auto">
              <label className="block text-sm font-medium">Status&nbsp;:</label>
              <select
                name={TASK_FIELD.TaskStatus}
                value={task[TASK_FIELD.TaskStatus]}
                onChange={(e) => handleTaskStatusChange(e, task)}
                className="border outline-none border-zinc-500 rounded px-1 py-[1px] text-sm"
              >
                {Object.values(TaskStatus).map((curr) => (
                  <option value={curr} key={curr}>
                    {TaskStatusLabelMap[curr]}
                  </option>
                ))}
              </select>
            </div>
          );
        }}
      />
    </div>
  );
};

export default BrowseTasks;
