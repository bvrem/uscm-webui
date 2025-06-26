import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserStoryComponent } from './user-story/user-story.component';

export const routes: Routes = [
  { path: 'user-stories', component: UserStoryComponent },
  { path: '', redirectTo: '/user-stories', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
