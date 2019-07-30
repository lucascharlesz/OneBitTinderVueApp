# estágio de compilação
FROM node:11-alpine as build-stage

RUN apk add --no-cache git

ENV SERVER_PATH /OneBitTinderVueApp

WORKDIR /app

COPY . .
COPY package.json yarn*.lock ./
RUN yarn config set no-progress && yarn install

RUN NODE_ENV=production yarn build

# estágio de produção
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


