import { Component, inject } from '@angular/core';

import { HttpService } from '../../http.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {  ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Ibranches } from '../../interfaces/branches';
import autoTable from 'jspdf-autotable';


import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-branches-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink, MatIconModule, MatInputModule, MatFormFieldModule, MatSortModule, MatPaginatorModule],
  templateUrl: './branches-list.component.html',
  styleUrl: './branches-list.component.css'
})
export class branchesListComponent {
  branchesList: Ibranches[] = [];
  httpService = inject(HttpService);
  router = inject(Router);
  displayedColumns: string[] = ['id', 'ref_code', 'name', 'bank_id','short_name', 'address', 'ifsc', 'created_at', 'updated_at', 'action'];
  dataSource!: MatTableDataSource<Ibranches>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit() {
    this.getbranchesFormServer();
  }

  getbranchesFormServer() {
    this.httpService.getAllbranches().subscribe((result: Ibranches[]) => {

      this.branchesList = result;
      this.dataSource = new MatTableDataSource(this.branchesList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl("/branches/" + id);

  }
  delete(id: number) {
    this.httpService.Deletebranches(id).subscribe(() => {
      console.log("Deleted");
      // this.banksList = this.banksList.filter(x => x.id != id);
      this.getbranchesFormServer();
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
 



