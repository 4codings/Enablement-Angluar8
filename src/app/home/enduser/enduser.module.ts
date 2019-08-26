import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

import { EnduserRoutingModule } from './enduser-routing.module';
import { EnduserComponent } from '../enduser/enduser.component';
import { UsernavbarComponent } from './usernavbar/usernavbar.component';
import { SharedModule } from '../../shared/shared.module';
import { HeaderModule } from '../header/header.module';
import { FormComponent } from './execute/form/form.component';
import { DialogChartsComponent } from './report-table/dialog-charts/dialog-charts.component';
import { ArtifactFormComponent } from './execute/artifact-form/artifact-form.component';
import { NonRepeatableFormComponent } from './execute/non-repeatable-form/non-repeatable-form.component';
import { RepeatableFormComponent } from './execute/repeatable-form/repeatable-form.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { InputOutputElementComponent } from './process-design/input-output-element/input-output-element.component';

@NgModule({
  declarations: [
    EnduserComponent,
    UsernavbarComponent,
    FormComponent,
    ArtifactFormComponent,
    NonRepeatableFormComponent,
    RepeatableFormComponent,
    ReportTableComponent,
    DialogChartsComponent,
    InputOutputElementComponent
  ],
  imports: [
    EnduserRoutingModule,
    SharedModule,
    HeaderModule,
    NgbModule,
    ModalModule.forRoot(),
  ],
  entryComponents: [DialogChartsComponent,InputOutputElementComponent]
})
export class EnduserModule {
  constructor() {
  }
}
