FROM node:13.12.0-alpine3.11 as build
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY public/ ./public
COPY src/ ./src
ARG ENV_FILE
COPY $ENV_FILE .env
COPY tsconfig.json .

RUN npm run build


FROM nginx:1.17.9-alpine

COPY ./nginx /nginx-container-data
COPY --from=build /usr/src/app/build /usr/share/nginx/html

RUN chmod +x /nginx-container-data/entrypoint.sh

ENTRYPOINT ["/nginx-container-data/entrypoint.sh"]