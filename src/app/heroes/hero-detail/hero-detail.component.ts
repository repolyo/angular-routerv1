import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.heroService.getHero(id)
    //   .subscribe(hero => this.hero = hero);
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.heroService.getHero(params.get('id')))
    ).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    // this.location.back();
    const heroId = this.hero ? this.hero.id : null;
    const heroName = this.hero ? this.hero.name : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/superheroes', { id: heroId, name: heroName }]);
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
