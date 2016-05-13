FROM node:5.10.1

MAINTAINER Carles Sistare <carles.sistare@gmail.com>

ENV PROTO ./simple-message.proto

RUN apt-get update && \
  apt-get install -y git vim && \
  wget https://github.com/grpc/grpc/releases/download/release-0_5_0/libgrpc_0.5.0_amd64.deb && \
  wget https://github.com/grpc/grpc/releases/download/release-0_5_0/libgrpc-dev_0.5.0_amd64.deb && \
  dpkg -i libgrpc_0.5.0_amd64.deb libgrpc-dev_0.5.0_amd64.deb

WORKDIR /var/app/grpc

COPY . /var/app/grpc

RUN rm -Rf /var/app/grpc/node_modules && npm install
