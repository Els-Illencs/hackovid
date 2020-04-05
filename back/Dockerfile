FROM node:13.12.0-alpine3.11 as build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


FROM node:13.12.0-alpine3.11 as deps
WORKDIR /app

COPY package*.json ./

RUN npm install --production


FROM node:13.12.0-alpine3.11
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules/
COPY --from=build /app/dist ./dist/

ENTRYPOINT ["node", "dist/index.js"]