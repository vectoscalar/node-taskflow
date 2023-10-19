// test.ts
import { TaskFlow } from '../index';

// Configure the TaskFlow and execute tasks
TaskFlow.configure('./example/tasks-config.yml').then(() => {
    const inputData = { dataValue: 190 };
    TaskFlow.execute(inputData);
    console.log(inputData)
});
