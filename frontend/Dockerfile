FROM node:18-alpine AS build

WORKDIR /frontend

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci --silent

RUN npm install react-scripts@5.0.1 -g --silent

COPY ["/src", "/frontend/src"]
COPY ["index.html", "postcss.config.js", "tailwind.config.js", "vite.config.js", "./"]

RUN NODE_ENV=production \
    npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]