// BaseTask.ts
class BaseTask {
    condition(inputData: any): boolean {
        return true; // Default condition, always return true
    }

    async execute(inputData: any): Promise<any> {
        console.log('Base task execution with data:', inputData);
    }
}

export default BaseTask;
