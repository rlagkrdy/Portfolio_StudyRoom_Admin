import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { NgForm, ReactiveFormsModule, Validator } from '@angular/forms';
import { Event } from '@angular/router/src/events';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'yo-detail',
    templateUrl: './yo-detail.component.html',
    styleUrls: ['./yo-detail.component.scss']
})
export class YoDetailComponent implements OnInit {
    @Input() private detailObj: Array<object>;
    @Input() private detailObjData: object;
    @ViewChild('detailForm') detailForm: NgForm;
    constructor() {}

    ngOnInit() {}

    //부모로 부터 데이터 받으면 호출
    ngOnChanges(changes: SimpleChanges) {
        if (changes.detailObjData && changes.detailObjData.currentValue) {
            this.setObjValue();
        }
    }

    //부모로 부터 데이터 세팅
    setObjValue() {
        this.detailObj.forEach((item, index, array) => {
            if (item['id'] in this.detailObjData) {
                item['value'] = this.detailObjData[item['id']];
            }
        });
    }
}