import customConditions from './customConditions';

interface Task {
  taskFunction: Function 
  conditions: Condition[];
}


interface Condition {
  type: string;
  property: string;
  threshold: number;
  additionalParam?: any; // Make it optional to support custom conditions with additional parameters
}


class TaskRegistry {
  tasks: Task[];
  taskInstanceCache: Map<string, any> = new Map(); // Cache for class-based task instances

  constructor() {
    this.tasks = [];
  }

  addTask(taskFunction, conditions) {
    this.tasks.push({ taskFunction, conditions });
  }

  getMatchingTask(inputData) {
    return (
      this.tasks.find(({ conditions }) =>
        this.evaluateConditions(conditions, inputData)
      )?.taskFunction || null
    );
  }

  // Function to get or create a cached instance of a class-based task
  getTaskInstance(taskFunction) {
    const taskName = taskFunction.name;
    if (this.taskInstanceCache.has(taskName)) {
      return this.taskInstanceCache.get(taskName);
    } else {
      const instance = new taskFunction();
      this.taskInstanceCache.set(taskName, instance);
      return instance;
    }
  }

  executeTask(taskFunction, inputData) {
    if (typeof taskFunction === 'function') {
      console.log(taskFunction)
      // Handle function-based tasks
      return taskFunction(inputData);
    } else if (typeof taskFunction === 'object') {
      // Handle class-based tasks
      const taskInstance = this.getTaskInstance(taskFunction.constructor);
      if (typeof taskInstance.condition === 'function') {
        if (taskInstance.condition(inputData)) {
          return taskInstance.execute(inputData);
        } else {
          console.log('Class-based task condition not met.');
        }
      }
    }
    return null;
  }

  evaluateConditions(conditions, inputData) {
    return conditions.every(({ type, property, additionalParam }) => {
      const customCondition = customConditions[type];
      if (customCondition) {
        const args = [inputData[property]];
        if (additionalParam !== undefined) {
          args.push(additionalParam);
        }
        console.log(customCondition(...args))
        return customCondition(...args);
      } else {
        console.error(`Unknown condition: ${type}`);
        return false;
      }
    });
  }
  
}

export default TaskRegistry;
