// task1.ts
import { BaseTask } from '../index';

export default class MyTask extends BaseTask  {
    condition(inputData: any): boolean {
        return inputData.someCondition; // Custom condition for the class
    }

    async execute(inputData: any): Promise<any> {
        console.log('Custom task execution with data:', inputData); // Custom task execution logic
    }
}
