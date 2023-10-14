// task1.js
const { Task } = require('./task-decorators');

@Task('task1')
export class Task1 {
  conditions = [
    (data) => data.dataValue > 0,
  ];

  execute(data) {
    console.log('Executing Task1 with data:', data);
  }
  
}

module.exports = execute;