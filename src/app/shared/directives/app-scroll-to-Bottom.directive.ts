// shared/directives/scroll-bottom.directive.ts
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appScrollBottom]',
  exportAs: 'appScrollBottom',
})
export class ScrollBottomDirective implements OnChanges {
  @Input() appScrollBottom: any;
  @Output() atBottomChange = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.isNearBottom()) this.scrollToBottom();
  }

  @HostListener('scroll') onScroll() {
    this.atBottomChange.emit(this.isNearBottom());
  }

  scrollToBottom() {
    const nativeEl = this.el.nativeElement;
    setTimeout(() => {
      nativeEl.scrollTop = nativeEl.scrollHeight;
    });
  }

  private isNearBottom(): boolean {
    const nativeEl = this.el.nativeElement;
    const threshold = 20;
    return nativeEl.scrollHeight - nativeEl.scrollTop - nativeEl.clientHeight < threshold;
  }
}
