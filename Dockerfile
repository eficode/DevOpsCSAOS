FROM node:16 AS app-build
WORKDIR /root
COPY frontend/ ./frontend/
COPY backend/ ./backend/
ARG API_URL=https://devops-csaos.herokuapp.com/api
ENV API_URL=${API_URL}
RUN cd frontend && npm install && npm run build
WORKDIR /root
RUN cd backend && npm install
RUN mv ./frontend ./backend/frontend
CMD ["node", "./backend/server.js"]