import TaskRegistry from './taskRegistry';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

// executor.js

class TaskFlow {
  static taskRegistry: TaskRegistry;

  static configure(ymlPath: string) {
    if (!this.taskRegistry) {
      this.taskRegistry = new TaskRegistry();
    }

    this.addTasksFromConfig(ymlPath);
  }

  static async execute(inputData: any) {
    const matchedTask = this.taskRegistry.getMatchingTask(inputData);

    if (matchedTask) {
      // Use `await` to execute the task function
      const result = await matchedTask(inputData);
      // Handle the result if needed
      return result;
    } else {
      console.error('No matching task found.');
      return null;
    }
  }

  private static addTasksFromConfig(ymlPath: string) {
    const configPath = path.join(__dirname, ymlPath);
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

  private static loadConfig(configPath) {
    try {
      const configFile = fs.readFileSync(configPath, 'utf8');
      //console.log('Loaded configuration:', configFile, yaml);
      return yaml.load(configFile);
    } catch (error) {
      console.error('Error loading configuration:', error);
      return null;
    }
  }

  private static loadTaskFunction(functionName) {
    try {
      return require(`./${functionName}`).default;
    } catch (error) {
      console.error('Error loading task function:', error);
      return null;
    }
  }

  private static addTask(taskFunction, conditions) {
    this.taskRegistry.addTask(taskFunction, conditions);
  }
}

export default TaskFlow;
