``` 
docker buildx build --platform linux/amd64 -t semwai/front:0.7.0-amd64 .
docker build -t semwai/front:0.7.0-arm64 .  
docker push semwai/front:0.7.0-arm64
docker push semwai/front:0.7.0-amd64
docker run -d -p 80:80 -e REACT_APP_GOOGLE_CLIENT_ID=<KEY> semwai/front:0.7.0-arm64
```