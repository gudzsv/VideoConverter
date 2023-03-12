import { IStreamLogger } from "../../core/hendlers/stream-logger.interfce";

export class ConsoleLogger implements IStreamLogger {

    private static logger: ConsoleLogger;
    public static getInstance() {
        if(!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger();
        }
        return ConsoleLogger.logger;
    }

    log(...args: any[]): void {
        console.log(`ConsoleLogger save Log: ${args}`);
    }
    error(...args: any[]): void {
        console.error(`ConsoleLogger save Error: ${args}`)
    }
    end(): void {
        console.log(`ConsoleLogger end`);
    }

}