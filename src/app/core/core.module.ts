import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {TodoState} from './states/todo.state';
import {ngxsConfig} from './configs/ngxs.config';
import {TodoLiveUpdateService} from './services/todo-live-update.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
}
