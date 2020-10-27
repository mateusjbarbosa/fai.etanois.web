FROM node:12.13.1

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

COPY . ./

EXPOSE 4200

CMD ["npm", "start"]