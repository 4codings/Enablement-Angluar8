import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { filter, take } from 'rxjs/operators';

import { StorageSessionService } from 'src/app/services/storage-session.service';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  //   styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private StorageSessionService: StorageSessionService,
    private globals: Globals,
    private location: Location,
    public toastr: ToastrService,
    private http: HttpClient
  ) {


  }
  domain_name = this.globals.domain_name;
  options = [];
  optionSelected: string = "";
  chooworkingProfile() {
    const data = {
      agency : JSON.parse(sessionStorage.getItem('u')).SRC_CD,
      V_USR_NM: JSON.parse(sessionStorage.getItem('u')).USR_NM
    };
    this.http.get<data>("https://" + this.domain_name + "/rest/v1/secured?V_SRC_CD=" + data.agency + "&V_USR_NM=" + data.V_USR_NM + "&REST_Service=UserRoles&Verb=GET").subscribe(
      data => {
        // (data);
        if (data.ROLE_CD) {
          for (let i = 0; i < data.ROLE_CD.length; i++) {
            // (data.ROLE_CD[i]);
            if (data.ROLE_CD[i] == "Developer Role") {
              this.options.push("Developer");
            } else if (data.ROLE_CD[i] == "End User Role") {
              this.options.push("End_User");
            } else if (data.ROLE_CD[i] == 'System Admin Role') {
              this.options.push("System_Admin");
            } else if (data.ROLE_CD[i] == 'Finance Role') {
              this.options.push("Cost");
            }
            else if (data.ROLE_CD[i] == 'IT Asset Role') {
              this.options.push("Assets");
            } else if (data.ROLE_CD[i] == 'User Admin Role') {
              this.options.push("User_Admin");
            }

          }
        }

        //navigate when the lenght is 1
        // this.StorageSessionService.setLocatS("profileopt",this.options);
        if (this.options.length == 1) {
          // this.StorageSessionService.setLocatS("profileopt",this.options);

          this.toastr.info(this.options[0].toString(), "profile");
          this.router.navigateByUrl(this.options.pop(), { skipLocationChange: true });
        }
        this.StorageSessionService.setLocatS("profileopt", this.options);
      });
  }

  //Selected option in the profile section
  optionSelecteds(e: any) {
    //if(e.split(" ") > 0)
    // this.toastr.info("your profile "+e+"profile");
    this.router.navigateByUrl(e.replace(" ", "_"), { skipLocationChange: true });
    //this.router.navigateByUrl(e);
  }
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      take(1)
    )
    .subscribe(() => this.location.replaceState(''));
    this.chooworkingProfile();
    this.redirectingToUserProfile();
    // let url:string="user";
    // this.router.navigateByUrl(url);
  }

  redirectingToUserProfile() {
    const data = {
      agency : JSON.parse(sessionStorage.getItem('u')).SRC_CD,
      V_USR_NM: JSON.parse(sessionStorage.getItem('u')).USR_NM
    };
    this.http.get<data>("https://" + this.domain_name + "/rest/v1/secured?V_SRC_CD=" + data.agency + "&V_USR_NM=" + data.V_USR_NM + "&REST_Service=UserRoles&Verb=GET").subscribe(
      data => {
        // (data);
        if (data.ROLE_CD) {
          for (let i = 0; i < data.ROLE_CD.length; i++) {
            // (data.ROLE_CD[i]);
            if (data.ROLE_CD[i] == "End User Role") {
              this.router.navigateByUrl('/End_User', { skipLocationChange: true });
              return false;
            } else if(data.ROLE_CD[i] == "User Admin Role") {
              this.router.navigateByUrl('/User_Admin', { skipLocationChange: true });
              return false;
            }
  
          }
          if (data.ROLE_CD[0] == "Developer Role") {
            this.router.navigateByUrl('/Developer', { skipLocationChange: true });
          } else if (data.ROLE_CD[0] == "End User Role") {
            this.router.navigateByUrl('/End_User', { skipLocationChange: true });
          } else if (data.ROLE_CD[0] == 'System Admin Role') {
            this.router.navigateByUrl('/System_Admin', { skipLocationChange: true });
          } else if (data.ROLE_CD[0] == 'User Admin Role') {
            this.router.navigateByUrl('/User_Admin', { skipLocationChange: true });
          } 
        }
  
      });
  }

}

export interface data {
  ROLE_CD: string[];
}
