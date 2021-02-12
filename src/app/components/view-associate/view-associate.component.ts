import { LoginService } from './../../services/login-service/login.service';
import { Associate } from './../../models/associate-model/associate.model';
import { SwotComponent } from './../swot/swot.component';
import { AssociateService } from '../../services/associate/associate.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { UpdateBatchPayload } from './update-batch-payload';
import { UpdateAssociateComponent } from '../update-associate/update-associate.component';
import { SwotService } from 'src/app/services/swot/swot.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-associate',
  templateUrl: './view-associate.component.html',
  styleUrls: ['./view-associate.component.css']
})
export class ViewAssociateComponent implements OnInit {

  associates: Associate[]; 
  newAssociates: Associate[];
  //filteredAssociates: Associate[];
  private associateSubject: BehaviorSubject<Associate>;
  public associate: Observable<Associate>;
  public updatePayload!: UpdateBatchPayload;
  public counter: number;

  activeId: number;
  managerId: number;
  @Input() batchId: number;
  @Input() statusId: number;

  associateFilter = "";

  private toggle = true;

  constructor(private service: AssociateService, 
              private modalService: NgbModal, 
              private changeDetect: ChangeDetectorRef,
              private swotService: SwotService,
              private router: Router) {
    this.associateSubject = new BehaviorSubject<Associate>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.associate = this.associateSubject.asObservable();
  }

  ngOnInit(): void {
    this.managerId = parseInt(sessionStorage.getItem('managerId'));
    this.getAllAssociates(this.managerId);
    this.counter = 0;
  }

  get assocFilter():string{
    return this.associateFilter;
  }

  set assocFilter(temp:string){
    this.associateFilter = temp;
  }

  getFilteredAssociates():Associate[] {
    if(this.associateFilter) {
      return this.performFilter(this.associateFilter);
    } else {
      return this.associates;
    }
  }

  performFilter(filterBy:string): Associate[]{
    filterBy = filterBy.toLowerCase();
    return this.associates.filter((assoc:Associate) => 
      (assoc.firstName.toLowerCase().indexOf(filterBy) != -1) ||
      (assoc.firstName.toLowerCase().indexOf(filterBy) != -1) ||
      (assoc.email.toLowerCase().indexOf(filterBy) != -1) ||
      (assoc.status.toLowerCase().indexOf(filterBy) != -1) ||
      (assoc.batch.toString().indexOf(filterBy) != -1) || 
      (assoc.id.toString().indexOf(filterBy) != -1) ||
      (assoc.salesforceId.toString().toLowerCase().indexOf(filterBy) != -1)
    );
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

  checkSwotsValid(): void {
    console.log(`Checking swots for user: ${this.activeId}`);

    this.swotService.getSwotByAssociatedId(this.activeId)
      .subscribe((data: any[]) => {
        console.log(`data length: ${data.length}`);
        
        if(data.length === 0) {
          this.open();
        } else {
          this.router.navigate([`/view/${this.activeId}`]);
        }
      })
      
      
  }

}
