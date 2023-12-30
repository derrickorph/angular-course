import { UsersGateway } from '../../core/ports/users.gateway';
import { Component, Signal, computed, inject, signal } from '@angular/core';
import { User } from '../../core/models/user.model';
import { CommonModule } from '@angular/common';
import {debounceTime, switchMap } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {toObservable, toSignal  } from "@angular/core/rxjs-interop";
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  usersGateway: UsersGateway = inject(UsersGateway);

  name = signal('');
  username = signal('');
  email = signal('');
  available = signal(false);

  search = computed(() => ({
    name: this.name(),
    username: this.username(),
    email: this.email(),
    availableOnly: this.available(),
  }));

  users: Signal<User[]|undefined> = toSignal(
    toObservable(this.search).pipe(
      debounceTime(200),
      switchMap((search) => this.usersGateway.fetchUsers(search))
    )
  );
}
