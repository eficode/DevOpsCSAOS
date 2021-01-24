FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/frontend/out ./frontend/out
COPY backendv2/package*.json ./backendv2/
RUN cd backendv2 && npm install
COPY . .

CMD ["node", "./backendv2/app.js"]