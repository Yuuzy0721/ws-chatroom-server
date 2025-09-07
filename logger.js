import { config } from './config.js';

function info(message) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log(`[INFO]${year}/${month}/${date}-${hours}:${minutes}:${seconds}: ${message}`);
}

function warn(message) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log(`[WARN]${year}/${month}/${date}-${hours}:${minutes}:${seconds}: ${message}`);
}

function debug(message) {
    if (config.mode !== 'debug') return;
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log(`[DEBUG]${year}/${month}/${date}-${hours}:${minutes}:${seconds}: ${message}`);
}

function error(message) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log(`[ERROR]${year}/${month}/${date}-${hours}:${minutes}:${seconds}: ${message}`);
}

export const logger = { info, warn, debug, error };
