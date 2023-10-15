import TaskFlow from "../taskFlow";



TaskFlow.configure('./test/tasks-config.yml')



const inputData = {dataValue: 100};
TaskFlow.execute(inputData);