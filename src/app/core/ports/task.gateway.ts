import { Observable } from "rxjs";
import { Task } from "../models/task.model";

export abstract class TaskGateway {
  abstract retrieveAll(): Observable<Task[]>;
  abstract add(taskName: string): Observable<Task>;
  abstract markAsComplete(taskId: number): Observable<Task>;
  abstract markAsUncomplete(taskId: number): Observable<Task>;
  abstract remove(taskId: number): Observable<void>;
}