import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef
} from "@angular/core";
import { PIZZAS } from "../pizzasList";
import { BasketService } from "../basket.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [BsModalService]
})
export class HomeComponent implements OnInit {
  counter = 0;
  totalPrice = 0;
  constructor(
    private basketService: BasketService,
    public modalService: BsModalService,
    translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("en");
  }
  pizzas = PIZZAS;
  modal: BsModalRef;
  message: { content: string; type: string };
  @ViewChild("testModal", null) testModal: TemplateRef<any>;

  ngOnInit() {}

  updateList(isIncrementing: boolean) {
    /* You should check if the value is incrementing or not and 
    change the value of the counter depending of the value of the boolean
    */
    if (isIncrementing) this.counter++;
    else this.counter--;
  }

  resetAll() {
    // First, you need to set the value of the total Amount and the number of pizza Ordered to every pizza to 0 (use map)
    // Then, don't forget to also reset the counter
    // Finally, let's call the service to reset the basket. (Be sure that you have called the service inside the constructor !)
    this.counter = 0;
    this.pizzas.map(pizza => {
      pizza.totalAmountProduct = 0;
      pizza.numberOrdered = 0;
      this.basketService.resetBasket();
    });
  }

  buyNow() {
    /*
     If the total amount of the basket is greater than 0 and equal or less to 200,
    you can open the modal that contains the pizza choosen
     */
    this.totalPrice = this.basketService.totalAmount;
    if (this.totalPrice > 0 && this.totalPrice <= 200)
      this.modal = this.modalService.show(this.testModal, {
        initialState: {}
      });
  }

  showMessage(content, type) {
    this.message = { content: content, type: type };
    (function(_this) {
      setTimeout(function() {
        _this.message = null;
      }, 2000);
    })(this);
  }
}
