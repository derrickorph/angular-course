import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IfAuthenticatedDirective } from '../../../core/directives/if-authenticated.directive';
import { IfAdminDirective } from '../../../core/directives/if-admin.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,IfAuthenticatedDirective, IfAdminDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
