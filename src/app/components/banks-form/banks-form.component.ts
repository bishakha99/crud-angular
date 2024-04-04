import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IBanks } from '../../interfaces/banks';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banks-form',
  standalone: true,
  imports: [MatInputModule,MatButton,FormsModule,ReactiveFormsModule,ToastrModule],
  templateUrl: './banks-form.component.html',
  styleUrl: './banks-form.component.css'
})
export class BanksFormComponent {
  toastr=inject(ToastrService);
  formBuilder=inject(FormBuilder);
  httpService=inject(HttpService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  BanksForm=this.formBuilder.group({
    
    ref_code:['',[Validators.required]],
    name:['',[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
    sort_name:['',[Validators.required,Validators.pattern("[a-zA-Z].*")]],

   
   
    
  });
  banksId!:number;
  isEdit= false;
  ngOnInit(){
this.banksId=this.route.snapshot.params['id'];
if(this.banksId){
  this.isEdit = true;
  this.httpService.getBanks(this.banksId).subscribe(result=>{
    console.log(result);
    this.BanksForm.patchValue(result);
  })
}
  }
  cancel() {
    this.router.navigate(['/']); // Assuming '/' is the route for your form
  }
  
  save() {
    console.log(this.BanksForm.value);
    const banks: IBanks = {
      ref_code: this.BanksForm.value.ref_code!,
      name: this.BanksForm.value.name!,
      sort_name: this.BanksForm.value.sort_name!,
   
      updated_at: new Date(),  // Always set updated_at to the current time
      
      // Set created_at only if it's a new record
      created_At: this.isEdit ? undefined : new Date(),
      


    }
    if (this.isEdit) {
      if (this.BanksForm.valid) {
        this.httpService.updateBanks(this.banksId, banks).subscribe(() => {
   
          this.toastr.success("saved","sucess",{
            timeOut: 5000, // duration in milliseconds
            
            positionClass: 'toast-top-right', // position of the toast message
            toastClass: 'toast-success' // CSS class for success toast
          });
          // this.BanksForm.reset();

          

          // console.log("Success");
          this.router.navigateByUrl("/bank-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }
    } else {
      if (this.BanksForm.valid) {
        this.httpService.createBanks(banks).subscribe(() => {
          this.toastr.success ('successful','saved',{
            timeOut: 5000, // duration in milliseconds
            
            positionClass: 'toast-top-right',// position of the toast message
            toastClass: 'toast-success' // CSS class for success toast
          });
          
          // console.log("Success");

          this.router.navigateByUrl("/bank-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }

    }

  }

}
