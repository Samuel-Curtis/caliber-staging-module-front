import { UpdateItemComponent } from './../update-item/update-item.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SwotItem } from './../../models/swot-model/swot-item';
import { SwotService } from 'src/app/services/swot/swot.service';
import { Component, OnInit } from '@angular/core';
import { Swot } from 'src/app/models/swot-model/swot';
import { Router, ActivatedRoute } from '@angular/router';
import { AddItemComponent } from '../add-item/add-item.component';


@Component({
  selector: 'app-view-swot',
  templateUrl: './view-swot.component.html',
  styleUrls: ['./view-swot.component.css']
})
export class ViewSwotComponent implements OnInit {

  swotAnalyses : Swot[] = [];
  index : number = 0;
  currentSwotAnalysis : Swot;

  constructor(private swotService : SwotService, 
              private router : Router,
              private modalService : NgbModal,
              private route : ActivatedRoute) { 

              }
  

  ngOnInit(): void {
    this.pullSwotData();

  }

  // Opens Update as a modal page.
  openUpdatePage(swotItem: SwotItem, swotAnalysisId: number){
    swotItem.swotAnalysisId = swotAnalysisId;
    const modalRef = this.modalService.open(UpdateItemComponent);
    modalRef.componentInstance.name = 'UpdateSwot';
    modalRef.componentInstance.passedSwotItem = swotItem;
  }

  delete(swotItemId : number){
    this.swotService.deleteItem(swotItemId)
      .subscribe((data:any)=>{
        console.log(data);
        alert(`${data.message}`);
      })
    this.currentSwotAnalysis.analysisItems = this.currentSwotAnalysis.analysisItems.filter(swotItem => swotItem.id != swotItemId);
  }

  pullSwotData(){
    const associateId = +this.route.snapshot.paramMap.get('associateId')!.valueOf();
    console.log(associateId)
    this.swotService.getSwotByAssociatedId(associateId)

    .subscribe((data:any)=>{
      console.log(data);

      this.swotAnalyses = data;
    })
  }

  pullSwotData2(){
    // const associateId = +this.route.snapshot.paramMap.get('associateId')!.valueOf();
    // console.log(associateId)
    // this.swotService.getSwotByAssociatedId(associateId)
    // this.swotService.

    // .subscribe((data:any)=>{
    //   console.log(data);

    //   this.swotAnalyses = data;
    // })
  }

  addItem(){
    const options : NgbModalOptions = {
      beforeDismiss: () => {
        this.pullSwotData();
        this.currentSwotAnalysis = null;

        return true;
      }
    }
    

    // this.currentSwotAnalysis.analysisItems.push()
    const modalRef = this.modalService.open(AddItemComponent, options);
    
    modalRef.componentInstance.name = 'AddItem';
    modalRef.componentInstance.parentSwot = this.currentSwotAnalysis;
    // this.pullSwotData();
  }

}
