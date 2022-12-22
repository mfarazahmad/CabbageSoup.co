FROM node:alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY . .

EXPOSE 7002
CMD ["node", "server.js"]