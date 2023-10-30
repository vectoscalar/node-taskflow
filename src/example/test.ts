import { TaskFlow } from '../index';

// Configure the TaskFlow and execute tasks
TaskFlow.configure('./example/tasks-config.yml').then(() => {
    const inputData = { dataValue: "This is an Order message." }; // Update input data
    const result = TaskFlow.execute(inputData);
    console.log(result)
    console.log(inputData);
});
