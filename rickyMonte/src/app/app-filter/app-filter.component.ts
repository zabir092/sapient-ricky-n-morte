import { OnInit, Component } from '@angular/core';
import { AppConstant } from '../common/constants';
@Component({
    selector:'app-filter',
    templateUrl:'./app-filter-component.html',
    styleUrls:['./app-filter-component.scss']
})
export class AppFilterComponent implements OnInit {
    public filterHeader:string;
    constructor() {
        this.filterHeader = AppConstant.FILTER_HEADER;
    }
    ngOnInit() {

    }
}