FROM node:10-slim

WORKDIR /app
RUN chmod -R 777 /app
RUN chown -R nobody /app

COPY package.json /app

RUN npm install

COPY app.js /app
COPY api /app/api

EXPOSE 11000

CMD node app.js