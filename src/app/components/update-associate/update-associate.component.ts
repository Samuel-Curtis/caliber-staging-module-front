import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssociateService } from 'src/app/services/associate/associate.service';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';
import { UpdateBatchPayload } from '../view-associate/update-batch-payload';

@Component({
  selector: 'app-update-associate',
  templateUrl: './update-associate.component.html',
  styleUrls: ['./update-associate.component.css']
})
export class UpdateAssociateComponent implements OnInit {

  updateForm: FormGroup;
  associateId!: number;
  curBatchId!: number;
  newBatchId!: number;
  statusId!: number;
  curStatusId!: string;
  updatePayload!: UpdateBatchPayload;
  formExists: boolean = true;


  constructor(private modalService: NgbModal, 
              private formBuild: FormBuilder, 
              private assocService: AssociateService, 
              private router: Router, 
              private model: NgbActiveModal,
              private toastService: ToastRelayService) { }

  ngOnInit(): void {
    this.updateForm = this.formBuild.group({
      inputedBatchId: ['', [Validators.required]],
      newStatusId: ['', [Validators.required]]
    })
  }

  /**
   * This is the onSubmit function to update the associate. It calls the assocService updateBatch function to update the associate.
   */
  onSubmit(): void {
    this.newBatchId = this.updateForm.get('inputedBatchId')?.value;
    this.statusId = this.updateForm.get('newStatusId')?.value;
    this.updatePayload = {
      associate_id: this.associateId,
      batch_id: this.newBatchId,
      status_id: this.statusId
    }
    this.assocService.updateBatch(this.updatePayload)
    .subscribe((data: any) => {
      this.toastService.addToast({
        header:'Updating associate!',
        body:data
      })
    });
    setTimeout(() => { this.reloadComponent(); }, 250);
  }


  /**
   * This reloads the component to update the modal.  Then it closes the modal.
   */
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    this.model.close();
  }

}
