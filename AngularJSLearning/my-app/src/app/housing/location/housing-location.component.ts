import { Component, Input } from '@angular/core';
import { HousingRecord } from '../housing-record';
import { RouterLink, RouterOutlet } from '@angular/router';
import { getPhotoURL } from '../housing-utility';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css'
})

export class HousingLocationComponent {
  @Input() housingRecord!: HousingRecord;

  getURL(url: string): string {
    return getPhotoURL(url)
  }
}
