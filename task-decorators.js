// task-decorators.js
const Task = (functionName) => (target, key, descriptor) => {
  if (!target.tasks) {
    target.tasks = [];
  }

  target.tasks.push({
    function: functionName,
    conditions: target[key].conditions || [],
  });

  return descriptor;
};

module.exports = { Task };