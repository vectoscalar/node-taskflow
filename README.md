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
    // task1.js
    export default function Task1(data) {  
    console.log('Executing Task1 with data:', data);  
    }
```

Define your task conditions in a yml file:

```yaml
  # tasks-config.yml
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
1. Add prettier
2. Add types whereever possible
3. Add condition evaluation type (AND/OR) in tasks yml. our conditions are array [low priority]
4. Add Zod (https://github.com/colinhacks/zod) for validation of yml.
5. Support class as task as well. (should must subclass the baseTask) [low priority]
6. curently only default exported function is supported. pick function from the name field in yml. check process of registraton. 
7. Add proper logs
8. Add functionality of nextTask [low priority]
9. Add functionality of taskType (task, wait etc.) default type will be task [low priority]
10. Add description proproty with task 
11. ehance the confition - property. Properties can be a path n object. like (data.item[0].name) [high priority]
12. Add async to execute function to support asynchronous job {topmost priority}