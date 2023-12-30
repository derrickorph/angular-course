import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IfAuthenticatedDirective } from '../../../shared/directives/if-authenticated.directive';
import { IfAdminDirective } from '../../../shared/directives/if-admin.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,IfAuthenticatedDirective, IfAdminDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
