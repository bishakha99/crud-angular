import { Routes } from '@angular/router';
import { BankListComponent } from './components/bank-list/bank-list.component';
import { BanksFormComponent } from './components/banks-form/banks-form.component';
import { BranchesFormComponent } from './components/branches-form/branches-form.component';
import {  branchesListComponent } from './components/branches-list/branches-list.component';

export const routes: Routes = [
    {
        path:"",
        component:BankListComponent
        },
        {
            path:"bank-list",
            component:BankListComponent
            },
            {
                path:"create-bank",
                component:BanksFormComponent
                },
                {
                    path:"banks/:id",
                    component:BanksFormComponent
                    },
                    {
                        path:"branches/:id",
                        component:BranchesFormComponent
                        },
                        {
                            path:"create-branches",
                            component:BranchesFormComponent
                            },
                            {
                                path:"branches-list",
                                component:branchesListComponent
                                },

        
];
