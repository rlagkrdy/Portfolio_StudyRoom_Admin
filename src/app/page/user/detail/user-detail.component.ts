import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { YoDetailComponent } from '../../../core/yoComponent/yo-detail/yo-detail.component';
import { FormUtils } from '../../../core/yoService/utils/form/form.service';
import { UserModel } from '../../../model/userModel';
import { ConfirmUtils } from '../../../core/yoService/utils/confirm/confirm.service';
import swal, { SweetAlertType } from 'sweetalert2';
import { ProjectModel } from '../../../model/project-model';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    private detailObj: Array<object>;
    private detailData: object;

    private isInsert: boolean = false;
    private isRestore: boolean = false;

    @ViewChild(YoDetailComponent) private _ydc: YoDetailComponent;

    private num: number;
    private url: string;

    constructor(
        private _cu: ConfirmUtils,
        private _ar: ActivatedRoute,
        private _fu: FormUtils,
        private _location: Location,
        private _pm: ProjectModel
    ) {
        this.url = this._ar.snapshot.url[0].path.split('-detail')[0];
        this.detailObj = this._pm.getDetailObj(this.url);
        this.url = '/' + this.url + '/';

        this.num = this._ar.snapshot.params.id;
        this.isInsert = this.num ? false : true;

        this._ar.params.subscribe(result => {
            if (result.type === 'usrDeleteList') {
                this.isRestore = true;
            }
        });

        this._ar.data.subscribe(data => {
            if (data.DetailResolve) {
                this.detailData = JSON.parse(data.DetailResolve._body);
            }
        });
    }

    ngOnInit() {}

    private backToList(): void {
        this._location.back();
    }

    private detailDo(_type: string): void {
        const actionOption: any = this._cu.getActionOption(
            this.url,
            this.num,
            _type
        );

        let params: object = this._ydc.detailForm.value;
        let isVaild: boolean = true;

        if (actionOption.type === 'insert' || actionOption.type === 'update') {
            const formArr: any = this._ydc.detailForm['_directives'];
            isVaild = this._fu.customFormValid(formArr);
        }

        if (!isVaild) {
            return;
        }

        if (actionOption.type === 'restore') {
            params = {
                USR_STATE: 1
            };
        }
        if (actionOption.type === 'leave') {
            params = {
                USR_STATE: 2,
                USR_DELETE_DATE: 'NOW'
            };
        }

        this._cu.confirm(actionOption, params).then(result => {
            if (result.value) {
                swal(
                    `${actionOption.targetName} ${
                        actionOption.actionName
                    } 하였습니다.`,
                    '',
                    'success'
                ).then(() => {
                    this.backToList();
                });
            }
            if (result.dismiss) {
                console.log('취소 클릭...');
            }
        });
    }
}
