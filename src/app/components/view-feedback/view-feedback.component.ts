import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { Feedback } from 'src/app/models/feedback-model/feedback.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';
import { AddFeedbackComponent } from 'src/app/components/add-feedback/add-feedback.component';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';
import { UpdateFeedbackComponent } from '../update-feedback/update-feedback.component';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent implements OnInit {

  feedbackArray: Feedback[] = [];
  feedbackItem: Feedback;
  currentFeedback: Feedback;
  formIncomplete = true;
  finalCheck = false;
  contentInput = '1px solid #ced4da';
  associateId: number;

  constructor(private feedbackService: FeedbackService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toastService: ToastRelayService) { }

  ngOnInit(): void {
    this.pullFeedbackData();
  }

  pullFeedbackData() {
    this.associateId = +this.route.snapshot.paramMap.get('associateId')!.valueOf();
    this.feedbackService.getFeedbackByAssociateId(this.associateId)
      .subscribe((data: any) => {
        this.feedbackArray = data;
      })
  }

  //This method requires implementation of deleteFeedback method in the 
  //feedback Service

  delete(feedbackId: number) {
    this.feedbackService.deleteFeedback(feedbackId)
      .subscribe(data => {
        this.toastService.addToast({
          header: 'Feedback removed!',
          body: "Feedback was succesfully!"
        });
      })
    this.feedbackArray = this.feedbackArray.filter(feedback => feedback.id != feedbackId);

  }

  open() {
    const modalRef = this.modalService.open(AddFeedbackComponent);
    modalRef.componentInstance.passedId = this.associateId;
    modalRef.componentInstance.updateEmitter.subscribe(this.pullFeedbackData.bind(this));
  }

  

  // Opens Update as a modal page.
  openUpdatePage(feedback: Feedback) {
    // swotItem.swotAnalysisId = swotAnalysisId;
    const modalRef = this.modalService.open(UpdateFeedbackComponent);
    modalRef.componentInstance.name = 'UpdateFeedback';
    modalRef.componentInstance.passedFeedback = feedback;
    modalRef.componentInstance.passedAssociateId = this.associateId;
  }
}
