import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback-model/feedback.model';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-feedback',
  templateUrl: './update-feedback.component.html',
  styleUrls: ['./update-feedback.component.css']
})
export class UpdateFeedbackComponent implements OnInit {

  feedbackItem: Feedback = new Feedback(0, 0, "", 0);
  @Input() passedFeedback: Feedback;
  @Input() passedAssociateId: number;

  constructor(private feedbackService: FeedbackService,
              private toastService: ToastRelayService,
              private modalService: NgbModal) {

     }

  nameBorder: string = "1px solid";

  ngOnInit(): void {
    
    this.feedbackItem = this.passedFeedback;
  }

  contentChange(UpdatedValue : string) :void 
  { 
    if (this.feedbackItem.content.length !== 0) {
      this.nameBorder = "1px solid";
    };
  }

  onSubmit(feedbackForm: NgForm) {
    
    this.feedbackItem.associateId = this.passedAssociateId;

    this.feedbackService.updateFeedback(this.feedbackItem)
      .subscribe((data) => {
        this.toastService.addToast({
          header:'Feedback Item Updated',
          body:`Current Feedback Content: ${this.feedbackItem.content}`
        })
      });
      this.modalService.dismissAll();
    
  }


}
