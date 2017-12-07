import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import {SummaryResolver} from './summary-resolver.service';
import { AddSummaryComponent } from './add-summary/add-summary.component';
import { SummaryDataService } from './summary-data.service';
import { HttpModule } from '@angular/http';
import { SummaryListComponent } from './summary-list/summary-list.component';
import { SummaryComponent } from './summary/summary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SummaryDetailComponent } from './summary-detail/summary-detail.component';
import { FormsModule } from '@angular/forms';
import {SuiModule} from 'ng2-semantic-ui';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthGuardService } from '../user/auth-guard.service';
import { OwnSummaryComponent } from './summary-own/summary-own.component';

const routes = [
  { path: 'list', component: SummaryListComponent },
  { path: 'add', component:  AddSummaryComponent, canActivate: [AuthGuardService], },
  { path: 'me', component:  OwnSummaryComponent, canActivate: [AuthGuardService], },
  { path: ':id', component: SummaryDetailComponent,
      resolve: { summary: SummaryResolver}
  }

];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SuiModule,
    PdfViewerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AddSummaryComponent,
    SummaryComponent,
    SummaryListComponent,
    SummaryDetailComponent,
    OwnSummaryComponent,
    AddCommentComponent,
    CommentComponent
  ],
  providers: [ SummaryDataService,  SummaryResolver ]
})
export class SummaryModule { }
