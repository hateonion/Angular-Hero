import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HEROES } from "./heros/mockHeros";
import { Hero } from "./heros/hero";
import { MessagesService } from "./messages.service";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(private messagesService: MessagesService) {}

  getHeros(): Observable<Hero[]> {
    this.messagesService.add('message added')
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    return of(HEROES.find(hero => hero.id === id));
  }
}
