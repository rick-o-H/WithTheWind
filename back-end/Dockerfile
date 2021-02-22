FROM node:14.8.0-alpine
ENV NODE_ENV=production

WORKDIR /back

COPY package*.json ./

RUN npm install --production

COPY . ./

EXPOSE  3000

CMD [ "node", "index.js"]