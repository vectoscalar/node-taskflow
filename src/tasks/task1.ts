// src/tasks/Task1.ts
import { TaskDecorator } from '../lib/BaseTask';

@TaskDecorator
export class Task1Class {
  precondition(data: any): boolean {
    return data.order.status === 'active';
  }

  run(data: any): void {
    if (data.order.status === 'active') {
      console.log('Task1 is running');
    }
  }
}

