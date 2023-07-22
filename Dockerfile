FROM node:18-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . /app

EXPOSE 3036
CMD [ "npm", "run" , "start" ]