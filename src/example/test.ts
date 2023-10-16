import TaskFlow from "../taskFlow";



TaskFlow.configure('./example/tasks-config.yml')




const inputData = {dataValue: 200};
TaskFlow.execute(inputData);