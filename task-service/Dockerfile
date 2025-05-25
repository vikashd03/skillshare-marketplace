FROM node:18

WORKDIR /app

COPY task-service/ ./
COPY shared/prisma ./shared/prisma
COPY shared/proto ./shared/proto

RUN npm install

# prisma client
ENV PRISMA_CLIENT_OUTPUT=$(pwd)/src/prisma/
RUN npx prisma generate --schema=./shared/prisma/schema.prisma

# proto types
RUN npx protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./src/proto --ts_proto_opt=outputServices=grpc-js,useExactTypes=false -I ./shared/proto ./shared/proto/task.proto

RUN npm run build

EXPOSE 3000

CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]

