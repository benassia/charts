import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Session, DataService } from './data.service';


@Injectable()
export class AuthGuard implements CanActivate, OnInit {
	session: Session = {loginStatus: '', device: '', latlng: ''};
	constructor(
		private router: Router,
		private data: DataService
	) { }

	ngOnInit(): void {
		this.data.currentSession.subscribe(session => this.session = session);
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> {
		if ( this.session.loginStatus === 'false') {
			this.router.navigate[('/unsecure')];
		}
		return;
		
	}
}
