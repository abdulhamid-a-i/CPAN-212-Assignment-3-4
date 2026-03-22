import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { authGuard } from './core/guards/auth.guard';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { ProjectDetailComponent } from './pages/project-details/project-details.component';
import { ArtifactsComponent } from './pages/artifacts/artifacts.component';
import { ArtifactFormComponent } from './pages/artifact-form/artifact-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [authGuard] },
  { path: 'projects/new', component: ProjectFormComponent, canActivate: [authGuard] },
  { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [authGuard]},
  { path: 'projects/edit/:id', component: ProjectFormComponent, canActivate: [authGuard] },
  { path: 'projects/:projectId/artifacts', component: ArtifactsComponent, canActivate: [authGuard] },
  { path: 'projects/:projectId/artifacts/new', component: ArtifactFormComponent, canActivate: [authGuard] },
  { path: 'projects/:projectId/artifacts/:artifactId', component: ArtifactFormComponent, canActivate: [authGuard] }
  //{ path: '**', redirectTo: 'login' }
];