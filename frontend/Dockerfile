FROM node:16

CMD [ "npm", "run", "dev" ]

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
