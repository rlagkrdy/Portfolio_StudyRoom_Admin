import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { NgForm, ReactiveFormsModule, Validator } from '@angular/forms';
import { Event } from '@angular/router/src/events';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { DateCtrl } from '../../yoService/ctrl/DateCtrl';
import { SelRaCtrl } from '../../yoService/ctrl/SelRaCtrl';

@Component({
    selector: 'yo-detail',
    templateUrl: './yo-detail.component.html',
    styleUrls: ['./yo-detail.component.scss']
})
export class YoDetailComponent implements OnInit, OnChanges {
    @Input() private detailObj: Array<any>;
    @Input() private detailObjData: object;
    @ViewChild('detailForm') detailForm: NgForm;

    private editorConfig : any = {
        "spellcheck": true,
        "height": "500",
        "minHeight" : "500",
        "width": "auto",
        "imageEndPoint" : "http://localhost:8080/media/",
        "placeholder": "내용을 입력하세요...",
    }

    constructor(private _dateCtrl: DateCtrl, private _selRaCtrl: SelRaCtrl) {}

    ngOnInit() {
        this.detailObj.forEach(item => {
            item.value = '';
        });
    }

    // 부모로 부터 데이터 받으면 호출
    ngOnChanges(changes: SimpleChanges) {
        if (changes.detailObjData && changes.detailObjData.currentValue) {
            setTimeout(() => {
                this.setObjValue();
            }, 0);
        }
    }

    // 부모로 부터 데이터 세팅
    setObjValue() {
        this.detailObj.forEach((item, index, array) => {
            if (item['id'] in this.detailObjData) {
                item['value'] = this.detailObjData[item['id']];
            }
        });
        this.setDateValue();
    }

    setDateValue() {
        setTimeout(() => {
            this._dateCtrl.init(
                this.detailObj,
                this.detailForm,
                this._dateCtrl.setOne
            );
            this._selRaCtrl.init(this.detailObj);
        }, 0);
    }
}
