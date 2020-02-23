import {Injectable} from '@angular/core';
import {InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities} from 'angular-in-memory-web-api';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor(private logger: MessageService) {
  }
  createDb() {
    const heroes = [
      {id: 11, name: 'Dr Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    const crises = [
      {id: 1, name: 'Dragon Burning Cities'},
      {id: 2, name: 'Sky Rains Great White Sharks'},
      {id: 3, name: 'Giant Asteroid Heading For Earth'},
      {id: 4, name: 'Procrastinators Meeting Delayed Again'},
    ];

    return {heroes, crises};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the list array is empty,
  // the method below returns the initial number (11).
  // if the list array is not empty, the method below returns the highest
  // hero id + 1.
  genId(list: any[]): number {
    return list.length > 0 ? Math.max(...list.map(record => record.id)) + 1 : 11;
  }

  // get(reqInfo: RequestInfo) {
  //   this.logger.add('parseURL = ' + JSON.stringify(reqInfo));
  //   return undefined; // let the default GET handle all others
  // }

  // post(reqInfo: RequestInfo) {
  //   return undefined; // let the default POST handle all others
  // }

  // parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
  //   this.logger.add('parseURL = ' + url);
  //   return utils.parseRequestUrl(url);
  // }
}
