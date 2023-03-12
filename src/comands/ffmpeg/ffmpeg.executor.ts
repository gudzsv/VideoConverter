import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { FileService } from "../../core/files/file.service";
import { IStreamLogger } from "../../core/hendlers/stream-logger.interfce";
import { StreamHandler } from "../../core/hendlers/stream.hendler";
import { PromptService } from "../../core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { ICommandExecFfmpeg, IFfmpegInput } from "./ffmpeg.types";

export class FfmpegExecutor extends CommandExecutor <IFfmpegInput>{

    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger)
    }
    
    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>(`Could you please enter video format - 'Width':`, 'number');
        const height = await this.promptService.input<number>(`Could you please enter video format - 'Height':`, 'number');
        const path = await this.promptService.input<string>(`Could you please enter 'Path' to video:`, 'input');
        const fileName = await this.promptService.input<string>(`Could you please enter video 'File Name':`, 'input');
        return {width, height, path, fileName}
    }
    protected build({width, height, path, fileName}: IFfmpegInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(path, fileName, 'mp4')
        const args = (new FfmpegBuilder)
            .input(path)
            .setVideoSize(width, height)
            .output(output)
        return {command: 'ffmpeg', args, output}
    }
    protected spawn({output, command, args}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
       this.fileService.deleteFileIfExists(output);
       return spawn(command, args)
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger)
        handler.processOutput(stream)
    }

}