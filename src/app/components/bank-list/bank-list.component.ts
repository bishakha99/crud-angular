import { Component, inject } from '@angular/core';
import { IBanks } from '../../interfaces/banks';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { RouterLink ,Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import autoTable from 'jspdf-autotable';


import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-bank-list',
  standalone: true,
  imports: [MatTableModule,MatButton,RouterLink,MatIconModule,MatFormFieldModule, MatInputModule,  MatSortModule, MatPaginatorModule],
  templateUrl: './bank-list.component.html',
  styleUrl: './bank-list.component.css'
})
export class BankListComponent {
  router=inject(Router);
  banksList:IBanks[]=[];
  httpService=inject(HttpService);
  displayedColumns: string[] = ['id', 'ref_code', 'name', 'sort_name','created_At', 'updated_at','action'];
  dataSource!: MatTableDataSource<IBanks>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  

  ngOnInit(){
    this.getBanksFormServer();
  }

  getBanksFormServer(){
    this.httpService.getAllBanks().subscribe((result: IBanks[])=>{
  
      this.banksList = result;
      this.dataSource = new MatTableDataSource(this.banksList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
    edit(id:number){
    console.log(id);
  this.router.navigateByUrl("/banks/"+id);

  }
  
  delete(id:number){
    this.httpService.deleteBanks(id).subscribe(()=>{
      console.log("delete");
      this.getBanksFormServer();
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
fileName = "ExcelSheet.xlsx";
  exportToExcel(){
   let data = document.getElementById("table-data");
   const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb,ws,'sheet1')
   XLSX.writeFile(wb,this.fileName)
  }
  makePDF()
  {
    let pdf = new jsPDF()
    autoTable(pdf,{html:"#table-data",theme:'grid'})
        pdf.save("sample.pdf");
      };
   }
