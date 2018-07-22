import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid';
import { ActivatedRoute, Router } from '@angular/router';
import { YoaxService } from '../../../core/yoService/http/yoax.service';
import { BaseListCtrl } from '../../../core/yoController/BaseListCtrl';

@Component({
    selector: 'app-prod-list',
    templateUrl: './prod-list.component.html',
    styleUrls: ['./prod-list.component.scss']
})
export class ProdListComponent extends BaseListCtrl implements OnInit {
    constructor(
        yoaxService: YoaxService,
        activatedRoute: ActivatedRoute,
        router: Router
    ) {
        super(activatedRoute, yoaxService, router, 'prod');
    }

    ngOnInit() {
        super.setListData();
    }

    cellClick(params: any): void {
        super.cellClick(params.data.PROD_KEY);
    }
}
