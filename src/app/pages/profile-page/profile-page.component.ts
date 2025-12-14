import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { GithubService, GithubUser } from '../../core/services/github.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    LeftPanelComponent,
    ContributionsComponent,
    NavbarComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  username = 'shreeramk';

  /** MOCK USER (used for UI development) */
  user: GithubUser = {
    login: 'shreeramk',
    name: 'Shreeram Kushwaha',
    avatar_url: 'https://avatars.githubusercontent.com/u/5489153?v=4',
    bio: 'Director of Engineering @UptimeAI',
    company: 'UptimeAI',
    location: 'Bangalore, India',
    blog: 'http://shreeramk.com',
    html_url: 'https://github.com/shreeramk',
    twitter_username: 'pom_fret',
    followers: 12,
    following: 3,
    public_repos: 8
  };

  /** Popular repositories */
  popularRepos: any[] = [];

  constructor(private github: GithubService) {}

  ngOnInit(): void {
    // API call only for repos (user is mocked)
    this.github.getRepos(this.username).subscribe((repos: any[]) => {
      this.popularRepos = repos.slice(0, 6);
    });
  }

  /** Computed social links (clean & reusable) */
  get socialLinks() {
    return {
      github: this.user.html_url,
      website: this.user.blog,
      twitter: this.user.twitter_username
        ? `https://twitter.com/${this.user.twitter_username}`
        : null,
      linkedin: 'https://www.linkedin.com/in/shreeramk/'
    };
  }
}
