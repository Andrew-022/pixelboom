import { TestBed } from '@angular/core/testing';

import { GameNavigatorService } from './game-navigator.service';

describe('GameNavigatorService', () => {
  let service: GameNavigatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameNavigatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
