FROM node:18-alpine

WORKDIR /app

COPY client/*.json ./

RUN npm install

COPY client/src ./src
COPY client/.env ./
COPY client/next.config.ts ./
COPY client/postcss.config.mjs ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
