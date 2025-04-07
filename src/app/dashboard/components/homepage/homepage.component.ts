import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ITasks } from '../../../core/interfaces/tasks';
import { IUsersChart } from '../../../core/interfaces/users';
import { forkJoin } from 'rxjs';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  chartOptions: any = {
    animationEnabled: true,
    data: [
      {
        type: 'pie',
        startAngle: -90,
        indexLabel: '{name}: {y}',
        yValueFormatString: "#,###.##'%'",
        dataPoints: [], // Initially empty, will be updated dynamically
      },
    ],
  };

  userChartOptions: any = {
    animationEnabled: true,
    data: [
      {
        type: 'pie',
        startAngle: -90,
        indexLabel: '{name}: {y}',
        yValueFormatString: "#,###.##'%'",
        dataPoints: [], // Initially empty, will be updated dynamically
      },
    ],
  };

  taskCount!: ITasks;
  userCount!: IUsersChart;
  isEmployee!:boolean;

  constructor(private _dashboardService: DashboardService,private _storgeService:StorageService) {}

  // ngOnInit(): void {
  //   this.isEmployee = this._storgeService.isEmployee();
  //   // Use forkJoin to fetch taskCount and userCount simultaneously
  //   forkJoin({
  //     taskCount: this._dashboardService.fetchTaskCount(),
  //     userCount: this._dashboardService.fetchUserCount(),
  //   }).subscribe(({ taskCount, userCount }) => {
  //     // Update task count
  //     this.taskCount = taskCount;
  //     this.chartOptions = {
  //       ...this.chartOptions,
  //       data: [
  //         {
  //           type: 'pie',
  //           startAngle: -90,
  //           indexLabel: '{name}: {y}',
  //           yValueFormatString: "#,###.##'%'",
  //           dataPoints: [
  //             { y: taskCount.toDo, name: 'To Do' },
  //             { y: taskCount.inProgress, name: 'In Progress' },
  //             { y: taskCount.done, name: 'Done' },
  //           ],
  //         },
  //       ],
  //     };

  //     // Update user count
  //     this.userCount = userCount;
  //     this.userChartOptions = {
  //       ...this.userChartOptions,
  //       data: [
  //         {
  //           type: 'pie',
  //           startAngle: -90,
  //           indexLabel: '{name}: {y}',
  //           yValueFormatString: "#,###.##'%'",
  //           dataPoints: [
  //             { y: userCount.activatedEmployeeCount, name: 'Activated' },
  //             { y: userCount.deactivatedEmployeeCount, name: 'Deactivated' },
  //           ],
  //         },
  //       ],
  //     };
  //   });
  // }


  ngOnInit(): void {
    this.isEmployee = this._storgeService.isEmployee();
    // Use forkJoin to fetch taskCount and userCount simultaneously
    if(this.isEmployee){
      forkJoin({
        taskCount: this._dashboardService.fetchTaskCount(),

      }).subscribe(({ taskCount }) => {
        // Update task count
        this.taskCount = taskCount;
        this.chartOptions = {
          ...this.chartOptions,
          data: [
            {
              type: 'pie',
              startAngle: -90,
              indexLabel: '{name}: {y}',
              yValueFormatString: "#,###.##'%'",
              dataPoints: [
                { y: taskCount.toDo, name: 'To Do' },
                { y: taskCount.inProgress, name: 'In Progress' },
                { y: taskCount.done, name: 'Done' },
              ],
            },
          ],
        };
      });

    }
    else{
      forkJoin({
        taskCount: this._dashboardService.fetchTaskCount(),
        userCount: this._dashboardService.fetchUserCount(),
      }).subscribe(({ taskCount, userCount }) => {
        // Update task count
        this.taskCount = taskCount;
        this.chartOptions = {
          ...this.chartOptions,
          data: [
            {
              type: 'pie',
              startAngle: -90,
              indexLabel: '{name}: {y}',
              yValueFormatString: "#,###.##'%'",
              dataPoints: [
                { y: taskCount.toDo, name: 'To Do' },
                { y: taskCount.inProgress, name: 'In Progress' },
                { y: taskCount.done, name: 'Done' },
              ],
            },
          ],
        };

        // Update user count
        this.userCount = userCount;
        this.userChartOptions = {
          ...this.userChartOptions,
          data: [
            {
              type: 'pie',
              startAngle: -90,
              indexLabel: '{name}: {y}',
              yValueFormatString: "#,###.##'%'",
              dataPoints: [
                { y: userCount.activatedEmployeeCount, name: 'Activated' },
                { y: userCount.deactivatedEmployeeCount, name: 'Deactivated' },
              ],
            },
          ],
        };
      });

    }

    }
}
