FROM node:current-alpine3.20 as builder
WORKDIR "/app"
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
RUN npm run build

# from Nextjs doc
FROM node:current-alpine3.20 as production
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs


COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD npm start
