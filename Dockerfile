# Étape de build
FROM node:20-alpine3.17 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json/yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier tous les fichiers du projet
COPY . .

# Construire l'application
RUN yarn build

# Étape de production
FROM node:20-alpine3.17 AS production

# Définir le répertoire de travail
WORKDIR /app

# Copier les dépendances nécessaires pour l'exécution
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["yarn", "start"]
