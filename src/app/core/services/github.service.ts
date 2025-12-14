import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

/* =======================
   USER INTERFACE
======================= */
export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;

  /* SOCIAL */
  html_url: string;
  twitter_username?: string | null;

  /* STATS */
  followers: number;
  following: number;
  public_repos: number;
}

/* =======================
   CONTRIBUTIONS
======================= */
export interface ContributionDay {
  date: string;
  count: number;
  color?: string;
}

@Injectable({ providedIn: 'root' })
export class GithubService {

  private readonly API_BASE = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  /* =======================
     GET USER
  ======================= */
  getUser(username: string) {
    return this.http.get<GithubUser>(`${this.API_BASE}/${username}`);
  }

  /* =======================
     GET REPOSITORIES
  ======================= */
  getRepos(username: string) {
    return this.http.get<any[]>(`${this.API_BASE}/${username}/repos`);
  }

  /* =======================
     GET CONTRIBUTIONS (SVG)
  ======================= */
  getContributionsSvg(username: string) {
    const url = `https://github.com/users/${username}/contributions`;

    return this.http
      .get(url, { responseType: 'text' })
      .pipe(map(svg => this.parseSvg(svg)));
  }

  /* =======================
     PARSE SVG
  ======================= */
  private parseSvg(svgText: string): ContributionDay[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const rects = Array.from(doc.querySelectorAll('rect'));

    return rects.map(rect => ({
      date: rect.getAttribute('data-date') || '',
      count: Number(rect.getAttribute('data-count') || 0),
      color: rect.getAttribute('fill') || undefined
    }));
  }
}
