import { Observable } from "rxjs";
import { Task } from "../models/task.model";
import { TaskGateway } from "../ports/task.gateway";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "../../../environments/environment";


export class HttpTaskGateway extends TaskGateway{

    private http : HttpClient = inject(HttpClient);


    override retrieveAll(): Observable<Task[]> {
        throw new Error("Method not implemented.");
    }
    override add(taskName: string): Observable<Task> {
        return this.http.post<Task>(`${environment.apiUrl}/tasks`,{name:taskName});
    }
    override markAsComplete(taskId: number): Observable<Task> {
        throw new Error("Method not implemented.");
    }
    override markAsUncomplete(taskId: number): Observable<Task> {
        throw new Error("Method not implemented.");
    }
    override remove(taskId: number): Observable<void> {
        throw new Error("Method not implemented.");
    }
    
}