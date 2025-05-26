import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import {
  CreateTaskRequest,
  GetTaskRequest,
  ListTasksResponse,
  TaskResponse,
  taskStatusFromJSON,
  currencyFromJSON,
  rSVPStatusFromJSON,
  categoryFromJSON,
  categoryToJSON,
  ListMyTasksRequest,
  OfferForTaskRequest,
  currencyToJSON,
  UpdateTaskStatusRequest,
  taskStatusToJSON,
  UpdateTaskResponse,
  rSVPStatusToJSON,
  UpdateTaskOfferRsvpRequest,
  UpdateCompletionRsvpRequest,
  UpdateTaskRequest,
  DeleteTaskRequest,
  DeleteTaskResponse,
} from "@/proto/task";
import prisma from "@/config/db";
import { Category, Currency, RSVPStatus, Task, TaskStatus } from "@/prisma";
import { withErrorHandler } from "@/utils/helper";
import { roleIdMap } from "@/utils/constant";

const createTask = async (
  call: ServerUnaryCall<CreateTaskRequest, TaskResponse>,
  callback: sendUnaryData<TaskResponse>
) => {
  const data = {
    ...call.request,
    category: categoryToJSON(call.request.category) as Category,
    expectedStartDate: new Date(call.request.expectedStartDate),
  };
  const task = await prisma.task.create({
    data,
  });
  callback(null, {
    ...task,
    expectedStartDate: new Date(task.expectedStartDate).toISOString(),
    createdAt: new Date(task.createdAt).toISOString(),
    updatedAt: new Date(task.updatedAt).toISOString(),
    hourlyRateOffered: task.hourlyRateOffered!,
    category: categoryFromJSON(task.category),
    rateCurrency: currencyFromJSON(task.rateCurrency),
    taskStatus: taskStatusFromJSON(task.taskStatus),
    offerRsvp: rSVPStatusFromJSON(task.offerRsvp),
    completionRsvp: rSVPStatusFromJSON(task.completionRsvp),
  });
};

const updateTask = async (
  call: ServerUnaryCall<UpdateTaskRequest, TaskResponse>,
  callback: sendUnaryData<TaskResponse>
) => {
  const { id: taskId, ...taskDetails } = call.request;
  const data = {
    ...taskDetails,
    category: categoryToJSON(taskDetails.category) as Category,
    expectedStartDate: new Date(taskDetails.expectedStartDate),
  };
  const task = await prisma.task.update({
    where: { id: taskId },
    data,
  });
  callback(null, {
    ...task,
    expectedStartDate: new Date(task.expectedStartDate).toISOString(),
    createdAt: new Date(task.createdAt).toISOString(),
    updatedAt: new Date(task.updatedAt).toISOString(),
    hourlyRateOffered: task.hourlyRateOffered!,
    category: categoryFromJSON(task.category),
    rateCurrency: currencyFromJSON(task.rateCurrency),
    taskStatus: taskStatusFromJSON(task.taskStatus),
    offerRsvp: rSVPStatusFromJSON(task.offerRsvp),
    completionRsvp: rSVPStatusFromJSON(task.completionRsvp),
  });
};

const getTask = async (
  call: ServerUnaryCall<GetTaskRequest, TaskResponse>,
  callback: sendUnaryData<TaskResponse>
) => {
  const task = await prisma.task.findUnique({
    where: { id: call.request.id },
  });

  if (!task) {
    return callback(null, {} as TaskResponse);
  }

  callback(null, {
    ...task,
    expectedStartDate: new Date(task.expectedStartDate).toISOString(),
    createdAt: new Date(task.createdAt).toISOString(),
    updatedAt: new Date(task.updatedAt).toISOString(),
    hourlyRateOffered: task.hourlyRateOffered!,
    category: categoryFromJSON(task.category),
    rateCurrency: currencyFromJSON(task.rateCurrency),
    taskStatus: taskStatusFromJSON(task.taskStatus),
    offerRsvp: rSVPStatusFromJSON(task.offerRsvp),
    completionRsvp: rSVPStatusFromJSON(task.completionRsvp),
  });
};

const deleteTask = async (
  call: ServerUnaryCall<DeleteTaskRequest, DeleteTaskResponse>,
  callback: sendUnaryData<DeleteTaskResponse>
) => {
  await prisma.task.delete({
    where: {
      id: call.request.id,
    },
  });
  callback(null, {
    msg: "Task Deleted",
  });
};

const listMyTasks = async (
  call: ServerUnaryCall<ListMyTasksRequest, ListTasksResponse>,
  callback: sendUnaryData<ListTasksResponse>
) => {
  const tasks = await prisma.task.findMany({
    where: {
      [roleIdMap[call.request.role]]: call.request.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  callback(null, {
    tasks: tasks.map((task: Task) => ({
      ...task,
      expectedStartDate: new Date(task.expectedStartDate).toISOString(),
      createdAt: new Date(task.createdAt).toISOString(),
      updatedAt: new Date(task.updatedAt).toISOString(),
      hourlyRateOffered: task.hourlyRateOffered!,
      category: categoryFromJSON(task.category),
      rateCurrency: currencyFromJSON(task.rateCurrency),
      taskStatus: taskStatusFromJSON(task.taskStatus),
      offerRsvp: rSVPStatusFromJSON(task.offerRsvp),
      completionRsvp: rSVPStatusFromJSON(task.completionRsvp),
    })),
  });
};

const offerForTask = async (
  call: ServerUnaryCall<OfferForTaskRequest, UpdateTaskResponse>,
  callback: sendUnaryData<UpdateTaskResponse>
) => {
  const task = await prisma.task.update({
    where: {
      id: call.request.id,
    },
    data: {
      hourlyRateOffered: call.request.hourlyRateOffered,
      rateCurrency: currencyToJSON(call.request.rateCurrency) as Currency,
      offered: true,
    },
  });
  callback(null, {
    id: task.id,
  });
};

const updateTaskOfferRsvp = async (
  call: ServerUnaryCall<UpdateTaskOfferRsvpRequest, UpdateTaskResponse>,
  callback: sendUnaryData<UpdateTaskResponse>
) => {
  const task = await prisma.task.update({
    where: {
      id: call.request.id,
    },
    data: {
      offerRsvp: rSVPStatusToJSON(call.request.offerRsvp) as RSVPStatus,
    },
  });
  callback(null, {
    id: task.id,
  });
};

const updateTaskStatus = async (
  call: ServerUnaryCall<UpdateTaskStatusRequest, UpdateTaskResponse>,
  callback: sendUnaryData<UpdateTaskResponse>
) => {
  const task = await prisma.task.update({
    where: {
      id: call.request.id,
    },
    data: {
      taskStatus: taskStatusToJSON(call.request.taskStatus) as TaskStatus,
    },
  });
  callback(null, {
    id: task.id,
  });
};

const updateCompletionRsvp = async (
  call: ServerUnaryCall<UpdateCompletionRsvpRequest, UpdateTaskResponse>,
  callback: sendUnaryData<UpdateTaskResponse>
) => {
  const task = await prisma.task.update({
    where: {
      id: call.request.id,
    },
    data: {
      completionRsvp: rSVPStatusToJSON(
        call.request.completionRsvp
      ) as RSVPStatus,
    },
  });
  callback(null, {
    id: task.id,
  });
};

export default {
  createTask: withErrorHandler(createTask),
  updateTask: withErrorHandler(updateTask),
  deleteTask: withErrorHandler(deleteTask),
  getTask: withErrorHandler(getTask),
  listMyTasks: withErrorHandler(listMyTasks),
  offerForTask: withErrorHandler(offerForTask),
  updateTaskOfferRsvp: withErrorHandler(updateTaskOfferRsvp),
  updateTaskStatus: withErrorHandler(updateTaskStatus),
  updateCompletionRsvp: withErrorHandler(updateCompletionRsvp),
};
