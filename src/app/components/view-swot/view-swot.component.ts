import { UpdateItemComponent } from './../update-item/update-item.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SwotItem } from './../../models/swot-model/swot-item';
import { SwotService } from 'src/app/services/swot/swot.service';
import { Component, OnInit } from '@angular/core';
import { Swot } from 'src/app/models/swot-model/swot';
import { Router, ActivatedRoute } from '@angular/router';
import { AddItemComponent } from '../add-item/add-item.component';
import { UpdateSwotComponent } from '../update-swot/update-swot.component';
import { NgForm } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';

@Component({
  selector: 'app-view-swot',
  templateUrl: './view-swot.component.html',
  styleUrls: ['./view-swot.component.css']
})
export class ViewSwotComponent implements OnInit {

  swotAnalyses: Swot[] = [];
  index: number = 0;
  currentSwotAnalysis: Swot;
  type: string = "";
  currentStrengths: SwotItem[] = [];
  currentWeak: SwotItem[] = [];
  currentOpp: SwotItem[] = [];
  currentThreat: SwotItem[] = [];
  activeSwotIndex: number;

  constructor(private swotService: SwotService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toastService: ToastRelayService) {

        
  }


  ngOnInit(): void {
    this.activeSwotIndex = 0;
    this.pullSwotData();
    
  }

  // Opens Update as a modal page.
  openUpdatePage(swotItem: SwotItem, swotAnalysisId: number) {
    swotItem.swotAnalysisId = swotAnalysisId;
    const modalRef = this.modalService.open(UpdateItemComponent);
    modalRef.componentInstance.name = 'UpdateSwot';
    modalRef.componentInstance.passedSwotItem = swotItem;
    modalRef.componentInstance.deleteEmitter.subscribe(this.delete.bind(this));
    
  }

  delete(swotItemId: number) {
    console.log("Deleting from view-Swot, ID: " + swotItemId);
    
    this.swotService.deleteItem(swotItemId)
      .subscribe((data: any) => {

        console.log(data);
        alert(`${data.message}`);
        this.toastService.addToast({
          header:"SWOT item deleted!",
          body:`SWOT Item ID: ${swotItemId}`
        });
        this.pullSwotData();

      })
      this.currentSwotAnalysis.analysisItems = this.currentSwotAnalysis.analysisItems.filter(swotItem => swotItem.id != swotItemId);
  }

  pullSwotData() {
    const associateId = +this.route.snapshot.paramMap.get('associateId')!.valueOf();
    console.log(associateId)
    this.swotService.getSwotByAssociatedId(associateId)

      .subscribe((data: any) => {
        console.log(data);
        this.currentStrengths = [];
        this.currentWeak = [];
        this.currentOpp = [];
        this.currentThreat = [];
        this.swotAnalyses = data;
        this.currentSwotAnalysis = this.swotAnalyses[this.activeSwotIndex]
        for (let temp of this.currentSwotAnalysis.analysisItems) {
          if (temp.type === 'STRENGTH') {
            this.currentStrengths.push(temp);
          } else if (temp.type === 'WEAKNESS') {
            this.currentWeak.push(temp);
          } else if (temp.type === 'OPPORTUNITY') {
            this.currentOpp.push(temp);
          } else {
            this.currentThreat.push(temp);
          }
        }
      })
  }

  addItemStrength() {
    const options: NgbModalOptions = {
      beforeDismiss: () => {
        for (var i = 0; i < this.swotAnalyses.length; i++) {
          if (this.currentSwotAnalysis == this.swotAnalyses[i]) {
            this.activeSwotIndex = i;
          }
        }
        this.pullSwotData();
        return true;
      }
    }
    this.type = "STRENGTH";

    const modalRef = this.modalService.open(AddItemComponent, options);

    modalRef.componentInstance.name = 'AddItem';
    modalRef.componentInstance.parentSwot = this.currentSwotAnalysis;
    modalRef.componentInstance.type = this.type;
  }

  addItemWeak() {
    const options: NgbModalOptions = {
      beforeDismiss: () => {
        for (var i = 0; i < this.swotAnalyses.length; i++) {
          if (this.currentSwotAnalysis == this.swotAnalyses[i]) {
            this.activeSwotIndex = i;
          }
        }
        this.pullSwotData();
        return true;
      }
    }
    this.type = "WEAKNESS";

    const modalRef = this.modalService.open(AddItemComponent, options);

    modalRef.componentInstance.name = 'AddItem';
    modalRef.componentInstance.parentSwot = this.currentSwotAnalysis;
    modalRef.componentInstance.type = this.type;
  }

  addItemOpp() {
    const options: NgbModalOptions = {
      beforeDismiss: () => {
        for (var i = 0; i < this.swotAnalyses.length; i++) {
          if (this.currentSwotAnalysis == this.swotAnalyses[i]) {
            this.activeSwotIndex = i;
          }
        }
        this.pullSwotData();
        return true;
      }
    }
    this.type = "OPPORTUNITY";

    const modalRef = this.modalService.open(AddItemComponent, options);

    modalRef.componentInstance.name = 'AddItem';
    modalRef.componentInstance.parentSwot = this.currentSwotAnalysis;
    modalRef.componentInstance.type = this.type;
  }

  addItemThreat() {
    const options: NgbModalOptions = {
      beforeDismiss: () => {
        for (var i = 0; i < this.swotAnalyses.length; i++) {
          if (this.currentSwotAnalysis == this.swotAnalyses[i]) {
            this.activeSwotIndex = i;
          }
        }
        this.pullSwotData();
        return true;
      }
    }
    this.type = "THREAT";

    const modalRef = this.modalService.open(AddItemComponent, options);

    modalRef.componentInstance.name = 'AddItem';
    modalRef.componentInstance.parentSwot = this.currentSwotAnalysis;
    modalRef.componentInstance.type = this.type;
  }

/**
 * This displays the modal to update the description of a swot
 */
  changeDescription(){
    const modalRef = this.modalService.open(UpdateSwotComponent);
    modalRef.componentInstance.parentSwot = this.currentSwotAnalysis;
  }

}
