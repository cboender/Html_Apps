import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingRecord } from '../housing-record';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getPhotoURL } from '../housing-utility';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  housingService = inject(HousingService)
  route: ActivatedRoute = inject(ActivatedRoute);
  housingRecord: HousingRecord | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const recordId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingRecordById(recordId).then((record) => {
      this.housingRecord = record;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(this.applyForm.value.firstName ?? '', this.applyForm.value.lastName ?? '', this.applyForm.value.email ?? '');
  }

  thinkAboutApplication() {
    console.log("I'm thinking about submitting");
  }

  getURL(url: string | undefined): string {
    return getPhotoURL(url ?? '')
  }
}
