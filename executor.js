// executor.js
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

class Executor {
  constructor() {
    this.taskRegistry = new TaskRegistry();
    this.addTasksFromConfig();
  }

  static getInstance() {
    if (!Executor.instance) {
      Executor.instance = new Executor();
    }
    return Executor.instance;
  }

  addTasksFromConfig() {
    const configPath = path.join(__dirname, 'tasks-config.yml');
    const config = this.loadConfig(configPath);

    if (config && config.tasks) {
      config.tasks.forEach((taskConfig) => {
        const { function: functionName, conditions } = taskConfig;
        const taskFunction = this.loadTaskFunction(functionName);
        if (taskFunction) {
          this.addTask(taskFunction, conditions);
        }
      });
    }
  }

  loadConfig(configPath) {
    try {
      const configFile = fs.readFileSync(configPath, 'utf8');
      return yaml.load(configFile);
    } catch (error) {
      console.error('Error loading configuration:', error);
      return null;
    }
  }

  loadTaskFunction(functionName) {
    try {
      return require(`./${functionName}`);
    } catch (error) {
      console.error('Error loading task function:', error);
      return null;
    }
  }

  addTask(taskFunction, conditions) {
    this.taskRegistry.addTask(taskFunction, conditions);
  }

  execute(inputData) {
    const matchedTask = this.taskRegistry.getMatchingTask(inputData);

    if (matchedTask) {
        console.log('Executing task:', matchedTask.name);
      return matchedTask(inputData);
    } else {
      console.error('No matching task found.');
      return null;
    }
  }
}

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


module.exports = Executor;