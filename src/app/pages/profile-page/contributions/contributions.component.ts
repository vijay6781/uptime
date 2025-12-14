import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService, ContributionDay } from '../../../core/services/github.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-contributions',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss']
})
export class ContributionsComponent implements OnInit {

  @Input() username = '';
  chartOption: EChartsOption = {};
  loading = true;

  constructor(private github: GithubService) {}

  ngOnInit() {
    this.github.getContributionsSvg(this.username).subscribe(days => {
      this.loading = false;

      const data = days.map(d => [d.date, d.count]);

      this.chartOption = {
        tooltip: { trigger: 'item' },
        visualMap: {
          min: 0,
          max: 20,
          show: true,
          orient: 'horizontal',
          left: 'center',
          bottom: 0,
          inRange: { color: ['#ebedf0','#c6e48b','#7bc96f','#239a3b','#196127'] }
        },
        calendar: {
          range: new Date().getFullYear(),
          cellSize: [15, 15],
          dayLabel: { firstDay: 0 }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data
        }
      };
    });
  }
}
