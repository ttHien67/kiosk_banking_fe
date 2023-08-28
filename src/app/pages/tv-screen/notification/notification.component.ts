import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() data: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.passEntry.emit(), 5000);
  }

}
