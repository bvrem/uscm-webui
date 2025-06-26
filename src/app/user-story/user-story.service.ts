import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStory } from './user-story.model';

@Injectable({ providedIn: 'root' })
export class UserStoryService {
  private apiUrl = 'http://localhost:4300/stories';

  constructor(private http: HttpClient) {}

  getStories(): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(this.apiUrl);
  }

  addStory(story: UserStory): Observable<UserStory> {
    return this.http.post<UserStory>(this.apiUrl, story);
  }

  updateStory(story: UserStory): Observable<UserStory> {
    return this.http.put<UserStory>(`${this.apiUrl}/${story.id}`, story);
  }

  deleteStory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
