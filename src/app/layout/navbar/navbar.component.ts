import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ROUTES } from '../sidebar/sidebar.component';
import { AuthService } from 'src/app/service/module/auth.service';
import { WebSocketService } from 'src/app/service/module/websocket.service';
import { TicketComponent } from 'src/app/pages/management/ticket/ticket.component';
import { TicketService } from 'src/app/service/module/ticket.service';

@Component({
  // moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private listTitles: any;
  location: Location;
  private nativeElement: Node;
  private toggleButton: any;
  private sidebarVisible: boolean;
  counter = 0;
  listNotification: Array<any> = [];

  public isCollapsed = true;
  @ViewChild('navbar-cmp', { static: false }) button: any;

  currentUser: any;

  constructor(
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private router: Router,
    private authService: AuthService,
    private websocketService: WebSocketService,
    private ticketService: TicketService
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle: any) => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });

    this.currentUser = this.authService.currentUser().userId;
    this.connect();
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return '';
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  show(menu: any) {
    const menuElement = document.getElementsByClassName(menu.className)[0];
    if (menuElement) {
      menuElement.classList.toggle('show');
    }
  }

  logout() {
    this.authService.logout();
  }

  connect(): void {
    this.websocketService.connectToCreate();

    // subscribe receives the value.
    this.websocketService.notificationMessage.subscribe((data) => {
      this.listNotification.push(data);
      this.counter = this.listNotification.length;
    });
  }

  disconnect(): void {
    this.websocketService.disconnect();
  }

  searchTicket(item: any) {
    this.listNotification = this.listNotification.filter(
      (e) => e.id != item.id
    );
    this.ticketService.searchTicketForNotification(item).subscribe((res) => {
      this.counter -= 1;
    });
  }
}
