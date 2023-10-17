import customConditions from './customConditions';

interface Task {
  taskFunction: Function;
  conditions: Condition[];
}

interface Condition {
  type: string;
  property: string;
  threshold: number;
}

class TaskRegistry {
  tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  addTask(taskFunction, conditions) {
    this.tasks.push({ taskFunction, conditions });
  }

  getMatchingTask(inputData) {
    return (
      this.tasks.find(({ conditions }) =>
        this.evaluateConditions(conditions, inputData),
      )?.taskFunction || null
    );
  }

  evaluateConditions(conditions, inputData) {
    return conditions.every(({ type, property, threshold }) => {
      const customCondition = customConditions[type];

      if (customCondition) {
        const value = inputData[property];
        return customCondition(value, threshold);
      } else {
        console.error(`Unknown condition: ${type}`);
        return false;
      }
    });
  }
}

export default TaskRegistry;
