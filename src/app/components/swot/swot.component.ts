import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './../../services/login-service/login.service';
import { SwotItem } from './../../models/swot-model/swot-item';
import { Swot } from './../../models/swot-model/swot';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { SwotService } from 'src/app/services/swot/swot.service';
import { idTokenResult } from '@angular/fire/auth-guard';
import { Associate } from 'src/app/models/associate-model/associate.model';
import { Manager } from 'src/app/models/manager-model/manager';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';
// import { ToastrService } from 'ngx-toastr';
// import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-swot',
  templateUrl: './swot.component.html',
  styleUrls: ['./swot.component.css'],
})
export class SwotComponent implements OnInit {
  myImage: string = 'assets/img/swot1.png';
  swotAnalysis = new Swot();
  name : string = "";
  type : string = "";
  note: string = "";
  associateId : number;
  description: string = "";
  i : number = 0;
  hasData : boolean = false;
  existedDescription : string[] = [];
  isSwotEmpty: boolean;
  @Input() passedId: number;
  @Input() passedIsEmpty: boolean;
  //analysisItems: Array<SwotItems>;
  message: string = "";
  descBorder: string = "1px solid";
  nameBorder: string = "1px solid";
  typeBorder: string = "1px solid";

  //initililizes empty array of swot items
  analysisItems: SwotItem[] = [];

  constructor(
    private swotService: SwotService,
    private loginService: LoginService,
    private modalService: NgbModal,
    private toastService: ToastRelayService
  ) // private toastr: NotificationService
  {}
  ngOnInit(): void {
    this.associateId = this.passedId;
    this.isSwotEmpty = this.passedIsEmpty;
    console.log(this.passedIsEmpty);
    
    this.getExistedDescription();
  }

  getExistedDescription(){
    this.swotService.getSwotByAssociatedId(this.associateId)
    .subscribe((data: any) => {
      data.forEach((swot)=>{
        this.existedDescription.push(swot.description);
      })
    })
  }

  //collects data from form and creates item array in the user's view (PUSH METHOD)
  //checks for the name and type to be entered before proceeding with the push
  onSubmit(signInForm: NgForm){
    if (this.name.length === 0) {
      this.nameBorder = "3px solid red";
    } else {
      this.nameBorder = "1px solid";
    }
    if (this.type === "") {
      this.typeBorder = "3px solid red";
    } else {
      this.typeBorder = "1px solid";
    }

    if (this.name.length === 0) {
      this.message = "Please enter SWOT item name.";
    } else if (this.type === "") {
      this.message = "Please select a SWOT type.";
    } else {
      let item : SwotItem = new SwotItem(0, this.name, this.type, this.note, this.associateId);
      this.message = "";
      this.analysisItems.push(item);
      console.log(this.analysisItems);
        this.swotService.addSwot(this.swotAnalysis)
          .subscribe(data => {
            console.log(data);
          });
       this.hasData = true;
    }
  }

  //deletes the item from the item array in the user's view on delete click(FILTER METHOD)
  delete(item: SwotItem): void {
    this.analysisItems = this.analysisItems.filter(
      (swotItem) => swotItem !== item
    ); // this is so the component maintains its own

    if (this.analysisItems.length == 0) {
      this.hasData = false;
    }
  }

  //checks for description to be entered before proceeding with adding the SWOT
  addSwot(): void{
    if (this.description.length === 0) {
      this.descBorder = "3px solid red";
      this.message = "Please enter SWOT title.";
    } else {
      this.descBorder = "1px solid";
      this.message = "";
      this.swotAnalysis.analysisItems = this.analysisItems;
      this.swotAnalysis.associate = new Associate(this.associateId); //associate model constructor needs to be adjusted
      this.swotAnalysis.description = this.description;
      console.log(this.analysisItems)
      console.log(this.swotAnalysis)
      this.swotAnalysis.manager = new Manager(Number(sessionStorage.getItem('managerId')));
      this.swotService.addSwot(this.swotAnalysis)
        .subscribe(data => {
          // alert(`${data.message}`);
          this.toastService.addToast({
            header:`New SWOT created!`, 
            body:`For associate ${this.swotAnalysis.associate.id}`});
         });
      this.modalService.dismissAll();
    }

  }

  descChange(UpdatedValue : string) :void 
  { 
    if (this.description.length !== 0) {
      this.descBorder = "1px solid";
    };
  } 

  nameChange(UpdatedValue : string) :void 
  { 
    if (this.name.length !== 0) {
      this.nameBorder = "1px solid";
    };
  } 

  typeChange(UpdatedValue : string) :void 
  { 
    if (this.type !== "") {
      this.typeBorder = "1px solid";
    };
  } 

}
