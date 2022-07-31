FROM node:16-alpine
WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm ci && npm cache clean --force

# COPY  ./src/config ./src/config
# RUN npm run runMigration
