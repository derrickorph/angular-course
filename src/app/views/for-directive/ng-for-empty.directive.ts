import { NgFor } from "@angular/common";
import { Directive, Input, TemplateRef, ViewContainerRef, computed, effect, inject, signal } from "@angular/core";

@Directive({
  selector: '[ngFor]',
  standalone: true,
  hostDirectives: [
    { directive: NgFor, inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'] },
  ],
})
export class NgForEmptyDirective<T> {
  private viewContainerRef = inject(ViewContainerRef);

  items = signal([] as T[]);
  emptyTemplateRef = signal<TemplateRef<unknown> | null>(null);
  shouldDisplayTemplate = computed(
    () => this.emptyTemplateRef() && !this.items().length
  );

  @Input() set ngForOf(items: T[]) {
    this.items.set(items);
  }
  @Input() ngForEmpty(ref: TemplateRef<unknown>) {
    this.emptyTemplateRef.set(ref);
  }

  constructor() {
    effect(() => {
      

      if (this.shouldDisplayTemplate())  this.viewContainerRef.createEmbeddedView(this.emptyTemplateRef()!);
    });
  }
}