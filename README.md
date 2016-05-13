docker build -t grpc .

export PROTO=./simple-message.proto

docker run -p 50051:50051 --env PROTO=./simple-message.proto -it grpc npm run start-grpc
docker run -p 3000:3000 -it grpc npm run start-http


export MESSAGE=./simple-short.json
export HOST=192.168.99.100
./bulk-grpc.sh
./bulk-http.sh
