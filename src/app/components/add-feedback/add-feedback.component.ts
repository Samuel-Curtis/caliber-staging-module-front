import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Feedback } from 'src/app/models/feedback-model/feedback.model';
import { NgForm } from '@angular/forms';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {

  feedback: Feedback;
  formIncomplete = true;
  finalCheck = false;
  contentInput = '1px solid #ced4da';
  associateId: number;
  managerId: number;
  content: string = "";

  @Input() passedId: number;
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  message: string = "";
  descBorder: string = "1px solid";
  nameBorder: string = "1px solid";
  typeBorder: string = "1px solid";

  constructor(
    private feedbackService: FeedbackService,
    private modalService: NgbModal,
    private toastService: ToastRelayService
  ) { }
  
  /**
   * This retrieves the associate ID and the manager ID 
   * that will be passed over to the Add Feedback Form
   */
  ngOnInit(): void {
    this.associateId = this.passedId;
    this.managerId = parseInt(sessionStorage.getItem('managerId'));
  }

  /**
   * This submits the Feedback form 
   * and creates a new Feedback in the database
   * for the current Manager and the current Associate
   */
  onSubmit(itemForm: NgForm) {

    if (this.formIncomplete == true) {
      this.finalCheck = true;
      
      //change border to red if formIncomplete is true.
      this.nameBorder = "2px solid red";

    //If formIncomplete is false, allow processing of feedback.
    } else {
      this.feedback = new Feedback(0, this.managerId, this.content, this.associateId);
      this.feedbackService.addFeedback(this.feedback)
        .subscribe(data => {
          this.toastService.addToast({
            header: 'New feedback added!',
            body: `${this.feedback.content}`
          });
          this.updateEmitter.emit();
        });
      this.modalService.dismissAll();
    }
  }

  /**
   * This validates the 'content' field of the Feedback form
   * (makes sure some content is entered into the form)
   */
  contentChange(UpdatedValue: string): void {
    if (this.content.length !== 0) {
      this.nameBorder = "1px solid";

      // updated formIncomplete if length > 0
      this.formIncomplete = false;
    } else {
      // Change formIncomplete to true if length returns to 0
      this.formIncomplete = true;
    }
  }
}