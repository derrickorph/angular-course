import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListComponent } from './check-list.component';
import { TaskGateway } from '../../core/ports/task.gateway';
import { InMemoryTaskGateway } from '../../core/adapters/in-memory-task.gateway';
import { Task } from '../../core/models/task.model';
import { StubTaskBuilder } from '../../core/models/builders/task.builder';

describe('CheckListComponent', () => {

  let fixture:ComponentFixture<CheckListComponent>;
  let taskGateway: InMemoryTaskGateway;

  beforeEach(() => {
    taskGateway = new InMemoryTaskGateway()
    TestBed.configureTestingModule({
      imports: [CheckListComponent],
      providers: [
        {
          provide: TaskGateway,
          useFactory: () => taskGateway,
        },
      ],
    });
  });

  it('should not have any task',()=> {
     setup([])

     expect(fixture.nativeElement.textContent).toContain('Ajoute ta première tâche 👋');
  })

  it('should have tasks',()=> {
     setup([
       new StubTaskBuilder().complete().build(),
       new StubTaskBuilder().uncomplete().build(),
     ]);
     expect(getCheckboxes().length).toBe(2);
     expect(getCheckboxes({checked:true}).length).toBe(1);
     expect(fixture.nativeElement.textContent).not.toContain('Ajoute ta première tâche 👋');

  })

  it('should add task',()=> {
     setup([])
     getElement('input[type="text"]').value = 'Tourner une vidéo Angular';
     getElement('button[type="submit"]').click();
     fixture.detectChanges();
     expect(getCheckboxes().length).toBe(1)
  })

  it('should mark task as complete', () => {
    setup([new StubTaskBuilder().uncomplete().build()]);
    jest.spyOn(taskGateway, 'markAsComplete');
    getCheckboxes()[0].click();
    // Est-ce que la tâche a été complétée? --> Appel à notre TaskGateway
    expect(getCheckboxes({ checked: true }).length).toBe(1);
  });
  
  it('should mark task as uncomplete', () => {
    setup([new StubTaskBuilder().complete().build()]);
    jest.spyOn(taskGateway, 'markAsUncomplete');
    getCheckboxes()[0].click();
    // Est-ce que la tâche a été complétée? --> Appel à notre TaskGateway
    expect(getCheckboxes({ checked: true }).length).toBe(0);
  });
  
  it('should remove task', () => {
    setup([new StubTaskBuilder().withName('Aller au sport').build()]);
    getElement(`button[aria-label="Supprimer la tâche : Aller au sport"]`).click()
    fixture.detectChanges()
    expect(getCheckboxes().length).toBe(0);
  });

  function setup(tasks: Task[]) : void {
    taskGateway.withTasks(tasks)
    fixture = TestBed.createComponent(CheckListComponent);
    fixture.detectChanges();
  }
  function getCheckboxes({checked}:{checked:boolean} = {checked:false})  {
   return fixture.nativeElement.querySelectorAll(`input[type="checkbox"]${checked?':checked':''}`);
  }

  function getElement(selector:string) {
    return fixture.nativeElement.querySelector(selector);
  }
});
