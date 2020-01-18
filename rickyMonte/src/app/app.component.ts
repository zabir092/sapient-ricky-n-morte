import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConstant } from './common/constants';
import { Subscription } from 'rxjs';
import { HttpService } from './common/http-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})
export class AppComponent implements OnDestroy, OnInit {
  public title: string;
  public busy: Subscription;
  public item: any;
  public imagePlaceholder: string = 'https://www.capsa.org/wp-content/uploads/2019/07/image-placeholder.jpg';
  public itemList: any[];
  public itemListCache: any[];
  public searchStr: string;
  public sortBy: string;
  public filterOptions: any;
  public filterTags: string[];
  constructor(private httpService: HttpService) {
      this.title = AppConstant.APP_TITLE;
      this.itemList = [];
      this.itemListCache = [];
      this.searchStr = null;
      this.sortBy = 'Ascending';
      this.filterOptions = null;
      this.filterTags = [];
  }
  ngOnInit() {
      this.getShowsList();
  }

  private getShowsList(): void {
      let url = 'https://rickandmortyapi.com/api/character/';
      this.busy = this.httpService.getRequest(url).subscribe(
          (data: any) => {
              this.itemList = data.results;
              this.itemListCache = JSON.parse(JSON.stringify(this.itemList));
          },
          err => console.log(err),
          () => {
              this.buildFilterOptions();
          }
      )
  }

  public searchList(): void {
      this.itemList = this.itemListCache.filter((item) => {
          if (item.name.toLocaleLowerCase().indexOf(this.searchStr.toLocaleLowerCase()) > -1) {
              return item;
          }
      });
      this.sortList();
      console.log(this.itemList);
      if (!this.searchStr) {
          this.filterTags = [];
      }
  }

  public sortList(): void {
      if (this.sortBy === 'Ascending') {
          this.itemList = this.itemList.sort((item1, item2) => item1.id - item2.id)
      } else {
          this.itemList = this.itemList.sort((item1, item2) => item2.id - item1.id)
      }
  }

  private buildFilterOptions(): void {
      this.filterOptions = {
          species: {},
          gender: {},
          status: {},
          origin: {}
      }
      for (let item of this.itemListCache) {
          if (Object.keys(this.filterOptions.species).indexOf(item.species) < 0) {
              this.filterOptions.species[item.species] = false;
          }
          if (Object.keys(this.filterOptions.gender).indexOf(item.gender) < 0) {
              this.filterOptions.gender[item.gender] = false;
          }
          if (Object.keys(this.filterOptions.status).indexOf(item.status) < 0) {
              this.filterOptions.status[item.status] = false;
          }
          if (Object.keys(this.filterOptions.origin).indexOf(item.origin.name) < 0) {
              this.filterOptions.origin[item.origin.name] = false;
          }
      }
  }
  public generateFilterConfig(): any {
      let filterConfig = {};

      function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
      }
      for (let [key, value] of Object.entries(this.filterOptions)) {

          for (let [key_1, value_1] of Object.entries(value)) {
              if (value_1) {
                  if (!filterConfig[key]) {
                      filterConfig[key] = key_1 + '';
                      this.filterTags.push(key + '-' + key_1);
                  } else {
                      filterConfig[key] = filterConfig[key] + ',' + key_1;
                      this.filterTags.push(key + '-' + key_1);
                  }
              }
          }

      }
      var a = JSON.parse(JSON.stringify(this.filterTags));
      this.filterTags = a.filter(onlyUnique);
      console.log(this.filterTags);
      return filterConfig;
  }

  public applyFilters() {
      this.searchStr = '';
      this.searchList();
      let filterConfig = this.generateFilterConfig();
      this.itemList = JSON.parse(JSON.stringify(this.itemListCache));
      this.itemList = this.itemList.filter(function(item) {
          for (var key in filterConfig) {
              if (key !== 'origin' && (item[key] === undefined || filterConfig[key].indexOf(item[key]) < 0))
                  return false;
              if (key === 'origin' && (item[key] === undefined || filterConfig[key].indexOf(item[key].name) < 0))
                  return false;
          }
          return true;
      });


  }

  public removeFilter(tag: string): void {
      let splittedTag = tag.split('-');
      this.filterOptions[splittedTag[0]][splittedTag[1]] = false;
      this.applyFilters();
  }
  ngOnDestroy(): void {

  }
}