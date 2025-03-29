/* eslint-disable no-process-env */
import { TransformableInfo } from 'logform';
import winston from 'winston';

import { getContextId } from '../middlewares/context.middleware';

const IS_KUBERNETES = Boolean(process.env['KUBERNETES_SERVICE_HOST']);

const { combine, timestamp: winstonTimestamp, colorize, printf, json } = winston.format;
const addContext = winston.format((info: TransformableInfo) => ({ ...info, contextId: getContextId() }));

// 🎯 Formats
const fileFormat = combine(winstonTimestamp(), addContext(), json());
const consoleFormat = combine(
  winstonTimestamp(),
  addContext(),
  printf((info: TransformableInfo) => {
    const { level, message, timestamp, ...metadata } = info;
    const grey = '\x1b[90m';
    const reset = '\x1b[0m';

    const timeFormatted = (timestamp as string).split('.')[0].split('T')[1] + 'Z';
    const levelFormatted = level.toUpperCase().padEnd(8);
    const messageFormatted = message as string;
    const metadataFormatted = Object.keys(metadata).length ? `${grey}${JSON.stringify(metadata)}${reset}` : '';

    const formattedMessage = `[${timeFormatted}] ${levelFormatted} ${messageFormatted} ${metadataFormatted}`.trim();
    return formattedMessage;
  }),
  colorize({ all: true })
);

// 🚀 Transport Configurations
const kubernetesConsoleTransport = new winston.transports.Console({ format: fileFormat, level: 'debug' });
const developmentConsoleTransport = new winston.transports.Console({ format: consoleFormat, level: 'debug' });

const transports = IS_KUBERNETES ? [kubernetesConsoleTransport] : [developmentConsoleTransport];

export const winstonLoggerOptions: winston.LoggerOptions = { transports };
