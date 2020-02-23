import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {CrisisService} from '../crisis.service';
import {Crisis} from '../crisis';
import {Observable} from 'rxjs';
import {DialogService} from '../../dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  @Input() crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private crisisService: CrisisService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      });
  }

  // ngOnInit() {
  //   // const id = +this.route.snapshot.paramMap.get('id');
  //   // this.crisisService.getHero(id)
  //   //   .subscribe(crisis => this.crisis = crisis);
  //   this.route.paramMap.pipe(
  //     switchMap((params: ParamMap) =>
  //       this.crisisService.getCrisis(params.get('id')))
  //   ).subscribe(crisis => {
  //     this.crisis = crisis;
  //     this.editName = crisis.name;
  //   });
  // }

  cancel(): void {
    // this.location.back();
    const crisisId = this.crisis ? this.crisis.id : null;
    const crisisName = this.crisis ? this.crisis.name : null;
    // Pass along the crisis id if available
    // so that the HeroList component can select that crisis.
    // Include a junk 'foo' property for fun.
    // this.router.navigate(['/crises', {id: crisisId, name: crisisName}]);

    // Relative navigation back to the crises
    this.router.navigate(['../', {id: crisisId, name: crisisName}], {relativeTo: this.route});
  }

  save(): void {
    this.crisisService.updateCrisis(this.crisis)
      .subscribe(() => this.cancel());
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
