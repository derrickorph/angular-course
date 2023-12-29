import { Directive, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { IdentityGateway } from '../gateways/identity.gateway';
import { AuthenticationGateway } from '../gateways/authentication.gateway';

@Directive({
  selector: '[ifAdmin]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgIf,
    },
  ],
})
export class IfAdminDirective implements OnInit {
  private identityGateway = inject(IdentityGateway);
  private authenticationGateway = inject(AuthenticationGateway);
  private ngIfDirective = inject(NgIf);

  ngOnInit() {
    this.ngIfDirective.ngIf =
      this.authenticationGateway.isAuthenticated &&
      this.identityGateway.isAdmin();
  }
}
