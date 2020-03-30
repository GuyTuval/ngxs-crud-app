import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackbar: MatSnackBar, private zone: NgZone) {
  }

  open(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    this.zone.run(() => {
      this.snackbar.open(message, 'DISMISS', config);
    });
  }
}
