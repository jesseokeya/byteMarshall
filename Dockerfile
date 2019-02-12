FROM node:8

# Install app dependencies & Install python
RUN apt-get install python

RUN cho "installing go version 1.10.3..." \
    apk add --no-cache --virtual .build-deps bash gcc musl-dev openssl go \
    wget -O go.tgz https://dl.google.com/go/go1.10.3.src.tar.gz \
    tar -C /usr/local -xzf go.tgz \
    cd /usr/local/go/src/ \
    ./make.bash \
    export PATH="/usr/local/go/bin:$PATH" \
    export GOPATH=/opt/go/ \
    export PATH=$PATH:$GOPATH/bin \ 
    apk del .build-deps \
    go version

# https://github.com/mickep76/alpine-golang/blob/master/Dockerfile

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]