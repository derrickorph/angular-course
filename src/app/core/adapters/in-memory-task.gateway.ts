import { Observable, of } from "rxjs";
import { Task } from "../models/task.model";
import { TaskGateway } from "../ports/task.gateway";

export class InMemoryTaskGateway extends TaskGateway {
  private tasks: Task[] = [];

  withTasks = (tasks: Task[]): InMemoryTaskGateway => {
    this.tasks = tasks;
    return this;
  };

  retrieveAll = (): Observable<Task[]> => {
    return of(this.tasks);
  };

  add = (taskName: string): Observable<Task> => {
    const task = {
      id: this.tasks.length + 1,
      name: taskName,
      completed: false,
    };
    this.tasks = [...this.tasks, task];
    return of(task);
  };

  markAsComplete = (taskId: number): Observable<Task> => {
    const task: Task = this.tasks.find((task) => task.id === taskId)!;
    task.completed = true;
    return of(task);
  };

  markAsUncomplete = (taskId: number): Observable<Task> => {
    const task: Task = this.tasks.find((task) => task.id === taskId)!;
    task.completed = false;
    return of(task);
  };

  remove = (taskId: number): Observable<void> => {
    this.tasks = this.tasks.filter((task) => task.id !== taskId)!;
    return of(void 0);
  };
}