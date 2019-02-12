FROM node:8

# Install app dependencies
RUN apk add --no-cache \
    ca-certificates
# Install python
RUN sudo apt-get install python

ENV GOLANG_VERSION 1.10.4

# Install GO
RUN set -eux; \
    apk add --no-cache --virtual .build-deps \
    bash \
    gcc \
    musl-dev \
    openssl \
    go \
    ; \
    export \
    GOROOT_BOOTSTRAP="$(go env GOROOT)" \
    GOOS="$(go env GOOS)" \
    GOARCH="$(go env GOARCH)" \
    GOHOSTOS="$(go env GOHOSTOS)" \
    GOHOSTARCH="$(go env GOHOSTARCH)" \
    ; \
    apkArch="$(apk --print-arch)"; \
    case "$apkArch" in \
    armhf) export GOARM='6' ;; \
    x86) export GO386='387' ;; \
    esac; \
    \
    wget -O go.tgz "https://golang.org/dl/go$GOLANG_VERSION.src.tar.gz"; \
    echo '6fe44965ed453cd968a81988523e9b0e794d3a478f91fd7983c28763d52d5781 *go.tgz' | sha256sum -c -; \
    tar -C /usr/local -xzf go.tgz; \
    rm go.tgz; \
    \
    cd /usr/local/go/src; \
    ./make.bash; \
    \
    rm -rf \
    /usr/local/go/pkg/bootstrap \
    /usr/local/go/pkg/obj \
    ; \
    apk del .build-deps; \
    \
    export PATH="/usr/local/go/bin:$PATH"; \
    go version

ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" && chmod -R 777 "$GOPATH"

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