import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { TicketService } from 'src/app/service/module/ticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx: any;
  public chartColor: any;
  public chartEmail: any;
  public chartHours: any;
  public chartColunm: any;

  ticketDone: any;
  ticketInProgress: any;
  ticketNotStart: any;

  sumTicket: any;
  countNotStartTicket: any;
  countInProgressTicket: any;
  countDoneTicket: any;

  listEmployee: Array<any> = [];
  listEmployeeFiltered: Array<any> = [];
  listDataForEmployee: Array<any> = [];
  form: any;

  constructor(
    private ticketService: TicketService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.initForm();
    this.getTicketData();
    this.getCountTicket();
    this.getAllEmployee();

    this.getTicketDataForEmployee();
  }

  initForm() {
    this.form = this.formBuilder.group({
      date: [null],
      month: [null],
      year: [null],
    });
  }

  search() {
    this.getTicketDataForEmployee();
  }

  getTicketData() {
    this.ticketService.statisticMonthly({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.ticketDone = res.data.ticketDone;
        this.ticketInProgress = res.data.ticketInProgress;
        this.ticketNotStart = res.data.ticketNotStart;

        this.ticketChart(
          this.ticketDone,
          this.ticketInProgress,
          this.ticketNotStart
        );
      }
    });
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listEmployee = res.data.map((e: any) => e.name);
      }
    });
  }

  getCountTicket() {
    this.ticketService.getCountTicket({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.sumTicket = res.data.countSumTicket;
        this.countDoneTicket = res.data.countDoneTicket;
        this.countInProgressTicket = res.data.countInProgressTicket;
        this.countNotStartTicket = res.data.countNotStartTicket;

        this.ticketRate(
          this.sumTicket,
          this.countDoneTicket,
          this.countInProgressTicket,
          this.countNotStartTicket
        );
      }
    });
  }

  getTicketDataForEmployee() {
    const json = {
      ...this.form.value,
    };

    console.log(json);

    this.ticketService.getTicketDataForEmployee(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listDataForEmployee = res.data.map((e: any) =>
          e === null ? 0 : e?.sumService
        );

        this.ticketForEmployee(this.listEmployee, this.listDataForEmployee);
      }
    });
  }

  ticketChart(dataDone: any, ticketInProgress: any, ticketNotStart: any) {
    var speedCanvas: any = document.getElementById('speedChart');

    var dataFirst = {
      data: ticketNotStart,
      fill: false,
      borderColor: '#fcc468',
      backgroundColor: 'transparent',
      pointBorderColor: '#fcc468',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: dataDone,
      fill: false,
      borderColor: '#4acccd',
      backgroundColor: 'transparent',
      pointBorderColor: '#4acccd',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataThird = {
      data: ticketInProgress,
      fill: false,
      borderColor: '#ef8157',
      backgroundColor: 'transparent',
      pointBorderColor: '#ef8157',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var speedData = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [dataFirst, dataSecond, dataThird],
    };

    var chartOptions: any = {
      legend: {
        display: false,
        position: 'top',
      },
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      data: speedData,
      options: chartOptions,
    });
  }

  ticketRate(sum: any, done: any, progress: any, notStart: any) {
    this.canvas = document.getElementById('chartEmail');
    this.ctx = this.canvas.getContext('2d');
    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            label: 'Ticket Rate',
            backgroundColor: ['#4acccd', '#e3e3e3', '#fcc468'],
            borderWidth: 0,
            data: [
              (done / sum) * 100,
              (progress / sum) * 100,
              (notStart / sum) * 100,
            ],
          },
        ],
      },
    });
  }

  ticketForEmployee(listEmployee: any, listDataForEmployee: any) {
    this.chartColunm = document.getElementById('columnChart');
    let chartStatus = Chart.getChart('columnChart');
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    const data = {
      labels: listEmployee,
      datasets: [
        {
          label: 'My First Dataset',
          data: listDataForEmployee,
          borderWidth: 1,
        },
        {
          label: 'My First Dataset',
          data: listDataForEmployee,
          borderWidth: 1,
        },
      ],
    };

    const config = new Chart(this.chartColunm, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
