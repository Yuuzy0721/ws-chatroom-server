import * as server from './server.js';
import { logger } from './logger.js';

const wss = server.start();

process.on('SIGINT', () => {
  wss.close(() => {
    logger.info('ws服务器已关闭');
    setTimeout(() => process.exit(0), 100);
  });
});

process.on('uncaughtException', (err) => {
  logger.error('未捕获异常: ' + err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('未处理的Promise拒绝: ' + reason);
  process.exit(1);
});
