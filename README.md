``` 
docker buildx build --platform linux/amd64 -t semwai/front:0.5.0-amd64 --push .
docker build -t front .       
docker run --rm -it -p 80:80 front
```