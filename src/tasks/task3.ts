// src/tasks/Task3.ts
import { TaskDecorator } from '../lib/BaseTask';

@TaskDecorator
export class Task3Class {
    precondition(data: any): boolean {
        return data.order.status === 'inactive';
    }

    run(data: any): void {
        console.log('Task3 is running');
    }
}
