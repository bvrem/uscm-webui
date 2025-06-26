FROM node:22

WORKDIR /app
COPY . .

RUN npm install
RUN npm run prd

WORKDIR /app/dist/uscm-webui
CMD ["node", "server/server.mjs"]
EXPOSE 4200:4000
