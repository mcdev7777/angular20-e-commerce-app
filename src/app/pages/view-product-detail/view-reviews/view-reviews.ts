import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';
import { ViewPanel } from '../../../directives/view-panel';
import { RatingSummary } from '../rating-summary/rating-summary';
import { ViewReviewItem } from '../view-review-item/view-review-item';

@Component({
  selector: 'app-view-reviews',
  standalone: true,
  imports: [ViewPanel, RatingSummary, ViewReviewItem],
  template: `
    <div appViewPanel>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Customer Reviews</h2>
      </div>
      <app-rating-summary [product]="product()" />
      <div class="flex flex-col gap-6">
        @for (review of product().reviews; track review.id) {
          <app-view-review-item [review]="review" />
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ViewReviews {
  product = input.required<Product>();
}
