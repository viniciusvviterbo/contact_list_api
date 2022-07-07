FROM node:latest

WORKDIR /app

COPY ./package*.json ./
COPY ./src ./src

EXPOSE 8000

RUN npm install &&  npm run build
CMD ["npm", "start"]
