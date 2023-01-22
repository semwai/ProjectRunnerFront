```touch .env```
```env
REACT_APP_GOOGLE_CLIENT_ID=123
REACT_APP_BACKEND_HOST=http://localhost:8000
REACT_APP_WEBSOCKET_HOST=ws://localhost:8000
```
`https://` & `wss://` for secure
``` 
docker buildx build --platform linux/amd64 -t semwai/front:0.8.2-amd64 .
docker build -t semwai/front:0.8.2-arm64 .  
docker push semwai/front:0.8.2-arm64
docker push semwai/front:0.8.2-amd64
docker run -d -p 80:80 semwai/front:0.8.2-arm64
docker run -d -p 80:80 semwai/front:0.8.2-amd64
```