import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {BackgroundService} from '../background.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-list-renderer',
  providers: [BackgroundService],
  template: `
    <div class="header">
      <code>this.renderer.setStyle(this.item.nativeElement, 'background', color);</code>
      <button (click)="changeColorAll()">CHANGE ALL</button>
      <button (click)="changeColorHalf()">CHANGE HALF</button>
      <button (click)="changeColorOne()">CHANGE ONE</button>
    </div>
    <div class="list">
      <app-list-item-renderer *ngFor="let x of iterator" [id]="x"></app-list-item-renderer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRendererComponent implements OnInit {

  color: 'gray' | 'orange' = 'gray';
  iterator = [];

  constructor(private backgroundService: BackgroundService) {}

  ngOnInit() {
    for (let i = 0; i < AppComponent.ITEM_COUNT; i++) {
      this.iterator.push(i);
    }
  }

  changeColorAll() {
    AppComponent.test(() => {
      this.color = this.color === 'gray' ? 'orange' : 'gray';
      this.changeForAll(this.color);
    }, 'renderer');
  }

  changeColorHalf() {
    AppComponent.test(() => {
      this.color = this.color === 'gray' ? 'orange' : 'gray';
      this.changeForHalf(this.color);
    }, 'renderer');
  }

  changeColorOne() {
    AppComponent.test(() => {
      this.color = this.color === 'gray' ? 'orange' : 'gray';
      this.backgroundService.set(1, this.color);
    }, 'renderer');
  }

  private changeForAll(color: string): void {
    for (const id of this.iterator) {
      this.backgroundService.set(id, color);
    }
  }

  private changeForHalf(color: string): void {
    for (const id of this.iterator) {
      if (id % 2) {
        this.backgroundService.set(id, color);
      }
    }
  }

}
