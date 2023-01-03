FROM node:lts-alpine

WORKDIR /app/

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

# TO BUILD AND RUN CONTAINER
# docker build -t [any name] .
# docker run -d --rm -p 5173:5173 --name [name of the container] [your docker image name]
