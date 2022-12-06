# pull official base image
FROM node:16 AS builder

# set working directory
WORKDIR /app


# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json ./

# Installs all node packages
RUN npm install


# Copies everything over to Docker environment
COPY . ./
RUN npm run build

#Stage 2
#######################################

FROM node:16-alpine

WORKDIR /app

RUN npm install express

COPY production/server.js server.js

COPY --from=builder /app/build build

EXPOSE 80

ENTRYPOINT ["node", "server.js"]