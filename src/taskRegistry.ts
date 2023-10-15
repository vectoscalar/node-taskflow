class TaskRegistry {
    constructor() {
      this.tasks = [];
    }
  
    addTask(taskFunction, conditions) {
      this.tasks.push({ taskFunction, conditions });
    }
  
    getMatchingTask(inputData) {
      return this.tasks.find(({ conditions }) => this.evaluateConditions(conditions, inputData))?.taskFunction || null;
    }
  
    evaluateConditions(conditions, inputData) {
      return conditions.every(({ property, operator, threshold }) => {
        const value = inputData[property];
  
        switch (operator) {
          case '>':
            return value > threshold;
          case '<':
            return value < threshold;
          case '=':
            return value === threshold;
          default:
            return false;
        }
      });
    }
  }
  

  export default TaskRegistry;