import { OnInit, Component, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AppConstant } from '../common/constants';
@Component({
    selector:'app-filter',
    templateUrl:'./app-filter-component.html',
    styleUrls:['./app-filter-component.scss']
})
export class AppFilterComponent implements OnInit,OnChanges {
    public filterHeader:string;
    @Input('filterList') filterList:any;
    @Output() filtersChange : EventEmitter<any>;
    public showFilter:boolean;
    constructor() {
        this.filterHeader = AppConstant.FILTER_HEADER;
        this.filtersChange = new EventEmitter();
        this.showFilter = false;
    }
    ngOnInit() {
        console.log(this.filterList);
    }
    ngOnChanges(changes:SimpleChanges) {
        //invoke change detection
        console.log(changes);
    }
    public onFilterChange(filter,headerKey):void {
        filter.value = !filter.value;
        this.filterList[headerKey][filter.key] = filter.value;
        console.log(this.filterList);
        this.filtersChange.emit(this.filterList);
        
    }
}