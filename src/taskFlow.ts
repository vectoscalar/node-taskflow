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
          if (typeof matchedTask === 'function') {
              const taskFunction = matchedTask as (inputData: any) => Promise<any>;
              const result = await taskFunction(inputData);
              return result;
          } else if (typeof matchedTask === 'function' || typeof matchedTask === 'object') {
              const taskInstance = typeof matchedTask === 'function' ? (new (matchedTask as { new (): any })() as any) : matchedTask;
              if (typeof taskInstance.condition === 'function') {
                  if (taskInstance.condition(inputData)) {
                      const result = await taskInstance.execute(inputData);
                      return result;
                  } else {
                      console.log('Class-based task condition not met.');
                  }
              }
          }
      } else {
          console.error('No matching task found.');
          return null;
      }
    }      

    private static async addTasksFromConfig(ymlPath: string) {
        if (__dirname.includes('node_modules')) {
            __dirname = __dirname.replace('node_modules/node-taskflow/dist', '');
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
