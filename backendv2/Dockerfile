FROM ubuntu:16.04

WORKDIR /backend
COPY . .

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash && apt install -y nodejs && npm install

RUN npm install -D cross-env jest nodemon supertest
RUN npm install dotenv express pg pg-hstore sequelize
RUN npm install -g sequelize-cli

EXPOSE 5000

CMD ["/bin/bash"]
