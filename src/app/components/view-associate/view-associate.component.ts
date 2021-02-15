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
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';
import { Swot } from 'src/app/models/swot-model/swot';

@Component({
  selector: 'app-view-associate',
  templateUrl: './view-associate.component.html',
  styleUrls: ['./view-associate.component.css']
})
export class ViewAssociateComponent implements OnInit {

  associates: Associate[]; 
  newAssociates: Associate[];
  swotIsEmpty: boolean;
  //filteredAssociates: Associate[];
  private associateSubject: BehaviorSubject<Associate>;
  public associate: Observable<Associate>;
  public updatePayload!: UpdateBatchPayload;
  public counter: number;
  public counter1: number = 0;

  activeId: number;
  //managerId: BehaviorSubject<number> = new BehaviorSubject(0);
  managerId: number;
  @Input() batchId: number;
  @Input() statusId: number;

  associateFilter = "";
  swotAnalyses: Swot[];

  private toggle = true;

  constructor(private service: AssociateService, 
              private modalService: NgbModal, 
              private changeDetect: ChangeDetectorRef,
              private swotService: SwotService,
              private router: Router,
              private toastService: ToastRelayService) {
    this.associateSubject = new BehaviorSubject<Associate>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.associate = this.associateSubject.asObservable();
  }
  
  get assocFilter():string{
    return this.associateFilter;
  }

  set assocFilter(temp:string){
    this.associateFilter = temp;
  }

  /**
   * This initializes the page with the list of all associates relative to a manager
   */
  ngOnInit(): void {
    this.managerId = parseInt(sessionStorage.getItem('managerId'));
    if(isNaN(this.managerId))
    {
      console.log(this.managerId);
      this.router.navigate(['/login']);
    }
    
    this.getAllAssociates(this.managerId);
    this.counter = 0;
    this.swotIsEmpty = false;
  }


  /**
   * This method returns the list of associates filtered by the user input
   * If no filter, returns the list of associates
   */
  getFilteredAssociates():Associate[] {
    if(this.associateFilter) {
      return this.performFilter(this.associateFilter);
    } else {
      return this.associates;
    }
  }

  /**
   * This methods filters the associates by the input the user enters
   * @param filterBy is the input entered by the user
   */
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

  /**
   * This method toggles the view button from View All to View New 
   * in regards to associates
   */
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

  /**
   * This opens up a modal page in order to add a new SWOT
   */
  open() {
    const modalRef = this.modalService.open(SwotComponent);
    console.log(this.activeId);
    modalRef.componentInstance.passedId = this.activeId;
    //modalRef.componentInstance.passedIsEmpty = this.swotIsEmpty;
  }

  /**
   * This method gets all the associates relative to a manager
   * @param id is the id of the manager
   */
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

    /**
     * This method gets all the new associates relative to a manager
     * @param id is the id of the manager 
     */
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

  /**
   * This opens up a modal page in order to update a batch
   */
  updateBatch(): void {
    const modalRef = this.modalService.open(UpdateAssociateComponent);
    modalRef.componentInstance.associateId = this.activeId;
    modalRef.componentInstance.curBatchId = this.batchId;
    modalRef.componentInstance.curStatusId = this.statusId;
  }

  /**
   * This method checks if a SWOT is available to view for an associate,
   * otherwise prompts the user to create a SWOT for said associate
   */
  checkSwotsValid(): void {
    console.log(`Checking swots for user: ${this.activeId}`);

    this.swotService.getSwotByAssociatedId(this.activeId)
      .subscribe((data: any[]) => {
        console.log(`data length: ${data.length}`);
        
        if(data.length === 0) {
          this.toastService.addToast({
            header:'No SWOTs exist yet',
            body: 'Please create a SWOT first'
          });
          this.swotIsEmpty = true;
          this.open();
          this.swotIsEmpty = false;
        } else {
          this.router.navigate([`/view/${this.activeId}`]);
        }
      })
  }

    getSwotsByAssociate(associateId: string) {
      this.swotService.getSwotByAssociatedId(Number.parseInt(associateId))
      .subscribe((data: any) => {
        console.log(data);
        this.swotAnalyses = data;
    })
  }

}
