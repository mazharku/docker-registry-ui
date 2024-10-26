FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# docker build -t registr-ui .

# docker run -p 3000:3000 registry-ui