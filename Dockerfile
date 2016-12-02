FROM node:7

RUN mkdir /app
WORKDIR /app

COPY .babelrc /app
COPY .sequelizerc /app
COPY package.json /app
COPY bin /app/bin
COPY src /app/src
COPY db /app/db
COPY locales /app/locales

RUN npm install --only=prod

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npm", "start" ]
