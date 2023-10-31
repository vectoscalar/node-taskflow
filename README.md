# node-taskflow

A simple task flow execution framework based on conditions.

## Installation

```bash
  npm i node-taskflow
```

## Usage
Define your task function in separate files.
For example, create a file named task1.js:
```javascript
    // test.js in root directory
  export default function Task1(data) {  
    console.log('Executing Task1 with data:', data);  
  }
  // or extend base class to create task
import  {BaseTask}  from '../index';

export class MyTask extends BaseTask {
    condition(inputData: any): boolean {
        return inputData.someCondition; // Custom condition for the class
    }

    async execute(inputData: any): Promise<any> {
        console.log('Custom task execution with data:', inputData); // Custom task execution logic
    }
}


```

Define your task conditions in a yml file for function based task and for class based task we can define in class function only no need to define in yaml:

```yaml
  # test.yml in root directory for function based
  settings:
    - logLevel: info
  tasks:
    - name: Task1
      function: 'test.js'
      conditions:
      - type: 'gt'
        property: 'dataValue'
        threshold: 150
  
    # test.yml in root directory for class based
  settings:
    - logLevel: info
  tasks:
    - name: Task1
      function: 'test.js'

```
Run the executor:

```bash
  // test.ts
  import { TaskFlow } from "node-taskflow";

  TaskFlow.configure('./test.yml').then(() => {
    const inputData = {dataValue: 300};
    TaskFlow.execute(inputData);    
  });

   // or 

  await TaskFlow.configure('./test.yml')
    
  const inputData = {dataValue: 300};
  TaskFlow.execute(inputData);    
  
```

The executor will read the configuration from tasks-config.yml, execute the matching task based on conditions, and log the result.


### Development

1. **Clone this repository:**
   ``` bash
   git clone https://github.com/vectoscalar/node-taskflow
   cd node-taskflow
   ```
2. **Install dependencies:**
    ``` bash
    npm install
    ```
3. **test:**
    ``` bash
    npm run test
    ```


***Pending***
1. Add Zod (https://github.com/colinhacks/zod) for validation of yml.
2. curently only default exported function is supported. pick function from the name field in yml. check process of registraton. 
3. Add proper logs
4. Add functionality of nextTask [low priority]
5. Add functionality of taskType (task, wait etc.) default type will be task [low priority]
6. Add description property with task 
