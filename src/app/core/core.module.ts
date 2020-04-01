import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {TodoState} from './states/todo.state';
import {ngxsConfig} from './configs/ngxs.config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TodoLiveUpdateService} from './services/todo-live-update.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgxsModule.forRoot([TodoState], ngxsConfig),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
  ],
  providers: [TodoLiveUpdateService],
  exports: [
    CommonModule,
    HttpClientModule,
  ],
})
export class CoreModule {
  // Ensures that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only allows it to be loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`${parentModule.constructor.name} has already been loaded. Import this module in the AppModule only.`);
    }
  }
}
