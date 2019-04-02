import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Hero } from "./heros/hero";
import { MessagesService } from "./messages.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
  providedIn: "root"
})
export class HeroService {
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.heroUrl}/${id}`;
    return this.httpClient.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero ${id}`)),
      catchError(this.handleError<Hero>("deleteHero"))
    );
  }
  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`update hero ID ${hero.id}`)),
      catchError(this.handleError<any>("updateHero"))
    );
  }
  constructor(
    private messagesService: MessagesService,
    private httpClient: HttpClient
  ) {}

  private heroUrl = "api/heroes";
  private log(message: string) {
    this.messagesService.add(`HeroService: ${message}`);
  }
  getHeros(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroUrl).pipe(
      tap(_ => this.log("fetched heroes")),
      catchError(this.handleError<Hero[]>("gerHeroes", []))
    );
  }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed`);
      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero ${id}`)),
      catchError(this.handleError<Hero>("getHero"))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added new Hero id:${newHero.id}`)),
      catchError(this.handleError<Hero>("addHero Error"))
    );
  }

  searchHero(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient
      .get<Hero[]>(`${this.heroUrl}/?name=${term}`, httpOptions)
      .pipe(
        tap(_ => this.log(`search ${term}`)),
        catchError(this.handleError<Hero[]>("search heroes"), [])
      );
  }
}
