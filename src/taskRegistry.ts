import customConditions from "./customConditions";

interface Task {
  taskFunction: Function;
  conditions: ((inputData: any) => boolean)[];
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
        this.evaluateConditions(conditions, inputData)
      )?.taskFunction || null
    );
  }

  evaluateConditions(conditions, inputData) {
    return conditions.every(({ conditionName, property, threshold }) => {
      const customCondition = customConditions[conditionName];

      if (customCondition) {
        const value = inputData[property];
        return customCondition(value, threshold);
      } else {
        console.error(`Unknown condition: ${conditionName}`);
        return false;
      }
    });
  }
}

export default TaskRegistry;
