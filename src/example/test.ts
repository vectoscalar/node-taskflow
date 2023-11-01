
import { TaskFlow } from '../index';

TaskFlow.configure('./example/tasks-config.yml');

const inputData = 'This is an Order message.';
TaskFlow.execute(inputData);


