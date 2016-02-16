FROM mhart/alpine-node

RUN apk add --update git && npm install -g bower

ADD app app 
ADD bower.json bower.json
ADD index.js index.js
ADD package.json package.json

EXPOSE 8000
CMD ["npm", "start"]