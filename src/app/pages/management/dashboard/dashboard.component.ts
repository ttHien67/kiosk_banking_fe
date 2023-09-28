import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { TicketService } from 'src/app/service/module/ticket.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels | any;
  markers: ApexMarkers | any;
  title: ApexTitleSubtitle | any;
  fill: ApexFill | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  tooltip: ApexTooltip | any;
  stroke: ApexStroke | any;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: any;
  public chartOptions: Partial<ChartOptions>;

  listEmployee: Array<any> = [];
  data: Array<any> = [];
  form: any;

  public commonOptions: Partial<ChartOptions> = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    toolbar: {
      tools: {
        selection: false,
      },
    },
    markers: {
      size: 6,
      hover: {
        size: 10,
      },
    },
    tooltip: {
      followCursor: false,
      theme: 'dark',
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
    },
    grid: {
      clipMarkers: false,
    },
    xaxis: {
      type: 'datetime',
    },
  };

  constructor(
    private employeeService: EmployeeService,
    private ticketService: TicketService,
    private formBuilder: FormBuilder
  ) {
    this.chartOptions = {
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      toolbar: {
        tools: {
          selection: false,
        },
      },
      markers: {
        size: 6,
        hover: {
          size: 10,
        },
      },
      tooltip: {
        followCursor: false,
        theme: 'dark',
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
              return '';
            },
          },
        },
      },
      grid: {
        clipMarkers: false,
      },
      xaxis: {
        type: 'datetime',
      },
    };
  }

  initChart(title: any, data: any, date: any, month: any, year: any) {
    this.chartOptions = {
      series: [
        {
          name: 'chart3',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2017').getTime(),
            20,
            {
              min: 10,
              max: 60,
            }
          ),
        },
      ],
      chart: {
        id: 'yt',
        group: 'social',
        type: 'area',
        height: 300,
      },
      colors: ['#00E396'],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40,
        },
      },
    };
  }

  public generateDayWiseTimeSeries(
    baseval: any,
    count: any,
    yrange: any
  ): any[] {
    let i = 0;
    let series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  ngOnInit() {
    this.initForm();
    this.getEmployee();
    // this.getStatistic();
  }

  initForm() {
    this.form = this.formBuilder.group({
      date: [null],
      month: [null],
      year: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  getEmployee() {
    this.employeeService.getAllEmployee({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listEmployee = res.data;
        this.listEmployee = this.listEmployee.map((e) => e.name);
      }
    });
  }

  // getStatistic() {
  //   this.bookingService.statisticBooking(this.form.value).subscribe(res => {
  //     if(res.errorCode === '0'){
  //       this.data = res.data;
  //       this.data = this.data.map(e => e?.sumService ? e?.sumService : 0);
  //       this.initChart(this.listEmployee, this.data, this.f.date?.value, this.f.month?.value, this.f.year?.value);

  //     }
  //   })
  // }

  filter() {
    // this.getStatistic();
  }

  refresh() {
    this.initForm();
    // this.getStatistic();
  }
}
