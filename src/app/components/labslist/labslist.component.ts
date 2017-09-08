import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { MdDialogRef, MdSnackBar, MdDialog } from '@angular/material';

import { Lab } from '../../model/lab.model';


@Component({
  selector: 'app-labslist',
  templateUrl: './labslist.component.html',
  styleUrls: ['./labslist.component.css']
})
export class LabslistComponent implements OnInit {
  Token: string;
  filteredLabs = [];
  labs: Array<Lab> = [];
  selectedLab: Lab = new Lab();
  

  private dialogRef: MdDialogRef<DeleteLabComponent>;

  constructor(private _http: Http,
    private snackbar: MdSnackBar,
    private dialog: MdDialog) { }

  ngOnInit() {
    this.Token = JSON.parse(sessionStorage.getItem("Token").toString());
    this.loadLabs();
  }

  loadLabs(){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.Token);

    let options = new RequestOptions({ headers: headers });

    this._http.get("http://10.10.20.205:8002/v1/labs", options)
      .subscribe(data =>        
         this.labs = data.json().labs        
      );
  }
  cancel(){
    this.loadLabs();
  }
  
  //for showing Next previous buttons
  step = -1;
  
    setStep(index: number,currentLab) {
      // this.step = index;
      if (this.selectedLab.id === currentLab.id) {
        this.selectedLab = <Lab>{};
      } else {
        this.selectedLab = currentLab;
      }
      // this.step=-1;
    }
  
    // nextStep() {
    //   this.step++;
    // }
  
    // prevStep() {
    //   this.step--;
    // }

    //on selection or click on lab
    onSelectLab(currentLab) {
      if (this.selectedLab.id === currentLab.id) {
        this.selectedLab = <Lab>{};
      } else {
        this.selectedLab = currentLab;
        // alert(this.selectedLab.name)
      }
    }



    /**
   * Show Delete Dialog
   */
  openDialog(lab: Lab): void {
    
        this.dialogRef = this.dialog.open(DeleteLabComponent, {
          disableClose: true,
          height: '200px',
          width: '400px',
        });
    
        this.dialogRef.afterClosed().subscribe(result => {
          this.dialogRef = null;
          if (result === 'Delete!') {
            const apiParam = { 'pathParams': { 'LABID': lab.id } };
            this.onDeleteLab(lab.id);
          }
        });
      }
    
      /**
   * Update Labs
   */
  onUpdateLabs(selectedLab) {
    
        
        
        let headers = new Headers()  
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + this.Token);
        let options = new RequestOptions({ headers: headers });  
    
    
         let body = this.selectedLab;
        
        this._http.put("http://10.10.20.205:8002/v1/labs/"+this.selectedLab.id,body,options)
        .subscribe(response => {
          if (response) {
            this.loadLabs();
            this.snackbar.open('Lab Updated successfully...!', '', {
              duration: 1000
            });
            if (this.selectedLab.id === selectedLab.id) {
              this.selectedLab = <Lab>{};
            } else {
              this.selectedLab = selectedLab;
            }
          }
        },
        errors => {
          this.snackbar.open(errors.errors.message, '', {
            duration: 1000
          });
        });
      }

  /**
   * Delete labs
   */
  onDeleteLab(lab) {
    
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.Token);

    let options = new RequestOptions({ headers: headers });

    this._http.delete("http://10.10.20.205:8002/v1/labs/"+lab, options)
      .subscribe(response => {
        if (response) {
          this.loadLabs();
          this.snackbar.open('Lab deleted successfully...!', '', {
            duration: 1000
          });
        }
        },
        errors => {
          this.snackbar.open(errors.errors.message, '', {
            duration: 1000
          });
        });
        }       
      

        //cancel button clicked
        cancelDetails(){
          this.step=-1;
        }



    // this.api.request('DELETE_LAB', lab)
    // .subscribe(response => {
      
    //   if (response) {
    //     this.loadLabs();
    //     this.snackbar.open('Lab deleted successfully...!', '', {
    //       duration: 1000
    //     });
    //   }
    // },
    // errors => {
    //   this.snackbar.open(errors.errors.message, '', {
    //     duration: 1000
    //   });
    //   this.isLoading = false;
    // });
  

}













@Component({
  selector: 'ms-delet-user-dialog',
  template: `
  <h2 >Delete Lab</h2>
  <md-dialog-content>
   Are you sure you want to delete this lab?
  <br><br>
  </md-dialog-content>
  <md-dialog-actions align="end">
    <button md-raised-button color="accent" (click)="dialogRef.close('Delete!')">Delete</button>
    <button md-button (click)="dialogRef.close('Cancel!')">Cancel</button>
  </md-dialog-actions>
  `
})
export class DeleteLabComponent {
  constructor(public dialogRef: MdDialogRef<DeleteLabComponent>) { }
}
