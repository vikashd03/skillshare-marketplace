import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { TaskServiceClient } from "@/proto/task";

const globalForPrisma = globalThis as unknown as {
  taskClient: TaskServiceClient | undefined;
};

const PROTO_PATH = path.resolve(`${process.env.TASK_GRPC_PROTO}/task.proto`);
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcPackage = grpc.loadPackageDefinition(packageDefinition) as any;
const taskClient: TaskServiceClient = new grpcPackage.task.TaskService(
  process.env.TASK_SERVICE_URI as string,
  grpc.credentials.createInsecure()
);
console.log(
  `Connected to Grpc Service running at ${process.env.TASK_SERVICE_URI}`
);

if (process.env.NODE_ENV !== "prod") globalForPrisma.taskClient = taskClient;

export default taskClient;
