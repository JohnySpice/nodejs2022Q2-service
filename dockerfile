FROM node:16-alpine AS dev
WORKDIR /app
# RUN npm run start

# FROM node:16-alpine AS builder
#
# WORKDIR /app
# RUN chown -R node /app
# USER node
#
# COPY package*.json .
# RUN npm ci
#
# COPY . .
# RUN npm run build
#
# ENV NODE_ENV production
#
# RUN npm ci --ignore-scripts && npm cache clean --force
#
# #PRODUCTION
# FROM node:16-alpine AS production
# WORKDIR /app
#
# RUN chown -R node /app
# USER node
#
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist .
#
# EXPOSE 4000
#
# CMD node main
