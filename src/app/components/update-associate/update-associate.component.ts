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

  //Bandaid fix. TODO Refactor of update-associate component necessary.
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
      console.log(data);
      this.toastService.addToast({
        header:'Updating associate!',
        body:data
      })
    });
    setTimeout(() => { this.reloadComponent(); }, 250);
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    this.model.close();
  }

}
