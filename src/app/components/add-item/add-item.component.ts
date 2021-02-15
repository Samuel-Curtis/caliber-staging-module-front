import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwotService } from 'src/app/services/swot/swot.service';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Swot } from 'src/app/models/swot-model/swot';
import { SwotItem } from 'src/app/models/swot-model/swot-item';
import { NgForm } from '@angular/forms';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';

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

  constructor(
    private swotService : SwotService, 
    private modalService: NgbModal,
    private toastService: ToastRelayService) { }

  ngOnInit(): void {
    this.swotItem = new SwotItem(0, "", this.type, "", this.parentSwot.id);
  }

  /**
   * This checks that the form is not blank so that every item has a name
   */
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

  /**
   * This is called whenever the form is submitted. If the form data is valid it POSTs the information to the server to add the item to the database.
   * 
   * @param itemForm 
   */
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
        // alert("Success! New SWOT item has been added.")
        this.toastService.addToast({
          header:'New SWOT item added!',
          body:`${this.swotItem.type}`
        });
      });
      this.modalService.dismissAll();
  }

}
