FROM node:14.8.0-alpine as build

WORKDIR /front

ENV PATH /front/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . ./


FROM nginx:stable-alpine

COPY --from=build /front/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]