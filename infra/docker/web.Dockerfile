FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/shared-types ./packages/shared-types

RUN npm install --legacy-peer-deps

COPY apps/web ./apps/web

WORKDIR /app/apps/web
RUN npm run build

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
