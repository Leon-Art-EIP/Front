# Utiliser une image Node.js comme base
FROM node:20-alpine3.17

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN yarn install

# Copier tous les fichiers du projet
COPY . .

RUN yarn build
# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["yarn", "start"]