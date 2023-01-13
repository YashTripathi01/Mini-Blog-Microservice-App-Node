FROM node:lts-alpine

WORKDIR /app/

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm", "run", "dev"]

# TO BUILD AND RUN CONTAINER
# docker build -t [any name] .
# docker run -d --rm -p 3004:3004 --name [name of the container] [your docker image name]
