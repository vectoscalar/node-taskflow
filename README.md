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
```

Define your task conditions in a yml file:

```yaml
  # test.yml in root directory
  settings:
    - logLevel: info
  tasks:
    - name: Task1
      function: 'test.js'
      conditions:
      - type: 'gt'
        property: 'dataValue'
        threshold: 150

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
1. Add condition evaluation type (AND/OR) in tasks yml. our conditions are array [low priority]
2. Add Zod (https://github.com/colinhacks/zod) for validation of yml.
3. Support class as task as well. (should must subclass the baseTask) [low priority]
4. curently only default exported function is supported. pick function from the name field in yml. check process of registraton. 
5. Add proper logs
6. Add functionality of nextTask [low priority]
7. Add functionality of taskType (task, wait etc.) default type will be task [low priority]
8. Add description property with task 
