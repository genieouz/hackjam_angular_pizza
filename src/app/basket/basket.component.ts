import { Component, OnInit } from "@angular/core";
import { BasketService } from "../basket.service";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.css"]
})
export class BasketComponent implements OnInit {
  constructor(
    private basketService: BasketService,
    translate: TranslateService
  ) {}
  amount = 0;
  ngOnInit() {
    // With the subscribe, you can catch
    // the value of the variable emitted in the service
    /* Here you should subscribe to the update emitter to catch 
    its value and pass it to the amount variable so you can display it in the basket.
    */
    this.basketService.update.subscribe((total: number) => {
      this.amount = total;
    });
  }
}
