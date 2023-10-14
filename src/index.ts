// Import the required classes
import { Task1Class } from './tasks/task1';
import { Task2Class } from './tasks/task2';
import { TaskRunner } from './lib/taskRunner';

// Create instances of task classes
const task1 = new Task1Class();
const task2 = new Task2Class();

// Create a TaskRunner instance
const taskRunner = new TaskRunner();
taskRunner.registerTasks()

// Define your data
const inputData = { order: { status: 'active' } };

// Execute the tasks using the TaskRunner
taskRunner.exec(inputData);


