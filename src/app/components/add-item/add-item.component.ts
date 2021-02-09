import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwotService } from 'src/app/services/swot/swot.service';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Swot } from 'src/app/models/swot-model/swot';
import { SwotItem } from 'src/app/models/swot-model/swot-item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit{

  swotItem : SwotItem;
  @Input() parentSwot : Swot;
  @Input() type : string;
  formIncomplete = true;
  finalCheck = false;
  nameInput = '1px solid #ced4da';

  constructor(private swotService : SwotService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.swotItem = new SwotItem(0, "", this.type, "", this.parentSwot.id);
  }

  modelChange(): void {
    if(!(this.swotItem.name.length === 0)){
      this.formIncomplete = false;

    }
    else{
      this.formIncomplete = true;
    }

    if(this.swotItem.name.length !== 0){
      this.nameInput = '1px solid #ced4da';
    }
 
  }



  onSubmit(itemForm: NgForm) {
    if(this.formIncomplete == true){
      this.finalCheck = true;
      if(this.swotItem.name.length === 0){
        this.nameInput = '2px solid red';
      }
      else{
        this.nameInput = '1px solid #ced4da';
      }
      return;
    }
    this.swotService.addItem(this.swotItem)
      .subscribe(data => {
        alert("Success! New SWOT item has been added.")
      });
      this.modalService.dismissAll();
  }

}
