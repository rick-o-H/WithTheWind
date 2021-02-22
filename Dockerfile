FROM node:14.8.0-alpine
ENV NODE_ENV=production

WORKDIR /with-the-wind

COPY package*.json ./

RUN npm install --production

COPY . ./

EXPOSE  3000

CMD [ "npm", "run", "pm2"]