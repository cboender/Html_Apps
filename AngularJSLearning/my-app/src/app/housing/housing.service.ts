import { Injectable } from '@angular/core';
import { HousingRecord } from './housing-record';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private readonly url = "http://localhost:3000/locations"

  async getAllHousingRecords(): Promise<HousingRecord[]> {
      const data = await fetch(this.url)
      return (await data.json()) ?? [];
  }

  async getHousingRecordById(id: number): Promise<HousingRecord | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
  
}
