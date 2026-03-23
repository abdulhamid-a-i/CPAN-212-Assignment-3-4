import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent implements OnInit {
  form = {
    title: '',
    researchField: '',
    description: ''
  };

  private cdr = inject(ChangeDetectorRef);
  projectId: string | null = null;
  isEditMode = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  async ngOnInit(): Promise<void> {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.projectId;

    if (this.isEditMode && this.projectId) {
      try {
        const project: any = await this.projectService.getById(this.projectId);
        this.form.title = project.title;
        this.form.researchField = project.researchField;
        this.form.description = project.description;
      } catch (err: any) {
        this.error = err?.error?.message || 'Failed to load project';
      }
    }
  }

  async submit(): Promise<void> {
    this.error = '';
    let response;
    try {
      if (this.isEditMode && this.projectId) {
        await this.projectService.update(this.projectId, this.form);
      } else {
        response = await this.projectService.create(this.form);
        this.projectId = response.project.projectId;
      }

      this.router.navigate(['/projects/',this.projectId]);
    } catch (err: any) {
      this.error = err?.error?.message || 'Save failed';
      this.cdr.detectChanges();
    }
  }
}