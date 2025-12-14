import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubUser } from '../../../core/services/github.service';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent {
  @Input() user?: GithubUser;
}
