import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArtifactService } from '../../core/services/artifact.service';

@Component({
  selector: 'app-artifact-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './artifact-form.component.html'
})
export class ArtifactFormComponent implements OnInit {
  form = {
    title: '',
    description: '',
    projectId: ''
  };

  private cdr = inject(ChangeDetectorRef);

  artifactId: string | null = null;
  isEditMode = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artifactService: ArtifactService
  ) {}

  async ngOnInit(): Promise<void> {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    if(projectId){
      this.form.projectId = projectId.toString();
    }
    
    this.artifactId = this.route.snapshot.paramMap.get('artifactId');
    this.isEditMode = !!this.artifactId;

    if (this.isEditMode && this.artifactId) {
      try {
        const artifact: any = await this.artifactService.getById(this.artifactId);
        this.form.title = artifact.title;
        this.form.description = artifact.description;
        this.form.projectId = artifact.projectId;
      } catch (err: any) {
        this.error = err?.error?.message || 'Failed to load artifact';
      }
    }
  }

  async submit(): Promise<void> {
    this.error = '';
    const projectId = this.route.snapshot.paramMap.get('projectId');

    try {
      if (this.isEditMode && this.artifactId) {
        await this.artifactService.update(this.artifactId, this.form);
      } else {
        await this.artifactService.create(this.form);
      }

      this.router.navigate(['projects',projectId,'artifacts']);
    } catch (err: any) {
      this.error = err?.error?.message || 'Save failed';
      this.cdr.detectChanges();
    }
  }
}