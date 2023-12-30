import { TaskGateway } from '../ports/task.gateway';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

export class LocalStorageTaskGateway extends TaskGateway {
  add(taskName: string): Observable<Task> {
    const tasks = this.getTasks();
    const newTask = { id: tasks.length + 1, name: taskName, completed: false };
    this.writeTasks([...tasks, newTask]);
    return of(newTask);
  }

  markAsComplete(taskId: number): Observable<Task> {
    // { ...task, completed: true }
    const updatedTask = this.getTasks().find((task) => task.id === taskId)!;
    updatedTask.completed = true;
    const tasks = this.getTasks().map((task) =>
      task.id === taskId ? updatedTask : task
    );
    this.writeTasks(tasks);
    return of(updatedTask);
  }

  markAsUncomplete(taskId: number): Observable<Task> {
    const updatedTask = this.getTasks().find((task) => task.id === taskId)!;
    updatedTask.completed = false;
    const tasks = this.getTasks().map((task) =>
      task.id === taskId ? updatedTask : task
    );
    
    this.writeTasks(tasks);
    return of(updatedTask);
  }

  remove(taskId: number): Observable<void> {
    const tasks = this.getTasks().filter((task) => task.id !== taskId);
    this.writeTasks(tasks);
    return of(void 0);
  }

  retrieveAll(): Observable<Task[]> {
    return of(this.getTasks());
  }

  private getTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
