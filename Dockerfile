# Stage 1: Dependencies

FROM node:alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY  package.json yarn.lock ./
RUN yarn install --production=true --frozen-lockfile --omit=dev
RUN yarn add @types/zxcvbn


# Stage 2: Build
FROM node:alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL

ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN NODE_ENV=production yarn build

# Stage final
FROM node:alpine as runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER 1001

EXPOSE 3000

ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]