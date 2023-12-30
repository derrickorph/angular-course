import { NgClass, NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-check-list-item',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="card-text">
      <div class="form-check ">
        <input
          class="form-check-input"
          type="checkbox"
          [checked]="task.completed"
          (change)="toggle.emit(task)"
          [id]="'tastk' + task.id"
        />
        <label class="form-check-label" [for]="'tastk' + task.id">
          <span [ngClass]="{ completed: task.completed }">{{ task.name }}</span>
        </label>
        <button
          class="text-danger btn btn-sm "
          [attr.aria-label]="'Supprimer la tâche : ' + task.name"
          (click)="remove.emit(task)"
        >
          <i class="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      span.completed {
        text-decoration: line-through;
        color: slategrey;
      }
    `,
  ],
})
export class CheckListItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() toggle: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() remove: EventEmitter<Task> = new EventEmitter<Task>();
}
