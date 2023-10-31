import { TaskFlow } from '../index';





TaskFlow.configure('./example/tasks-config.yml')



const inputData = {dataValue: 200};
TaskFlow.execute(inputData);