import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Crisis} from '../crisis';
import {CrisisService} from '../crisis.service';


@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crises: Crisis[];
  selectedId: number;

  constructor(private crisisService: CrisisService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.crisisService.getCrises();
      })
    ).subscribe(crises => this.crises = crises);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.crisisService.addCrisis({name} as Crisis)
      .subscribe(crisis => {
        this.crises.push(crisis);
      });
  }

  delete(crisis: Crisis): void {
    this.crises = this.crises.filter(h => h !== crisis);
    this.crisisService.deleteCrisis(crisis).subscribe();
  }
}

