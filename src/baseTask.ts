abstract class BaseTask {
    abstract condition(inputData: any): boolean;

    abstract execute(inputData: any): Promise<any>;
}

export default BaseTask;
