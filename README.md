# show-server-ip

## Run with Docker in local
```bash
sudo docker build --no-cache -t show-server-ip:latest . \
  && sudo docker container prune -f \
  && sudo docker run --name show-server-ip -p3000:3000 show-server-ip:latest
```
