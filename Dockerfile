# ---- Dockerfile ----
# 选用体积小的官方 Node 运行时镜像
FROM node:20-alpine

# 建议把时区调到 Asia/Taipei（可选）
ENV TZ=Asia/Taipei

# 建一个工作目录
WORKDIR /usr/src/app

# 只需复制脚本；没有依赖包就不必 package.json
COPY local-ip-server.js .

# 脚本里默认监听 3000 端口；如你改了脚本里的 PORT，也记得一起改这里
EXPOSE 3000

# 容器启动时执行
CMD ["node", "local-ip-server.js"]
