import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IBanks } from './interfaces/banks';
import { Ibranches } from './interfaces/branches';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl="https://localhost:7118";

http=inject(HttpClient);

  constructor() { }
  getAllBanks(){
   return this.http.get<IBanks[]>(this.apiUrl+"/api/Banks");
  }
  createBanks(Banks:IBanks){
    return this.http.post(this.apiUrl+"/api/banks",Banks);
  }

getBanks(banksId:number){
  return this.http.get<IBanks>(this.apiUrl+"/api/Banks/" +banksId);
 }
 updateBanks(banksId:number,banks:IBanks){
  return this.http.put<IBanks>(this.apiUrl+"/api/Banks/" +banksId,banks);
 }
 deleteBanks(banksId:number){
  return this.http.delete<IBanks>(this.apiUrl+"/api/Banks/" +banksId);
 }
 getAllbranches(){
  return this.http.get<[Ibranches]>(this.apiUrl+"/api/branches");
 }
 createbranches(branches: Ibranches) {
  return this.http.post(this.apiUrl + "/api/branches", branches);
}

Getbranches(branchesId: number) {
  return this.http.get<Ibranches>(this.apiUrl + "/api/branches/" + branchesId);
}

updateBranches(branchesId: number, branches: Ibranches) {
  return this.http.put<Ibranches[]>(this.apiUrl + "/api/branches/" + branchesId, branches);
}
Deletebranches(branchesId: number) {
  return this.http.delete(this.apiUrl + "/api/branches/" + branchesId);
}
}



