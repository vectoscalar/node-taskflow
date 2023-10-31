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
      } else if (typeof matchedTask === 'object' && 'execute' in matchedTask) {
        return matchedTask.execute(inputData);
      } else {
        console.error('Unknown task type:', matchedTask);
        return null;
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
            const { function: functionName, conditions } = taskConfig;
            const taskClass = this.loadTaskClass(functionName); // Load the class
            if (taskClass) {
                const taskInstance = new taskClass(); // Create an instance
                this.addTask(taskInstance, conditions); // Add the instance
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