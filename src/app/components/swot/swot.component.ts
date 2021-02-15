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
  message: string = "";
  descBorder: string = "1px solid";
  nameBorder: string = "1px solid";
  typeBorder: string = "1px solid";

  analysisItems: SwotItem[] = [];

  constructor(
    private swotService: SwotService,
    private loginService: LoginService,
    private modalService: NgbModal,
    private toastService: ToastRelayService
  ) 
  {}

  ngOnInit(): void {
    this.associateId = this.passedId;
    this.isSwotEmpty = this.passedIsEmpty;
    this.getExistedDescription();
  }

  /**
   * This gets all the swots for a specific associate, then adds their description to an array that doesn't appear to be used
   */
  getExistedDescription(){
    this.swotService.getSwotByAssociatedId(this.associateId)
    .subscribe((data: any) => {
      data.forEach((swot)=>{
        this.existedDescription.push(swot.description);
      })
    })
  }

  /**
   * This first checks to see if name and type are blank, if so it highlights their fields in red and shows a message to enter that data
   * If the fields are not blank then it adds the item to the array and calls swotService addSwot to add the swot to the database
   * @param signInForm this is the form with the swot item information
   */
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
      this.swotService.addSwot(this.swotAnalysis)
        .subscribe(data => {
        });
      this.hasData = true;
    }
  }

  /**
   * This deletes the item from the item array in the user's view on delete click(FILTER METHOD)
   * @param item this is the item to be deleteed
   */
  delete(item: SwotItem): void {
    this.analysisItems = this.analysisItems.filter(
      (swotItem) => swotItem !== item
    ); 

    if (this.analysisItems.length == 0) {
      this.hasData = false;
    }
  }

  /**
   * This checks to see if the description is blank, if blank shows a message to enter the description
   * If not blank then it calls the swotService addSwot method to update the Swot in the database.
   * It then closes the modal.
   */
  addSwot(): void{
    if (this.description.length === 0) {
      this.descBorder = "3px solid red";
      this.message = "Please enter SWOT title.";
    } else {
      this.descBorder = "1px solid";
      this.message = "";
      this.swotAnalysis.analysisItems = this.analysisItems;
      this.swotAnalysis.associate = new Associate(this.associateId); 
      this.swotAnalysis.description = this.description;
      this.swotAnalysis.manager = new Manager(Number(sessionStorage.getItem('managerId')));
      this.swotService.addSwot(this.swotAnalysis)
        .subscribe(data => {
          this.toastService.addToast({
            header:`New SWOT created!`, 
            body:`For associate ${this.swotAnalysis.associate.id}`});
         });
      this.modalService.dismissAll();
    }

  }

  /**
   * This is called if the value for description changes and if is not blank, sets the border
   * @param UpdatedValue this is the new value for the description field
   */
  descChange(UpdatedValue : string) :void 
  { 
    if (this.description.length !== 0) {
      this.descBorder = "1px solid";
    };
  } 

  /**
   * This is called if the value for name changes and if is not blank, sets the border
   * @param UpdatedValue this is the new value for the name field
   */
  nameChange(UpdatedValue : string) :void 
  { 
    if (this.name.length !== 0) {
      this.nameBorder = "1px solid";
    };
  } 

  /**
   * This is called if the value for type changes and if is not blank, sets the border
   * @param UpdatedValue this is the new value for the type field
   */
  typeChange(UpdatedValue : string) :void 
  { 
    if (this.type !== "") {
      this.typeBorder = "1px solid";
    };
  } 

}
