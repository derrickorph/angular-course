import { Component, Signal, inject } from '@angular/core';
import { TaskGateway } from '../../core/ports/task.gateway';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
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

  reload$$: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);

  tasks: Signal<Task[] | undefined> = toSignal(
    this.reload$$.pipe(switchMap(() => this.taskGateway.retrieveAll()))
  );

  addTask = (taskName: string) => {
    if (!taskName) return;
    this.taskGateway
      .add(taskName)
      .pipe(tap(() => this.reload$$.next()))
      .subscribe();
  };

  toggle = (task: Task) => {
    const toggle$ = task.completed? this.taskGateway.markAsUncomplete(task.id):this.taskGateway.markAsComplete(task.id)
    toggle$.pipe(tap(() => this.reload$$.next())).subscribe();
  };

  remove = (task: Task) => {
    this.taskGateway.remove(task.id).pipe(tap(() => this.reload$$.next())).subscribe();
  };
}
