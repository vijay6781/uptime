import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
}


export interface ContributionDay {
  date: string;
  count: number;
  color?: string;
}

@Injectable({ providedIn: 'root' })
export class GithubService {

  constructor(private http: HttpClient) {}

  getUser(username: string) {
    return this.http.get<GithubUser>(`https://api.github.com/users/shreeramk`);
  }

  getContributionsSvg(username: string) {
    const url = `https://github.com/users/shreeramk/contributions`;

    return this.http.get(url, { responseType: 'text' })
      .pipe(map(svg => this.parseSvg(svg)));
  }
  getRepos(username: string) {
  return this.http.get(`https://api.github.com/users/shreeramk/repos`);
}


  private parseSvg(svgText: string): ContributionDay[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const rects = Array.from(doc.querySelectorAll('rect'));

    return rects.map(r => ({
      date: r.getAttribute('data-date') || '',
      count: Number(r.getAttribute('data-count') || 0),
      color: r.getAttribute('fill') || undefined
    }));
  }
}
