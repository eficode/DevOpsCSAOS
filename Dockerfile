FROM node:10 AS app-build
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
COPY backend/ ./backend/
ARG API_URL=https://ohtu-csaos-staging.herokuapp.com
ENV API_URL=${API_URL}
RUN cd frontend && npm install && npm run build
WORKDIR /usr/src/app
RUN cd backend && npm install
CMD ["node", "./backend/server.js"]

