// taskFlow.ts
import TaskRegistry from './taskRegistry';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

class TaskFlow {
    static taskRegistry: TaskRegistry;
  
    static async configure(ymlPath: string) {
      if (!this.taskRegistry) {
        this.taskRegistry = new TaskRegistry();
      }
  
      await this.addTasksFromConfig(ymlPath);
    }
  
    static async execute(inputData: any) {
      const matchedTask = this.taskRegistry.getMatchingTask(inputData);
  
      if (matchedTask) {
        // Use `await` to execute the task function
        const result = this.taskRegistry.executeTask(matchedTask, inputData); // Using the updated TaskRegistry that help us to optimize the execution of class-based tasks and reduce unnecessary instantiations.


        // Handle the result if needed
        return result;
      } else {
        console.error('No matching task found.');
        return null;
      }
    }
  
    private static async addTasksFromConfig(ymlPath: string) {
      // To support running from node_modules
      if (__dirname.includes("node_modules")) {
        __dirname = __dirname.replace("node_modules/node-taskflow/dist", "");
      }
  
        const configPath = path.join(__dirname, ymlPath);
        const config = this.loadConfig(configPath);

        if (config && config.tasks) {
            await Promise.all(
                config.tasks.map(async (taskConfig) => {
                    const { function: functionName, conditions } = taskConfig;
                    const taskFunction = await this.loadTaskFunction(functionName);
                    if (taskFunction) {
                        this.addTask(taskFunction.default || taskFunction, conditions);
                    }
                })
            );
        }
    }

    private static loadConfig(configPath) {
        try {
            const configFile = fs.readFileSync(configPath, 'utf8');
            return yaml.load(configFile);
        } catch (error) {
            console.error('Error loading configuration:', error);
            return null;
        }
    }

    private static async loadTaskFunction(functionName) {
        try {
            if (__dirname.includes('node_modules')) {
                __dirname = __dirname.replace('node_modules/node-taskflow/dist', '');
            }
            return (await import(`${__dirname}/${functionName}`)).default;
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
