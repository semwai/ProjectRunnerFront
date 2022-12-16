``` 
docker buildx build --platform linux/amd64 -t semwai/front:0.6.2-amd64 .
docker build -t semwai/front:0.6.2-arm64 .  
docker push semwai/front:0.6.2-arm64
docker push semwai/front:0.6.2-amd64
docker run -d -p 80:80 semwai/front:0.6.2-arm64
```