import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { ArtifactService } from '../../core/services/artifact.service';

@Component({
  selector: 'app-artifacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artifacts.component.html'
})
export class ArtifactsComponent implements OnInit {
  artifacts: any[] = [];
  projectId: string | null = null;
  error = '';

  constructor(
    private artifactService: ArtifactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private cdr = inject(ChangeDetectorRef);

  async ngOnInit(): Promise<void> {
    await this.loadArtifacts();
  }

  async loadArtifacts(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('projectId');
    this.projectId = id;
    if (id){
      try {
        const response = await this.artifactService.getAll(id);
        this.artifacts = response.artifacts;
      } catch (err: any) {
        this.error = err?.error?.message || 'Failed to load artifacts';
      }

    }
  }

  editArtifact(id: string): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    this.router.navigate(['projects',projectId,'artifacts', id]);
  }

  createArtifact(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    this.router.navigate(['projects',projectId,'artifacts','new']);
  }

  async deleteArtifact(id: string): Promise<void> {
    try {
      await this.artifactService.delete(id);
      await this.loadArtifacts();
      this.cdr.detectChanges();
    } catch (err: any) {
      this.error = err?.error?.message || 'Failed to delete artifact';
      this.cdr.detectChanges();
    }
  }
}