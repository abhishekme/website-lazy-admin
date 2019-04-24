import { Component, OnInit, AfterViewInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';

import { FormBuilder, FormGroup, FormsModule, Validators, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserServiceService } from '../../services/user/user-service.service';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { User } from '../../models/user/user';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { Path } from '../../services/config/path';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NotificationService } from '../../services/messages/notification.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    userForm: FormGroup = null;
    frmUser: any;
    userModel: User;
    path: Path;

    submitAttempt: boolean;
    editData: any;
    alertMessage: any;
    datepickerOptions: any;
    dateStart: any;
    editPage: number;
    srchKey: string;
    dateofbirth: any;
    user_dob: any;
    filesToUpload: Array<File>;
    formData: FormData = new FormData();

    profilePhoto: string;

    fileServPath: string;
    thisPageNum: number;
    imagePath: string;
    imagePreview: any;
    imagePreviewLoader: boolean;
    uploadedImage: File;
    imagePrevUrl: any;
    uploadFileSel: string;

    //Declaration component communicate
    @Input() mode;
    @Input() objectData:any;
    @Output() onClose = new EventEmitter();

    back(){
      this.onClose.emit();
    }

  constructor() { }

  ngOnInit() {
  }

}
