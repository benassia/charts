import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnSecureAppComponent } from './unsecure.component';
import { SecureAppComponent } from './secure.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'unsecure', pathMatch: 'full' },
  { path: 'unsecure', component: UnSecureAppComponent },
  { path: 'secure', component: SecureAppComponent /*, canActivate: [AuthGuard] */}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
