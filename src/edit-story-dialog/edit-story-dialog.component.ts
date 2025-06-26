import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { UserStory } from '../app/user-story/user-story.model';

@Component({
  standalone: true,
  selector: 'app-edit-story-dialog',
  templateUrl: './edit-story-dialog.component.html',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class EditStoryDialogComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditStoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserStory
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [{ value: this.data.id, disabled: true }],
      name: [this.data.name, Validators.required],
      storyPoints: [this.data.storyPoints, [Validators.required, Validators.min(0)]],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      console.log("data loaded from edit screen: ", this.data);
      const updatedStory: UserStory = {
        id: this.data.id,
        name: this.form.get('name')?.value,
        storyPoints: this.form.get('storyPoints')?.value,
      };
      console.log("updated user story: ", updatedStory);
      this.dialogRef.close(updatedStory);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}