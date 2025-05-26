FROM node:18

WORKDIR /app

COPY rest-api/*.json ./
RUN npm install

COPY rest-api/src ./src
COPY shared/prisma/schema.prisma ./shared/prisma/schema.prisma
COPY shared/proto/task.proto ./shared/proto/task.proto

# prisma client
RUN rm -rf ./src/prisma
RUN mkdir ./src/prisma/
ENV PRISMA_CLIENT_OUTPUT=/app/src/prisma/
RUN npx prisma generate --schema=./shared/prisma/schema.prisma

# proto types
RUN rm -rf ./src/proto
RUN mkdir ./src/proto
RUN npx protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./src/proto --ts_proto_opt=outputServices=grpc-js,useExactTypes=false -I ./shared/proto ./shared/proto/task.proto

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
