
import { Component, ElementRef, OnInit, ViewContainerRef, Pipe, AfterViewInit,
  Input, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { UserServiceService } from '../../services/user/user-service.service';

import { PagerService } from '../../services/paging/pager.service';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Path } from '../../services/config/path';
import { DictionaryService } from '../../services/config/dictionary.service';
//import { NotificationService } from '../../services/config/notification.service';
import { User } from '../../models/user/user';

import { UserEditComponent } from '../user-edit/user-edit.component';
// import { AlertMessages } from '../../services/messages/alert-messages';

import { AlertService, AlertMessage } from '../../services/messages/alert.service';
import { NotificationsService } from 'angular2-notifications';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-user-grid-list',
  templateUrl: './user-grid-list.component.html',
  styleUrls: ['./user-grid-list.component.scss'],
  providers: [UserServiceService, PagerService, AlertService, 
    FlashMessagesService, UserEditComponent, DictionaryService]
})
export class UserGridListComponent implements OnInit {

  path: Path;
  objAlert: AlertMessage;
  userModel: User;
  public userObject:User;
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

  thisMesg: any;
  public mode:string = '';
  public userData: any;

  //@ViewChild(ChildComponent) child;

  public gridView: GridDataResult;
  public pageSize = 5;
  public skip = 0;
  public multiSelection:any;
  public selectedRows:any = [];
  public selectedRowsIndices:any = [];
  public rowSelected = false;
  public sort: SortDescriptor[] = [];

  public toolbarIcons:any = [];


  constructor(private service: UserServiceService,
              private objPager: PagerService,
              private flashMessage: FlashMessagesService,
              private route: ActivatedRoute,
              private _router: Router,
              private compEdit: UserEditComponent,
              private alertService: AlertService,
              private _notificationservices: NotificationsService,
              private dictionary: DictionaryService
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

      this.mode = 'list-action';

      this.getListData(0, 0, this.srchKey, '');
      }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadItems();
  }

  public pageChange({skip, take}: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadItems();
  }
  private loadItems(): void {
    this.gridView = {
        data: orderBy(this.gridData, this.sort).slice(this.skip, this.skip + this.pageSize),
        total: this.gridData.length
    };
    console.log('USER REC:: ',this.gridView);
}
  ngOnInit() {
    this.toolbarIcons= [
      {class: this.dictionary.insertIcon, tooltip: this.dictionary.insert,   color: this.dictionary.insertIconColor, click: () => {this.insert();}, disabled: false,},      
      {class: this.dictionary.editIcon,   tooltip: this.dictionary.edit,       color: this.dictionary.editIconColor, click: () => {this.edit(0);}, disabled: !this.rowSelected},
      {class: this.dictionary.deleteIcon, tooltip: this.dictionary.delete,     color: this.dictionary.deleteIconColor, click: () => {this.delete();}, disabled: true,},
  ];

      let editPage = 0, srchKey = '';
      this.route.params.subscribe(params => {
       editPage = +params['page']; // (+) conv string to number
       srchKey  = this.route.snapshot.params['srchkey'];

       if (editPage != undefined && editPage > 0){
          this.pageNum = editPage;
       }if (srchKey != undefined && srchKey != ''){
          this.srchKey = srchKey;
       }
      //Init List Data

      this.getTotalData(this.srchKey);
      //this.getListData(this.pageNum, this.limitNum, this.srchKey, '');
      this.getListData(0, 0, this.srchKey, '');
    });
    }

    closeForm(){
      this.mode = 'list-action';
      this.getListData(0, 0, this.srchKey, '');
    }

    edit(editId){
      this.service.adminUserEdit(editId).subscribe(
        data => {
          this.userData = data;
          //this.userModel = data.record[0];
        });

    }

    insert(){
      /*let buttons = [
        {title: this.dictionary.cancel, primary: false, click: () => {}},
        {title: this.dictionary.ok, primary: false, click: () => {
            this.clearSelection();
        }},
    ]
      this.notification.setCustomMessage(this.dictionary.confirmationTitle, 'Insert Click...', buttons);
      */
      this.mode = 'form-action';
    }

    gridRowSelected(row){
      //if(row.length){
        console.log(row);
        if(this.gridData.length){
          this.rowSelected = true;
            if (!row.ctrlKey && !row.shiftKey) {  
              console.log('enter.......0');
              if(row.selectedRows.length){
                this.userObject = JSON.parse(JSON.stringify(row.selectedRows[0].dataItem));
              }
              if (row.selected) {
                this.selectedRows = [row.selectedRows[0].dataItem];
                this.selectedRowsIndices = [row.selectedRows[0].index];
              }            
          }
          else {
            console.log('enter.......1');
              //this.userObject = new User();
              //this.multiSelection = row;
                // One row will be added to the array
                if (row.selected) {
                    this.selectedRows.push(row.selectedRows[0].dataItem);
                    this.selectedRowsIndices.push(row.selectedRows[0].index);
                }
                // One row is deselected. Remove the row from array
                else {
                    let rowIndex = this.selectedRowsIndices.indexOf(row.deselectedRows[0].index);
                    if (rowIndex != -1) {
                        this.selectedRowsIndices.splice(rowIndex, 1);
                        this.selectedRows.splice(rowIndex, 1);
                    }
                }
          }
          this.userObject = JSON.parse(JSON.stringify(this.selectedRows));
        }
        if(this.selectedRows.length === 0){
          this.rowSelected = false;
        }
        console.log(this.selectedRows);
        console.log(this.userObject, ' => ',this.rowSelected);
        console.log(this.selectedRowsIndices);
      //}
    }

    delete(){
      alert('Delete Click...');
    }
    setIconColor(icon) {
      /*if (this.isIconDisabled(icon)) {
          return 'lightgray';
      }
      else {*/
        return icon.color;
      //}
  }
  clearSelection() {
    this.selectedRows = [];
    this.selectedRowsIndices = [];
    this.rowSelected = false;
}
isIconDisabled(icon) {
    return false;
}
  setIconClick(icon) {
    if ((icon.tooltip == this.dictionary.delete) && !icon.customDeleteMessage) {
        return this.confirm(icon.click);
    }
    else {
        if (this.isIconDisabled(icon)) {
            return '';
        }
        else {
            return icon.click();
        }
    }
}
confirm(func) {
  let buttons = [
      {title: this.dictionary.cancel, primary: false, click: () => {}},
      {title: this.dictionary.ok, primary: false, click: () => {
          func();
          this.clearSelection();
      }},
  ]
//  this.notification.setCustomMessage(this.dictionary.confirmationTitle, this.dictionary.confirmationMessage, buttons);
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

            this.gridView = {
              data: this.gridData.slice(this.skip, this.skip + this.pageSize),
              total: this.gridData.length
          };
          //Get Pager services
          //let pagesItems    = this.objPager.getPagesArray(this.totalPages, 2, pageNum);
          //alert('###### page data....');
          //this.pagedGItems   = pagesItems;
          //});
    });
  }
}
