FROM node:10 AS app-build
WORKDIR /root
COPY frontend/ ./frontend/
COPY backend/ ./backend/
ARG API_URL=https://ohtu-csaos-staging.herokuapp.com
ENV API_URL=${API_URL}
RUN cd frontend && npm install && npm run build
WORKDIR /root
RUN cd backend && npm install
COPY . .
CMD ["node", "./backend/server.js"]

