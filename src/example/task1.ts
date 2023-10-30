// task1.ts
import  {BaseTask}  from '../index';

export class MyTask extends BaseTask {

  
    condition(inputData: any): boolean {
        return inputData.someCondition; // Custom condition for the class
    }

    async execute(inputData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // Your custom task execution logic here
            console.log('Custom task execution with data:', inputData);
    
            // Resolve with the result you want to return (e.g., a result object)
            const result = {
                message: 'Task executed successfully',
                inputData,
            };
            resolve(result);
        });
    }
}    
