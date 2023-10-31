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
