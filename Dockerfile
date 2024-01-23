# Choisir une image de base
FROM node:alpine

# Créer un répertoire pour l'application
WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL

ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
# Copier les fichiers package.json et yarn.lock (ou package-lock.json)
COPY package.json yarn.lock ./

RUN printenv
# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Next.js
RUN yarn build

# Exposer le port (par défaut Next.js utilise le port 3000)
EXPOSE 3000

# Définir les variables d'environnement (exemple)
ENV NEXT_PUBLIC_BACKEND_URL="http://back-dev.leonart-dev.ovh"

# Lancer l'application
CMD ["yarn", "start"]
