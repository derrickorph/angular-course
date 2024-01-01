import { Component, Signal, inject } from '@angular/core';
import { TaskGateway } from '../../core/ports/task.gateway';
import { BehaviorSubject, Subject, switchMap, tap, Observable, exhaustMap, filter, merge, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../core/models/task.model';
import { AddTaskFormComponent } from './components/add-task-form.component';
import { CheckListItemComponent } from './components/check-list-item.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-check-list',
  standalone: true,
  imports: [AddTaskFormComponent, CheckListItemComponent, NgForOf, NgIf],
  templateUrl: './check-list.component.html',
  styleUrl: './check-list.component.css',
})
export class CheckListComponent {
  taskGateway: TaskGateway = inject(TaskGateway);

  add$$: Subject<string> = new Subject<string>();
  toggle$$: Subject<Task> = new Subject<Task>();
  delete$$: Subject<Task> = new Subject<Task>();

  private add$: Observable<Task> = this.add$$.asObservable().pipe(
    filter(Boolean),
    exhaustMap((taskName) => this.taskGateway.add(taskName))
  );

  private toggle$: Observable<Task> = this.toggle$$
    .asObservable()
    .pipe(
      switchMap((task) =>
        task.completed
          ? this.taskGateway.markAsUncomplete(task.id)
          : this.taskGateway.markAsComplete(task.id)
      )
    );

  private delete$: Observable<void> = this.delete$$.asObservable().pipe(
    exhaustMap((task) => this.taskGateway.remove(task.id))
  );

  tasks: Signal<Task[] | undefined> = toSignal(
    merge(this.add$, this.toggle$, this.delete$).pipe(
      startWith(void 0),
      switchMap(() => this.taskGateway.retrieveAll())
    )
  );
}
