import inquirer from "inquirer";
import { PromptType } from "./prompt.type";

export class PromptService {
    public async input<T>(message: string, type: PromptType){
        const { result } = await inquirer.prompt<{ result: T }>([
            {
                type,
                name: 'result', //to which variable will be return result of prompt
                message //message that will be displayed
            }
        ]);
        return result;
    }
}

