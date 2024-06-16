const baseUrl = 'https://angular.io/assets/images/tutorials/faa/';

export function getPhotoURL(photoURL: string): string {
     return `${baseUrl}/${photoURL}`
}
