import { AuthenticationGateway } from './../gateways/authentication.gateway';
import { Directive, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Directive({
  selector: '[ifAuthenticated]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgIf,
    },
  ],
})
export class IfAuthenticatedDirective implements OnInit {
  private authenticationGateway = inject(AuthenticationGateway);
  private ngIfDirective = inject(NgIf);
  ngOnInit() {
    this.ngIfDirective.ngIf = this.authenticationGateway.isAuthenticated;
  }
}
