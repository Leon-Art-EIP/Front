# Stage de build
FROM node:alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL

ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

# Copier les fichiers package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Next.js
RUN yarn build

# Supprimer les fichiers inutiles post-construction
RUN rm -rf node_modules && yarn install --production

# Stage final
FROM node:alpine

WORKDIR /app

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# Exposer le port (Next.js utilise le port 3000 par défaut)
EXPOSE 3000

# Lancer l'application en mode production
CMD ["node_modules/.bin/next", "start"]
