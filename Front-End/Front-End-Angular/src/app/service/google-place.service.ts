import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GooglePlaceService {
  userAddress: string = '';

  calle: string = '';
  calleNro: string = '';
  barrio: string = '';
  ciudad: string = '';
  provincia: string = '';
  codigoPostal: string = '';
  pais: string = '';

  options: any = {
    types: ['address'],
    componentRestrictions: { country: 'AR' },
  };


  constructor() { }
  
  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address;
    console.log('formatted_address-->', address.formatted_address);
    console.log('address_components-->', address.address_components);
    //this.provincia = address.address_components[5].short_name;
    //this.userLatitude = address.geometry.location.lat();
    //this.userLongitude = address.geometry.location.lng();

    for (let dato of address.address_components) {
      if (dato.types.includes('route')) {
        this.calle = dato.short_name;
      }

      if (dato.types.includes('street_number')) {
        this.calleNro = dato.short_name;
      }

      if (
        dato.types.includes(
          'locality' || 'sublocality_level_1' || 'sublocality'
        )
      ) {
        this.barrio = dato.short_name;
      }

      if (dato.types.includes('administrative_area_level_2')) {
        this.ciudad = dato.short_name;
      }

      if (dato.types.includes('postal_code')) {
        this.codigoPostal = dato.short_name;
      }

      if (dato.types.includes('administrative_area_level_1')) {
        this.provincia = dato.short_name;
      }

      if (dato.types.includes('country')) {
        this.pais = dato.long_name;
      }
    }

    console.log(
      this.calle +
        ', Nro.' +
        this.calleNro +
        ', ' +
        this.barrio +
        ', ' +
        this.ciudad +
        ', ' +
        this.codigoPostal +
        ', ' +
        this.provincia +
        ', ' +
        this.pais +
        '.'
    );
  }
}
