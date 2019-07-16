import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  lang: string = "en";
  constructor(public translate: TranslateService) {
    translate.use(this.lang);
  }

  ngOnInit() {}
  changeLang() {
    this.translate.use(this.lang);
  }
}
