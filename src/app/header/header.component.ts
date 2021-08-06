import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticatedUser = false;
 /*  @Output() featureSelected = new EventEmitter<string>(); */
  private userSub:Subscription;

  constructor(private dataStorageService:DataStorageService,private authService:AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticatedUser = !user ? false:true; /* if user is there, then isAuthenticated is true */
    }
    );
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  /* onSelect(feature : string){
    this.featureSelected.emit(feature);
  } */

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
