import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/service/module/ticket.service';

@Component({
  selector: 'app-tv-screen',
  templateUrl: './tv-screen.component.html',
  styleUrls: ['./tv-screen.component.scss']
})
export class TvScreenComponent implements OnInit {

  listTicket: any;
  Text: any = [];

  constructor(
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    document.body.style.backgroundImage = 'url(\'assets/img/night-background.webp\')';
    document.body.style.backgroundSize = "cover"
    this.getTicket();
  }

  getDate() {
    const d = new Date();
    const month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    return (d.getFullYear() + '-' + month + '-' + d.getDate());

  }

  getTicket(){
    const json = {
      // date: this.getDate()
    }

    this.ticketService.getTicket(json).subscribe(res => {
      if(res.errorCode === '0'){
        this.listTicket = res.data;
      }
    })
  }

}
