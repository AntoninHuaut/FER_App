# Stage build
FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build



# Stage run
FROM node:16-alpine

WORKDIR /app

COPY --from=0 /app/package*.json ./
COPY --from=0 /app/build ./build

ENV VITE_BACKEND_URL=https://ferapi.antoninhuaut.fr

EXPOSE 3000
CMD ["node", "./build"]