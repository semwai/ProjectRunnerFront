``` 
docker buildx build --platform linux/amd64 -t semwai/front:0.6.0-amd64 .
docker build -t semwai/front:0.6.0-arm64 .  
docker push semwai/front:0.6.0-arm64
docker push semwai/front:0.6.0-amd64
docker run --rm -it -p 80:80 semwai/front:0.6.0-arm64
```