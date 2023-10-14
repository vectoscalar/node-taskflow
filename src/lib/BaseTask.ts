//BaseClass for our tasks

export class BaseTask {
  precondition(data: any): boolean {
    console.log('Running precondition logic');
    return true; // Implement your precondition logic
  }

  run(data: any): void {
    console.log('Running task logic with data:', data);
    // Implement your task logic
  }
  // Maintain a list of registered task classes
  private static registeredTasks: Array<new () => BaseTask> = [];

  static registerTask(task: new () => BaseTask) {
    this.registeredTasks.push(task);
  }

  static getRegisteredTasks() {
    return this.registeredTasks;
  }
}

export function TaskDecorator<T extends new (...args: any[]) => BaseTask>(target: T) {
  // Extend the target class with BaseTask methods
  class TaskWithBase extends target {
    constructor(...args: any[]) {
      super(...args);
      // Register the task when it is created
      BaseTask.registerTask(target);
      console.log(`Task registered: ${target.name}`);

    }
    // We can override or extend BaseTask methods here if needed
  }

  // Return the extended class
  return TaskWithBase;
}

