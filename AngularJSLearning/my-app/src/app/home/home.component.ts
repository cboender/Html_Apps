import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing/location/housing-location.component';
import { HousingRecord } from '../housing/housing-record';
import { HousingService } from '../housing/housing.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  housingService: HousingService = inject(HousingService);
  housingRecordList: HousingRecord[] = [];
  filteredRecordList: HousingRecord[] = [];

  constructor() {
    this.housingService.getAllHousingRecords().then((records: HousingRecord[]) => {
      this.housingRecordList = records;
      this.filteredRecordList = records;
    });
  }

  filterResults(filterText: string) {
    if (!filterText) {
      this.filteredRecordList = this.housingRecordList
    } else {
      filterText = filterText.toLowerCase()
      this.filteredRecordList = this.housingRecordList.filter((record) => record?.city.toLowerCase().includes(filterText))
    }
    return false
  }
}