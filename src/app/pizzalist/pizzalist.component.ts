import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { PIZZAS } from "../pizzasList";
import { BasketComponent } from "../basket/basket.component";
import { BasketService } from "../basket.service";
import { Pizza } from "../pizza";

@Component({
  selector: "app-pizzalist",
  templateUrl: "./pizzalist.component.html",
  styleUrls: ["./pizzalist.component.css"]
})
export class PizzalistComponent implements OnInit {
  // @Input() name: string;
  @Output() isAdded = new EventEmitter<boolean>();
  constructor(private basketService: BasketService) {}

  ngOnInit() {}
  pizzas = PIZZAS;
  pizzaList: Pizza[] = [];

  updateList(pizza: Pizza, addedToTotal: boolean) {
    this.basketService.addToTotalAmount(pizza.price, addedToTotal);
    this.isAdded.emit(addedToTotal);
  }

  decrementNumber(pizza: Pizza) {
    // Decrement the number of the ordered pizza
    // the total amount of the selected pizza should be reduced as well
    // call the update list
    /*let newOrderedPizza, index;
    this.pizzaList.map((p, i) => {
      if (pizza.id == p.id) newOrderedPizza = p;
      index = i;
    });
    if (!newOrderedPizza) {
      return;
    }
    let rest = --newOrderedPizza.numberOrdered;
    if (!rest) {
      this.pizzaList.splice(index, 1);
    }*/
    if (!pizza.numberOrdered) return;
    pizza.totalAmountProduct = pizza.price * --pizza.numberOrdered;
    this.updateList(pizza, false);
  }

  incrementNumber(pizza: Pizza) {
    // Increment the number of the ordered pizza
    // the total amount of the selected pizza should be augmented as well
    // call the update list
    /*let newOrderedPizza = this.pizzaList.find(p => {
      return pizza.id == p.id;
    });
    if (!newOrderedPizza) {
      newOrderedPizza = pizza;
      this.pizzaList.push(pizza);
    }*/
    pizza.totalAmountProduct = pizza.price * ++pizza.numberOrdered;
    this.updateList(pizza, true);
  }
}
