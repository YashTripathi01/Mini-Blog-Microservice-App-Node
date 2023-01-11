FROM node:lts-alpine

WORKDIR /app/

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]

# TO BUILD AND RUN CONTAINER
# docker build -t [any name] .
# docker run -d --rm -p 3001:3001 --name [name of the container] [your docker image name]
