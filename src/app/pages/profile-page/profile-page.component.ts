import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { GithubService, GithubUser } from '../../core/services/github.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, LeftPanelComponent, ContributionsComponent, NavbarComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  username = 'shreeramk';
user?: GithubUser = {
  login: 'shreeramk',
  name: 'Shreeram Kushwaha',
  avatar_url: 'https://avatars.githubusercontent.com/u/5489153?v=4',
  bio: 'Director of Engineering @UptimeAI',
  company: 'UptimeAI',
  location: 'Bangalore, India',
  blog: 'http://shreeramk.com',
  followers: 12,
  following: 3,
  public_repos: 8
};
  constructor(private github: GithubService) {}

  popularRepos: any[] = [];

ngOnInit(): void {
  // this.github.getUser(this.username).subscribe(u => this.user = u);

  this.github.getRepos(this.username).subscribe((repos: any) => {
    this.popularRepos = repos.slice(0, 6);
  });
}

  
}
