import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

export const withErrorHandler = <Req, Res>(
  handler: (
    call: ServerUnaryCall<Req, Res>,
    callback: sendUnaryData<Res>
  ) => Promise<void>
) => {
  return async (
    call: ServerUnaryCall<Req, Res>,
    callback: sendUnaryData<Res>
  ) => {
    console.log("request -", call.getPath());
    try {
      await handler(call, callback);
    } catch (error: any) {
      console.error("Handler error:", error);
      callback(error, null);
    }
  };
};
