import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssociateService } from 'src/app/services/associate/associate.service';
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


  constructor(private modalService: NgbModal, private formBuild: FormBuilder, private assocService: AssociateService) { }

  ngOnInit(): void {
    this.updateForm = this.formBuild.group({
      inputedBatchId: ['', [Validators.required]],
      newStatusId: ['', [Validators.required]]
    })
  }

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
    });
    location.reload();
  }

}
