FROM node:14

RUN apt-get update && apt-get install -y \
  build-essential \
  python3

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
