# Use official Node.js image
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g typescript && npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"] 