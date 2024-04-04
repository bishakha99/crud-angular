import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Ibranches } from '../../interfaces/branches';
import { IBanks } from '../../interfaces/banks';

@Component({
  selector: 'app-branches-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './branches-form.component.html',
  styleUrl: './branches-form.component.css'
})
export class BranchesFormComponent {

  formBuilder=inject(FormBuilder);
  HttpService = inject(HttpService);
  router= inject(Router);
  route = inject (ActivatedRoute);
  banks: IBanks [] =[];
  branchesFrom = this.formBuilder.group({

    ref_code: [''],
    name: ['', [Validators.required, Validators.pattern("[a-zA-Z].*")]],
    short_name: [''],
    ifsc: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.pattern("[a-zA-Z].*")]],
    bank_id: [0, [Validators.required]]
  });

  branchesId!: number;
  isEdit=false;
  
 

  ngOnInit(){
    this.branchesId=this.route.snapshot.params['id'];
    if(this.branchesId){
      this.isEdit=true;
      this.HttpService.Getbranches(this.branchesId).subscribe(result=>{
        console.log(result);
        this.branchesFrom.patchValue(result);
      })
    }

    this.HttpService.getAllBanks().subscribe(banks=>{
      this.banks = banks;
    });
  }
  cancel() {
    this.router.navigate(['/branches-list']); // Assuming '/' is the route for your form
  }

  save(){
    console.log(this.branchesFrom.value);
    const branches: Ibranches = {
      ref_code: this.branchesFrom.value.ref_code!,
      name: this.branchesFrom.value.name!,
      address: this.branchesFrom.value.address!,
      short_name: this.branchesFrom.value.short_name!,
      
      ifsc: this.branchesFrom.value.ifsc!,
      bank_id: this.branchesFrom.value.bank_id!,
      updated_at: new Date(),  // Always set updated_at to the current time
      
      // Set created_at only if it's a new record
      created_at: this.isEdit ? undefined : new Date(),
    }

    if (this.isEdit) {
      if (this.branchesFrom.valid) {
        this.HttpService.updateBranches(this.branchesId, branches).subscribe(() => {
          console.log("Success");
          this.router.navigateByUrl("/branches-list");
        });
      } else {
        alert("Please fill the required fields and use only characters.");
      }
    } else {
      if (this.branchesFrom.valid) {
        this.HttpService.createbranches(branches).subscribe(() => {
          console.log("Success");
          this.router.navigateByUrl("/branches-list");
        });
      } else {
        alert("Please fill the required fields and use only characters.");
      }
    }
  }


}
