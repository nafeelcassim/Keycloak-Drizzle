FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY drizzle.config.ts ./
COPY tsconfig.json ./

COPY . .

RUN rm -rf node_modules

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main"]

