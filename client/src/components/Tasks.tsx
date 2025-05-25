import {
  CategoryLabelMap,
  ROLE,
  TaskStatus,
  TaskStatusLabelMap,
} from "@/utils/constants";
import React from "react";
import { RSVPStatusLabelMap, TASK_FIELD, TaskDetails } from "@/utils/types";

const Tasks = ({
  tasks,
  topActionComp,
  bottomActionComp,
  role,
}: {
  tasks: TaskDetails[];
  topActionComp?: (task: TaskDetails) => React.JSX.Element | null;
  bottomActionComp?: (task: TaskDetails) => React.JSX.Element | null;
  role: ROLE;
}) => {
  return (
    <div className="flex flex-wrap px-[40px] py-[50px] gap-[50px]">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="w-[300px] min-h-[300px] bg-white shadow-md rounded-xl p-4 flex flex-col justify-between border border-gray-200 text-sm gap-[20px]"
        >
          {topActionComp && topActionComp(task)}
          <div className="flex flex-col gap-[5px]">
            <div>
              <span className="font-semibold">Category:</span>&nbsp;&nbsp;
              {CategoryLabelMap[task.category] ?? task.category}
            </div>
            <div>
              <span className="font-semibold">Name:</span>&nbsp;&nbsp;
              {task.name}
            </div>
            <div>
              <span className="font-semibold">Description:</span>&nbsp;&nbsp;
              {task.description}
            </div>
            <div>
              <span className="font-semibold">Expected Start:</span>&nbsp;&nbsp;
              {new Date(task.expectedStartDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Expected Hours:</span>&nbsp;&nbsp;
              {task.expectedHours}
            </div>
            <div>
              <span className="font-semibold">Hourly Rate Offered:</span>
              &nbsp;&nbsp;
              {task.hourlyRateOffered
                ? `${task.hourlyRateOffered} ${task.rateCurrency}`
                : "N/A"}
            </div>
            {role === ROLE.USER && (
              <div>
                <span className="font-semibold">Task Status:</span>&nbsp;&nbsp;
                {TaskStatusLabelMap[task.taskStatus]}
              </div>
            )}
            {task[TASK_FIELD.Offered] && role === ROLE.PROVIDER && (
              <div>
                <span className="font-semibold">Offer RSVP:</span>&nbsp;&nbsp;
                {RSVPStatusLabelMap[task.offerRsvp]}
              </div>
            )}
            {task[TASK_FIELD.TaskStatus] === TaskStatus.COMPLETED &&
              role === ROLE.PROVIDER && (
                <div>
                  <span className="font-semibold">Completion RSVP:</span>
                  &nbsp;&nbsp;
                  {RSVPStatusLabelMap[task.completionRsvp]}
                </div>
              )}
          </div>
          {role === ROLE.PROVIDER ? (
            <div className="text-xs break-words">
              <span className="font-semibold text-gray-500">User:</span>
              &nbsp;&nbsp;
              <span className="font-bold">
                {task.user.name || task.user.company_name}
              </span>
            </div>
          ) : role === ROLE.USER ? (
            <div className="text-xs break-words">
              <span className="font-semibold text-gray-500">Provider:</span>
              &nbsp;&nbsp;
              <span className="font-bold">
                {task.provider.name || task.provider.company_name}
              </span>
            </div>
          ) : (
            <div />
          )}
          {bottomActionComp && bottomActionComp(task)}
        </div>
      ))}
    </div>
  );
};

export default Tasks;
