FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install Python
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

# Install Go
RUN apk add --no-cache git make musl-dev go

# Configure Go
ENV GOROOT /usr/lib/go
ENV GOPATH /go
ENV PATH /go/bin:$PATH

RUN mkdir -p ${GOPATH}/src ${GOPATH}/bin

# Install Glide
RUN go get -u github.com/Masterminds/glide/...

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

RUN cd ./util/go; npm install; cd ../../

EXPOSE 8080

CMD [ "npm", "start" ]