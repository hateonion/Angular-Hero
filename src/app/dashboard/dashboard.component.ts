import { Component, OnInit } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../heros/hero";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeros().subscribe(heroes => (this.heroes = heroes.slice(1, 5)));
  }
}