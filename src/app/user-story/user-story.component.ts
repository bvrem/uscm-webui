import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UserStoryService } from './user-story.service';
import { UserStory } from './user-story.model';
import { FormsModule } from '@angular/forms';
import { EditStoryDialogComponent } from '../../edit-story-dialog/edit-story-dialog.component';


@Component({
    selector: 'app-user-story',
    templateUrl: './user-story.component.html',
    styleUrls: ['./user-story.component.css'],
    imports: [CommonModule, MatListModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, FormsModule]
})
export class UserStoryComponent {
    stories: UserStory[] = [];
    newStory: UserStory = { id: 0, name: '', storyPoints: 0 };

    constructor(private storyService: UserStoryService, private dialog: MatDialog) {
        this.storyService.getStories().subscribe(data => {
            console.log('Loaded stories:', data);
            this.stories = data;
        });
    }

    addStory() {
        console.log('Creating story:', this.newStory);
        this.storyService.addStory({ ...this.newStory }).subscribe((createdStory) => {
            console.log('Created story:', createdStory);
            this.stories.push(createdStory);
            this.newStory = { id: 0, name: '', storyPoints: 0 };
        });
    }

    deleteStory(id: number) {
        this.storyService.deleteStory(id).subscribe(() => {
            this.stories = this.stories.filter(s => s.id !== id);
        });
    }

    editStory(story: any) {
        const dialogRef = this.dialog.open(EditStoryDialogComponent, {
            width: '300px',
            data: { ...story }
        });

        console.log('Editing story:', story);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.storyService.updateStory(result).subscribe(updated => {
                    const index = this.stories.findIndex(s => s.id === updated.id);
                    if (index !== -1) {
                        this.stories[index] = updated;
                    }
                });
            }
        });
    }

}
