import { Component, OnInit } from "@angular/core";
import { HEROES } from "./mockHeros";
import { Hero } from "./hero";
import {HeroService} from '../hero.service';

@Component({
  selector: "app-heros",
  templateUrl: "./heros.component.html",
  styleUrls: ["./heros.component.scss"]
})
export class HerosComponent implements OnInit {
  selectedHero : Hero;
  heroes: Hero[];
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeros();
  }

  getHeros() {
    this.heroService.getHeros().subscribe(heroes => this.heroes = heroes)
  }
  onSelect(hero: Hero) : void {
    this.selectedHero = hero;
  };
}
