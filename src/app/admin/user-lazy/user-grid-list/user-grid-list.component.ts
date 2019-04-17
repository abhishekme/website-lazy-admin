
import { Component, ElementRef, OnInit, ViewContainerRef, Pipe, AfterViewInit,
  Input, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { UserServiceService } from '../../services/user/user-service.service';

import { PagerService } from '../../services/paging/pager.service';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Path } from '../../services/config/path';
import { User } from '../../models/user/user';

import { UserEditComponent } from '../user-edit/user-edit.component';
// import { AlertMessages } from '../../services/messages/alert-messages';

import { AlertService, AlertMessage } from '../../services/messages/alert.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user-grid-list',
  templateUrl: './user-grid-list.component.html',
  styleUrls: ['./user-grid-list.component.css'],
  providers: [UserServiceService, PagerService, AlertService, FlashMessagesService, UserEditComponent]
})
export class UserGridListComponent implements OnInit {

  path: Path;
  // _alertMesg: AlertMessages;
  objAlert: AlertMessage;
  userModel: User;
  public listData: any = [];
  public gridData: any = [];

  public totalData: any;
  public adminLimit: number;
  public pageNum: number;
  public totalPages: number;
  public limitNum: number;
  public srchKey: any;
  public totalRec: any;
  public sortByField: string;
  public sortByDir: string;

  public sortKey: any = [];

  imagePath: string;

  public pagedItems: any;
  public pagedGItems: any;
  public messageShow: any;

  public customMesg: string;
  private respData: any;
  public messageStatus: boolean;

  public viewContainerRef: ViewContainerRef;
  thisMesg: any;
  public mode:string = '';

  //@ViewChild(ChildComponent) child;

  constructor(private service: UserServiceService,
              private objPager: PagerService,
              private flashMessage: FlashMessagesService,
              private route: ActivatedRoute,
              private _router: Router,
              private elRef: ElementRef,
              viewContainerRef: ViewContainerRef,
              private compEdit: UserEditComponent,
              private alertService: AlertService,
              private _notificationservices: NotificationsService
              ) {
      this.userModel = new User();
      this.path   = new Path();
      // this._alertMesg = new AlertMessages();
      this.imagePath  = this.path.API_IMAGE_PATH;
      this.pageNum = 1;
      this.limitNum = 4;

      this.sortKey = 'first_name';

      this.sortByField = 'first_name';
      this.sortByDir = 'asc';
      this.pagedItems   = [];
      this.pagedGItems = [];
      this.messageStatus = false;

      this.viewContainerRef = viewContainerRef;

      }

  ngOnInit() {

      let editPage = 0, srchKey = '';
      this.route.params.subscribe(params => {
       editPage = +params['page']; // (+) conv string to number
       srchKey  = this.route.snapshot.params['srchkey'];

       if (editPage != undefined && editPage > 0){
          this.pageNum = editPage;
       }if (srchKey != undefined && srchKey != ''){
          this.srchKey = srchKey;
       }
       //alert('...'+this.flashMessageData.alertMessages);
       //alert('@ '+alert(this.path.getMessage()));
      //Init List Data


      this.getTotalData(this.srchKey);
      this.getListData(this.pageNum, this.limitNum, this.srchKey, '');
    });
    }

    getTotalData(srchKey){
      this.service.adminGetUserData(srchKey).subscribe(
          data => {
            let totalRec = data;
            if(totalRec != undefined){
              if(totalRec){
                  let totalData   = totalRec.totalRecord;
                  this.totalRec   = totalData;
                  let totalPage   = Math.ceil(totalData / this.limitNum);
                  this.totalPages = totalPage;
  
                  //this.createPages(this.totalPages);
                  //Get Pager services
                  let pagesItems    = this.objPager.getPagesArray(this.totalPages, 2, 1);
                  this.pagedGItems   = pagesItems;
              }
            }
          });
    }
  
    getListData(pageNum:number=0, limitNum:number=this.limitNum, srchKey:string='', queryType:string){
      //, sortByField:string='', sortByDir=''
      this.pageNum = pageNum;
      //this.sortByDir = (sortByDir == 'asc') ? 'desc' : 'asc';
      let thisDir = this.sortByDir;
      //this.listData = '';
      //alert(pageNum);
      this.service.adminUserList(pageNum, limitNum, srchKey, queryType, this.sortByField, this.sortByDir).subscribe(
          data => {
            this.listData = data.record;
            this.gridData = data.record;
            
            console.log('#### user list data #######');
            console.log(data);
  
          //Get Pager services
          let pagesItems    = this.objPager.getPagesArray(this.totalPages, 2, pageNum);
          //alert('###### page data....');
          this.pagedGItems   = pagesItems;
          });
    }

}
