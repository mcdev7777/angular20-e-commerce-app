import { Component } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';

@Component({
  selector: 'app-list-cart-items',
  imports: [ViewPanel],
  template: ` <div appViewPanel></div> `,
  styles: ``,
})
export class ListCartItems {}
