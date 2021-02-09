import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Swot } from 'src/app/models/swot-model/swot';
import { SwotItem } from 'src/app/models/swot-model/swot-item';
import { ActivatedRoute } from '@angular/router';
import { SwotService } from 'src/app/services/swot/swot.service';
import { NgForm } from '@angular/forms';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';


@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  swot : Swot = new Swot();
  swotItem : SwotItem = new SwotItem(0,"","","");
  myImage: string = "assets/img/swot1.png";
  @Input() passedSwotItem: SwotItem;
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private swotService: SwotService,
              private modalService: NgbModal,
              private toastService: ToastRelayService) { }

  ngOnInit(): void {
    console.log(this.passedSwotItem, 'update item component');
    this.swotItem = this.passedSwotItem;
  }


  onSubmit(itemForm: NgForm) {
    console.log(itemForm)
    console.log(itemForm.value)
    console.log(this.swotItem)
    
    this.swotService.updateItem(this.swotItem)
      .subscribe(data => {
        // console.log(data);
        // alert("Success! SWOT item has been updated.")
        this.toastService.addToast({
          header:'SWOT item updated',
          body:`Current type: ${this.swotItem.type}`
        })
      });
    this.modalService.dismissAll();
  }

  deleteItem() {
    console.log("Emitting delete from update-comp, swotItemID: " + this.swotItem.id);
    
    this.deleteEmitter.emit(this.swotItem.id);
    this.modalService.dismissAll();
  }

}
