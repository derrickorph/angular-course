import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmptyDirective } from './ng-for-empty.directive';

interface Person {
  name: string
}


@Component({
  selector: 'app-for-directive',
  standalone: true,
  imports: [NgForEmptyDirective],
  templateUrl: './for-directive.component.html',
  styleUrl: './for-directive.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForDirectiveComponent {
  persons: Person[] = [];
}
