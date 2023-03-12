"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    static getInstance() {
        if (!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger();
        }
        return ConsoleLogger.logger;
    }
    log(...args) {
        console.log(`ConsoleLogger save Log: ${args}`);
    }
    error(...args) {
        console.error(`ConsoleLogger save Error: ${args}`);
    }
    end() {
        console.log(`ConsoleLogger end`);
    }
}
exports.ConsoleLogger = ConsoleLogger;
