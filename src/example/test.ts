import {TaskFlow} from "../index";



TaskFlow.configure('./example/tasks-config.yml').then(() => {
    const inputData = {dataValue: 190};
    TaskFlow.execute(inputData);    
});





