import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  error = '';

  private cdr = inject(ChangeDetectorRef);
  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadProjects();
  }

  async loadProjects(): Promise<void> {
    try {
      const response = await this.projectService.getAll();
      this.projects = response.projects;
      console.log(this.projects)
    } catch (err: any) {
      this.error = err?.error?.message || 'Failed to load projects';
    }
  }

  viewProject(id: string): void {
    this.router.navigate(['/projects/', id]);
  }

  viewArtifacts(id: string): void {
    this.router.navigate(['/projects',id,'artifacts']);
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await this.projectService.delete(id);
      await this.loadProjects();
      this.cdr.detectChanges();
    } catch (err: any) {
      this.error = err?.error?.message || 'Failed to delete project';
    }
  }
}