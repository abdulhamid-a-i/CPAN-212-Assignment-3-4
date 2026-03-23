import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-details.component.html'
})
export class ProjectDetailComponent implements OnInit {
  projectId: string | null = null;
  error = '';
  project = {
    title: '',
    description: '',
    researchField: '',
    projectId: '',
    ownerId: ''
  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadProject();
  }

  async loadProject(): Promise<void> {
    this.projectId = this.route.snapshot.paramMap.get('id');
    console.log(this.projectId)
    if (this.projectId){
      try {
        const response: any = await this.projectService.getById(this.projectId);
        console.log("response: ",response)
        this.project = response;
      } catch (err: any) {
        this.error = err?.error?.message || 'Failed to load project';
      }
    }
  }

  editProject(id: string): void {
    this.router.navigate(['/projects/edit/', id]);
  }

  viewArtifacts(id: string): void {
    this.router.navigate(['/artifacts/', id]);
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await this.projectService.delete(id);
      this.router.navigate(['/projects']);
    } catch (err: any) {
      this.error = err?.error?.message || 'Failed to delete project';
    }
  }
}