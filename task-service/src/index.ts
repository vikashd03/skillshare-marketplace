import { Server, ServerCredentials } from "@grpc/grpc-js";
import { TaskServiceService } from "@/proto/task";
import taskImp from "@/imp/tasks";

const server = new Server();
server.addService(TaskServiceService, taskImp);

const PORT = process.env.PORT;

server.bindAsync(
  `0.0.0.0:${PORT}`,
  ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Server binding error:", err);
      return;
    }
    console.log(`Task gRPC service running at 0.0.0.0:${port}`);
  }
);
