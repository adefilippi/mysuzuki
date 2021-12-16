FROM node:10-alpine

RUN apk add --no-cache \
  nano \
  make \
  bash \
  bash-doc \
  bash-completion \
  py-pip \
  build-base

RUN apk add --no-cache su-exec git python3 && \
  addgroup bar && \
  adduser -D -h /home -s /bin/sh -G bar foo

ADD entrypoint.sh /entrypoint

WORKDIR /home/node/app
ENTRYPOINT ["/entrypoint"]
