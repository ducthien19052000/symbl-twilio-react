FROM node:14.16-buster-slim 
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "run", "dev"]
