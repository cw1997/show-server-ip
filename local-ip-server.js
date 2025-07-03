// filename: local-ip-server.js
// 直接 `node local-ip-server.js` 运行

const http = require('http');
const os = require('os');

const PORT = 3000;          // 想换端口可自行修改
const HOST = '0.0.0.0';     // 监听所有网卡

/**
 * 获取当前机器的所有外部 IPv4 地址
 * @returns {string[]} 例如 ['192.168.1.10', '10.0.0.5']
 */
function getLocalIPv4() {
  const nets = os.networkInterfaces();
  const addresses = [];

  for (const iface of Object.values(nets)) {
    if (!iface) continue;
    for (const addr of iface) {
      if (addr.family === 'IPv4' && !addr.internal) {
        addresses.push(addr.address);
      }
    }
  }

  return addresses;
}

const server = http.createServer((req, res) => {
  // 可根据需要加上路由判断；这里对任意路径都返回 IP
  const ips = getLocalIPv4();
  const body = JSON.stringify({ ip: ips });

  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
});
