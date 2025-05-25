import { Request, Response } from "express";
import * as grpc from "@grpc/grpc-js";
import {
  categoryToJSON,
  CreateTaskRequest,
  currencyToJSON,
  GetTaskRequest,
  ListTasksResponse,
  UpdateTaskResponse,
  rSVPStatusToJSON,
  TaskResponse,
  taskStatusToJSON,
  roleFromJSON,
} from "../proto/task";
import { UserRequest } from "@/utils/models";
import { getUsersForIds } from "@/services/user";
import taskClient from "@/config/grpc";

export const createTask = (req: UserRequest, res: Response) => {
  try {
    const data = CreateTaskRequest.create({
      ...req.body,
      userId: req.user?.id,
    });
    taskClient.createTask(
      data,
      (err: grpc.ServiceError | null, response: TaskResponse) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          id: response.id,
        });
      }
    );
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: "Error Creating Task" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    taskClient.getTask(
      GetTaskRequest.create({ id: req.params.id }),
      async (err: grpc.ServiceError | null, response: TaskResponse) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
          return;
        }
        if (!response) {
          res.status(200).json({});
          return;
        }
        const userDetails = await getUsersForIds([
          response.userId,
          response.providerId,
        ]);
        const userDetail = userDetails[response.userId];
        const providerDetail = userDetails[response.providerId];
        const taskWithUserData = {
          ...response,
          category: categoryToJSON(response.category),
          rateCurrency: currencyToJSON(response.rateCurrency),
          taskStatus: taskStatusToJSON(response.taskStatus),
          offerRsvp: rSVPStatusToJSON(response.offerRsvp),
          completionRsvp: rSVPStatusToJSON(response.completionRsvp),
          ...(userDetail
            ? {
                user: {
                  name: userDetail.name,
                  company_name: userDetail.company_name,
                },
              }
            : {}),
          ...(providerDetail
            ? {
                provider: {
                  name: providerDetail.name,
                  company_name: providerDetail.company_name,
                },
              }
            : {}),
        };
        res.json(taskWithUserData);
      }
    );
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: "Error Getting Task" });
  }
};

export const getMyTasks = async (req: UserRequest, res: Response) => {
  try {
    taskClient.listMyTasks(
      {
        id: req.user?.id!,
        role: roleFromJSON(req.user?.role),
      },
      async (err: grpc.ServiceError | null, response: ListTasksResponse) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
          return;
        }
        if (!response.tasks) {
          res.status(200).json([]);
          return;
        }
        const userIds = response.tasks
          .map((task) => [task.userId, task.providerId])
          .flat();
        const userDetails = await getUsersForIds(userIds);
        const tasksWithUserData = response.tasks.map((task) => {
          const userDetail = userDetails[task.userId];
          const providerDetail = userDetails[task.providerId];
          const {} = task;
          return {
            ...task,
            category: categoryToJSON(task.category),
            rateCurrency: currencyToJSON(task.rateCurrency),
            taskStatus: taskStatusToJSON(task.taskStatus),
            offerRsvp: rSVPStatusToJSON(task.offerRsvp),
            completionRsvp: rSVPStatusToJSON(task.completionRsvp),
            ...(userDetail
              ? {
                  user: {
                    name: userDetail.name,
                    company_name: userDetail.company_name,
                  },
                }
              : {}),
            ...(providerDetail
              ? {
                  provider: {
                    name: providerDetail.name,
                    company_name: providerDetail.company_name,
                  },
                }
              : {}),
          };
        });
        res.json(tasksWithUserData);
      }
    );
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: "Error Getting My Task" });
  }
};

export const offerForTask = async (req: Request, res: Response) => {
  try {
    taskClient.offerForTask(
      {
        id: req.params.id,
        hourlyRateOffered: req.body.hourlyRateOffered,
        rateCurrency: req.body.rateCurrency,
      },
      async (err: grpc.ServiceError | null, response: UpdateTaskResponse) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(200).json(response);
      }
    );
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: "Error creating offer for Task" });
  }
};

export const updateTaskOfferRsvp = async (req: Request, res: Response) => {
  try {
    taskClient.updateTaskOfferRsvp(
      {
        id: req.params.id,
        offerRsvp: req.body.offerRsvp,
      },
      async (err: grpc.ServiceError | null, response: UpdateTaskResponse) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(200).json(response);
      }
    );
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: "Error updating Task Offer Rsvp" });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    taskClient.updateTaskStatus(
      {
        id: req.params.id,
        taskStatus: req.body.taskStatus,
      },
      async (err: grpc.ServiceError | null, response: UpdateTaskResponse) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(200).json(response);
      }
    );
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: "Error Updaiting Task Status" });
  }
};

export const updateCompletionRsvp = async (req: Request, res: Response) => {
  try {
    taskClient.updateCompletionRsvp(
      {
        id: req.params.id,
        completionRsvp: req.body.completionRsvp,
      },
      async (err: grpc.ServiceError | null, response: UpdateTaskResponse) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(200).json(response);
      }
    );
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: "Error Updating Task Completetion Rsvp" });
  }
};
