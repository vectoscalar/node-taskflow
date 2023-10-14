// src/tasks/Task2.ts
import { TaskDecorator } from '../lib/BaseTask';

@TaskDecorator
export class Task2Class {
    precondition(data: any): boolean {
        return data.order.status !== 'active';
    }

    run(data: any): void {
        if (data.order.status !== 'active') {
            console.log('Task2 is running');
        }
    }
}
