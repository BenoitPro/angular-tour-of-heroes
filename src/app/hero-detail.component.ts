import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


import { HeroService } from './hero.service';
import 'rxjs/add/operator/switchMap';

// JS import of models class
import { Hero } from './hero';


@Component({
    selector: 'my-hero-detail',
    templateUrl: './app/hero-detail.component.html',
    styleUrls: ['./app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    @Input() // signifie qu'il s'agit d'un paramètre a passer au composant
    hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        // + <= convert number (here "id"") to string
        this.route.params
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => this.hero = hero);
    }

    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }
    goBack(): void {
        this.location.back();
    }

}
