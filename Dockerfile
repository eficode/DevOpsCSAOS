FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/frontend/out ./frontend/out
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY . .

CMD ["node", "./backend/app.js"]
