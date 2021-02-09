import { LoginService } from './../../services/login-service/login.service';
import { Associate } from './../../models/associate-model/associate.model';
import { SwotComponent } from './../swot/swot.component';
import { AssociateService } from '../../services/associate/associate.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { UpdateBatchPayload } from './update-batch-payload';
import { UpdateAssociateComponent } from '../update-associate/update-associate.component';


@Component({
  selector: 'app-view-associate',
  templateUrl: './view-associate.component.html',
  styleUrls: ['./view-associate.component.css']
})
export class ViewAssociateComponent implements OnInit {

  associates: Associate[];
  newAssociates: Associate[];
  private associateSubject: BehaviorSubject<Associate>;
  public associate: Observable<Associate>;
  public updatePayload!: UpdateBatchPayload;
  public counter: number;

  activeId: number;
  managerId: number;
  batchId: number;
  statusId: number;

  private toggle = true;

  constructor(private service: AssociateService, 
              private modalService: NgbModal, 
              private changeDetect: ChangeDetectorRef) {
    this.associateSubject = new BehaviorSubject<Associate>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.associate = this.associateSubject.asObservable();
  }

  ngOnInit(): void {
    this.managerId = parseInt(sessionStorage.getItem('managerId'));
    this.getAllAssociates(this.managerId);
    this.counter = 0;
  }

  public toggleAssociateView() {

    const button = document.getElementById('associate-btn');
    button.innerHTML = '';

    if (this.toggle) {
      this.toggle = false;
      button.innerHTML = 'View All';
      this.getAllNewAssociates(this.managerId);
    } else {
      this.toggle = true;
      button.innerHTML = 'View New';
      this.getAllAssociates(this.managerId);
    }
  }

  public trackItem(index: number, item: Associate ) {
    return `${item.id}-${index}`;
  }

  public get associateValue(): Associate {
    return this.associateSubject.value;
  }

  open() {
    const modalRef = this.modalService.open(SwotComponent);
    console.log(this.activeId);
    modalRef.componentInstance.passedId = this.activeId;
  }

  public getAllAssociates(id: number): void {
    this.service.getAllAssociates(id)
    .subscribe(
      data => {
        console.log(data);
        this.associates = data;
        this.changeDetect.detectChanges();
        console.log(this.associates);
      }
      );
    this.associates = this.newAssociates;
      // change to appropriate title
    const title = document.getElementById('users-list');
    title.innerHTML = '';
    title.innerHTML = 'View All Associates';
    }

  public getAllNewAssociates(id: number): void {
    this.service.getAllNewAssociates(id)
    .subscribe(
      data => {
        this.associates = data;
        this.changeDetect.detectChanges();
      }
    );
     // change to appropriate title
    const title = document.getElementById('users-list');
    title.innerHTML = '';
    title.innerHTML = 'View New Associates';
  }

  updateBatch(): void {
    const modalRef = this.modalService.open(UpdateAssociateComponent);
    modalRef.componentInstance.associateId = this.activeId;
    modalRef.componentInstance.curBatchId = this.batchId;
    modalRef.componentInstance.curStatusId = this.statusId;
  }
}
