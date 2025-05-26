FROM node:18

WORKDIR /app

COPY ./shared/package*.json ./

RUN npm install

COPY ./shared/prisma/ ./prisma/

ENV PRISMA_SCHEMA_PATH=./prisma/schema.prisma

CMD ["npm", "run", "migrate:deploy"]
