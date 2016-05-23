docker build -t grpc .

export PROTO=./simple-message.proto

docker run -p 50051:50051 --env PROTO=./simple-message.proto -it grpc npm run start-grpc
docker run -p 3000:3000 -it grpc npm run start-http


export MESSAGE=./simple-short.json
export HOST=192.168.99.100
./bulk-grpc.sh
./bulk-http.sh


# SSL keys generation
```bash
# Create private key
openssl genrsa -des3 -out server.key 4096
openssl pkey -in server.key -text # Show contents

# Extract public key
openssl rsa -in server.key -pubout > server.pub
openssl pkey -in server.pub -pubin -text # Show contents

# Create Certificate Signing Request
openssl req -new -key server.key -out server.csr

# Self sign certificate with our own private key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
openssl x509 -in server.crt -text # Show contents

# Decrypt (des3) the private key in order to be used to decrypt ssl messages
openssl rsa -in server.key -out server.key
```