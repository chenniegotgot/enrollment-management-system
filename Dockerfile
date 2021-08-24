FROM node:12.13-alpine
# Create app directory
WORKDIR /usr/src/app
# Bundle app source
COPY . .
# npm install
RUN  npm install
# Run npm install --global grpc --unsafe-perm
EXPOSE 3000
CMD [ "npm", "run", "debug" ]