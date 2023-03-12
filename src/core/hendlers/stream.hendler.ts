import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamLogger } from "./stream-logger.interfce";

export class StreamHandler {
    constructor(private logger: IStreamLogger){}

    processOutput(stream: ChildProcessWithoutNullStreams){
        //subscribe to stream
        stream.stdout.on('data', (data: any) => {
            this.logger.log(data.toString());
        })
        stream.stderr.on('data', (data: any) => {
            this.logger.log(data.toString());
        })
        stream.on('close', () => {
            this.logger.end();
        })

    }
}