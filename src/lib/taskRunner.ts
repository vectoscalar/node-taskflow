// TaskRunner.ts

import { BaseTask } from './BaseTask';

export class TaskRunner {
  private tasks: BaseTask[] = [];

  registerTasks() {
    const registeredTasks = BaseTask.getRegisteredTasks();
    console.log('Registered tasks:', registeredTasks);

    this.tasks = registeredTasks.map((TaskClass) => new TaskClass());
  }

  exec(data: any) {
    const results = [];

    for (const task of this.tasks) {
      if (task.precondition(data)) {
        console.log(`Executing task: ${task.constructor.name}`);
        results.push(task.run(data));
      }
    }

    return results;
  }
}
