FROM ubuntu:16.04

WORKDIR /frontend
COPY . .
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash && apt install -y nodejs && npm install

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["run","dev"]


