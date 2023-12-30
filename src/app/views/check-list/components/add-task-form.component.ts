import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule,],
  template: `
    <form (submit)="add.emit(taskInput.value); taskInput.value = ''">
      <div class="row text-center">
        <div class="col-md-8">
          <input
            #taskInput
            type="text"
            name="add_task"
            class="form-control mb-2"
            id="inlineFormInput"
            placeholder="Ex: Tourner une vidéo Angular"
          />
        </div>

        <div class="col-md-4">
          <button type="submit" class="btn btn-primary mb-2">Ajouter</button>
        </div>
      </div>
    </form>
  `,
})
export class AddTaskFormComponent {
    @Output() add  = new EventEmitter<string>();
}
