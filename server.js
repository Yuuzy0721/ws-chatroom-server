import { WebSocketServer } from 'ws';
import { logger } from './logger.js';
import { config } from './config.js';

function start() {
    const wss = new WebSocketServer({ host: config.host, port: config.port }, () => {
        logger.info(`ws服务器启动，监听 ws://${config.host}:${config.port}`);
    });

    // 监听连接事件
    wss.on('connection', (ws) => {
        logger.debug('Client connected');

        // 广播各种消息
        ws.on('message', (message) => {
            message = JSON.parse(message);
            logger.debug('Received: ' + JSON.stringify(message));
            // 加入聊天
            if (message.type === 'connected') {
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify({ type: 'message-text', data: { userName: "Server", message: `${message.data.userName} 加入了聊天` } }), (err) => {
                        if (err) logger.error(err);
                    });
                });
            }

            // 发送消息
            if (message.type === 'message-text') {
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify({ type: 'message-text', data: { userName: message.data.userName, message: message.data.message } }), (err) => {
                        if (err) logger.error(err);
                    });
                });
            }
            if (message.type === 'message-img') {
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify({ type: 'message-img', data: { userName: message.data.userName, image: message.data.image } }), (err) => {
                        if (err) logger.error(err);
                    });
                });
            }

            // 离开聊天
            if (message.type === 'disconnected') {
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify({ type: 'message-text', data: { message: `${message.data.userName} 离开了聊天` } }), (err) => {
                        if (err) logger.error(err);
                    });
                });
            }
        });
    });

    return wss;
}

export { start };
