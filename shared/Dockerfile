FROM node:18

WORKDIR /app

COPY ./shared/prisma ./prisma
COPY ./shared/package*.json ./

RUN npm install

CMD ["npx", "prisma", "migrate", "deploy", "--schema=./prisma/schema.prisma"]
