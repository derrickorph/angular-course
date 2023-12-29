import { Component, computed, signal } from '@angular/core';
import { Drink } from './drink.enum';
import { CommonModule } from '@angular/common';

const EMPTY_WATER = 'assets/1.PNG';
const FILLED_WATER = 'assets/2.PNG';
const EMPTY_COFFEE = 'assets/3.PNG';
const FILLED_COFFEE = 'assets/4.PNG';

@Component({
  selector: 'app-drink-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drink-tracker.component.html',
  styleUrl: './drink-tracker.component.css',
})
export class DrinkTrackerComponent {
  Drink = Drink;
  indexes = [0, 1, 2, 3, 4];
  quantity = signal(2);
  type = signal(Drink.Water);
  emptyImageUrl = computed(()=> this.type() === Drink.Water? EMPTY_WATER : EMPTY_COFFEE);
  filledImageUrl = computed(()=> this.type() === Drink.Water? FILLED_WATER : FILLED_COFFEE);
  message = computed(()=> `J'ai bu ${this.quantity()} ${this.type() === Drink.Water ? 'verre(s) d\'eau': 'tasse(s) de café'}`);

  decrement = (): void => {
    this.quantity.update(quantity=> quantity? quantity - 1 : 0)
  }
  increment = (): void => {
    this.quantity.update(quantity=> quantity< this.indexes.length? quantity + 1 : this.indexes.length)
  }

}
