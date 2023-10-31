import TaskRegistry from "./taskRegistry";
import * as yaml from "js-yaml";
import * as fs from 'fs'
import * as path from "path";





// executor.js

class TaskFlow {
  static taskRegistry: TaskRegistry;

 
  static configure(ymlPath:string) {

    if (!this.taskRegistry) {
      this.taskRegistry = new TaskRegistry();
    }

    this.addTasksFromConfig(ymlPath);

  }


  static execute(inputData: any) {
    const matchedTask: any = this.taskRegistry.getMatchingTask(inputData);

    if (matchedTask) {
      if (typeof matchedTask === 'function') {
        // Function-based task
        return matchedTask(inputData);
      } else if (typeof matchedTask === 'object') {
        // Class-based task
        if ('execute' in matchedTask) {
          if (matchedTask.condition(inputData)) {
            return matchedTask.execute(inputData);
          }
          return null; // Condition not met, no action taken
        } else {
          console.error('Unknown task type:', matchedTask);
          return null;
        }
      }
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
      if ('conditions' in taskConfig) {
        const { function: functionName, conditions } = taskConfig;

        // If conditions are defined in the YAML, it's a function-based task
        const taskClass = this.loadTaskClass(functionName); // Load the class
        if (taskClass) {
          this.addTask(taskClass, conditions);
        }
      } else {
        // If no conditions are defined, it's a class-based task
        const { function: functionName } = taskConfig;
        const taskClass = this.loadTaskClass(functionName); // Load the class
        if (taskClass) {
          const taskInstance = new taskClass(); // Create an instance
          this.addTask(taskInstance, []); // Add the instance with empty conditions
        }
      }
    });
  }
}


private static loadTaskClass(filePath) {
    try {
        return require(`./${filePath}`).default;
    } catch (error) {
        console.error('Error loading task class:', error);
        return null;
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



  private static addTask(taskFunction, conditions) {
    this.taskRegistry.addTask(taskFunction, conditions);
  }   
}



export default TaskFlow;