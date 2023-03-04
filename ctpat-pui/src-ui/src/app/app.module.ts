import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CtpatUserService } from './core/services/ctpat-user.service';
import { CtpatEnvService } from './core/services/ctpat-env.service';
import { ApiInterceptor } from './core/utils/api-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { ApiTokenService } from './core/services/api-token.service';
//import { CBP_USER_SERVICE } from './core/utils/cbp.theme';
import { CreateComponent } from './create/create.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './search/search.component';
import { HotlistComponent } from './hotlist/hotlist.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DetailsComponent } from './details/details.component';
import { BusinessDetailsTabComponent } from './details/business-details-tab/business-details-tab.component';
import { BusinessEntityInfoTabComponent } from './details/business-entity-info-tab/business-entity-info-tab.component';
import { DocumentsTabComponent } from './details/documents-tab/documents-tab.component';
import { SecurityProfileTabComponent } from './details/security-profile-tab/security-profile-tab.component';
import { EventHistoryTabComponent } from './details/event-history-tab/event-history-tab.component';
import { AccountInformationComponent } from './details/business-details-tab/account-information/account-information.component';
import { BusinessInformationComponent } from './details/business-details-tab/business-information/business-information.component';
import { AddressesComponent } from './details/business-details-tab/addresses/addresses.component';
import { ContactsComponent } from './details/business-details-tab/contacts/contacts.component';
import { AgreementComponent } from './details/business-details-tab/agreement/agreement.component';
// tslint:disable-next-line:max-line-length
import { SecurityProfileSectionComponent } from './details/security-profile-tab/security-profile-section/security-profile-section.component';
import { CreateAccountModalComponent } from './core/modals/create-account-modal/create-account-modal.component';
import { CreateBeiModalComponent } from './core/modals/create-bei-modal/create-bei-modal.component';
import { BusinessEntityInformationComponent } from './details/business-entity-info-tab/business-entity-information/business-entity-information.component';
import { CenterExcellenceExpertiseComponent } from './details/business-entity-info-tab/center-excellence-expertise/center-excellence-expertise.component';
import { CountryOfOriginComponent } from './details/business-entity-info-tab/country-of-origin/country-of-origin.component';
import { AddNewBeiModalComponent } from './core/modals/create-bei-modal/add-new-bei-modal/add-new-bei-modal.component';
import { EditBeiModalComponent } from './core/modals/create-bei-modal/edit-bei-modal/edit-bei-modal.component';
import { EditCeeModalComponent } from './core/modals/create-bei-modal/edit-cee-modal/edit-cee-modal.component';
import { AddCountryOfOriginModalComponent } from './core/modals/create-bei-modal/add-country-of-origin-modal/add-country-of-origin-modal.component';
import { EditCountryOfOriginModalComponent } from './core/modals/create-bei-modal/edit-country-of-origin-modal/edit-country-of-origin-modal.component';
import { PartnerDocumentTabComponent } from './details/documents-tab/partner-document-tab/partner-document-tab.component';
import { InternalDocumentTabComponent } from './details/documents-tab/internal-document-tab/internal-document-tab.component';
import { UploadDocumentModalComponent } from './core/modals/upload-document-modal/upload-document-modal.component';
import { ConfirmationDialogModalComponent } from './core/modals/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { VettingTabComponent } from './details/vetting-tab/vetting-tab.component';
import { VettingHistoryComponent } from './details/vetting-tab/vetting-history/vetting-history.component';
import { NewVettingModalComponent } from './core/modals/new-vetting-modal/new-vetting-modal.component';
import { CompanyNameListComponent } from './core/modals/new-vetting-modal/company-name-list/company-name-list.component';
import { BusinessHistoryComponent } from './core/modals/new-vetting-modal/business-history/business-history.component';
import { CompanyAddressListComponent } from './core/modals/new-vetting-modal/company-address-list/company-address-list.component';
import { BeiListComponent } from './core/modals/new-vetting-modal/bei-list/bei-list.component';
import { CompanyContactListComponent } from './core/modals/new-vetting-modal/company-contact-list/company-contact-list.component';
import { EligibilityComponent } from './core/modals/new-vetting-modal/eligibility/eligibility.component';
import { SignaturesComponent } from './core/modals/new-vetting-modal/signatures/signatures.component';
import { IntelligenceGatheringComponent } from './core/modals/new-vetting-modal/intelligence-gathering/intelligence-gathering.component';
import { ValidationTabComponent } from './details/validation-tab/validation-tab.component';
import { PlanValidationModalComponent } from './core/modals/plan-validation-modal/plan-validation-modal.component';
import { ValidationFormComponent } from './core/modals/plan-validation-modal/validation-form/validation-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ValidationSummaryComponent } from './details/validation-tab/validation-summary/validation-summary.component';
import { PlanValidationWithVisitModalComponent } from './core/modals/validation-tab-modals/plan-validation-with-visit-modal/plan-validation-with-visit-modal.component';
import { PlanValidationWithNoVisitModalComponent } from './core/modals/validation-tab-modals/plan-validation-with-no-visit-modal/plan-validation-with-no-visit-modal.component';
import { EditTimelineModalComponent } from './core/modals/validation-tab-modals/edit-timeline-modal/edit-timeline-modal.component';
import { AddNewVisitModalComponent } from './core/modals/validation-tab-modals/add-new-visit-modal/add-new-visit-modal.component';
import { AddPreviousVisitRecordsModalComponent } from './core/modals/validation-tab-modals/add-previous-visit-records-modal/add-previous-visit-records-modal.component';
import { AssociateMrRecordsModalComponent } from './core/modals/validation-tab-modals/associate-mr-records-modal/associate-mr-records-modal.component';
import { ApproveRejectValidationReportModalComponent } from './core/modals/validation-tab-modals/approve-reject-validation-report-modal/approve-reject-validation-report-modal.component';
import { SviTabComponent } from './details/svi-tab/svi-tab.component';
import { SviPanelComponent } from './details/svi-tab/svi-panel/svi-panel.component';
import { MatNativeDateModule } from '@angular/material/core';
import { JoinSviModalComponent } from './core/modals/join-svi-modal/join-svi-modal.component';
import { PartnerMonitoringTabComponent } from './details/svi-tab/partner-monitoring-tab/partner-monitoring-tab.component';
import { SviAgreementModalComponent } from './core/modals/svi-agreement-modal/svi-agreement-modal.component';
import { SviSettingsModalComponent } from './core/modals/svi-settings-modal/svi-settings-modal.component';
import { SviSendCertificationEmailModalComponent } from './core/modals/svi-send-certification-email-modal/svi-send-certification-email-modal.component';
import { SviSendRequestToPartnerModalComponent } from './core/modals/svi-send-request-to-partner-modal/svi-send-request-to-partner-modal.component';
import { SviCertificationEmailDetailsModalComponent } from './core/modals/svi-certification-email-details-modal/svi-certification-email-details-modal.component';
import { SiteValidationVisitModalComponent } from './core/modals/validation-tab-modals/site-validation-visit-modal/site-validation-visit-modal.component';
import { EditSecurityProfileSectionModalComponent } from './core/modals/security-profile-modals/edit-security-profile-section-modal/edit-security-profile-section-modal.component';
import { EditSecurityProfileQuestionModalComponent } from './core/modals/security-profile-modals/edit-security-profile-question-modal/edit-security-profile-question-modal.component';
import { AddMilestoneModalComponent } from './core/modals/add-milestone-modal/add-milestone-modal.component';
import { MilestonesTabComponent } from './details/milestones-tab/milestones-tab.component';
import { MilestoneDetailsComponent } from './details/milestones-tab/milestone-details/milestone-details.component';
import { EditSiteInfoModalComponent } from './core/modals/validation-tab-modals/edit-site-info-modal/edit-site-info-modal.component';
import { EditSiteListModalComponent } from './core/modals/validation-tab-modals/edit-site-list-modal/edit-site-list-modal.component';
import { SubmitToSupervisorModalComponent } from './core/modals/validation-tab-modals/submit-to-supervisor-modal/submit-to-supervisor-modal.component';
import { ValidationDetailsNoVisitComponent } from './details/validation-tab/validation-summary/validation-details-no-visit/validation-details-no-visit.component';
import { ValidationDetailsWithVisitComponent } from './details/validation-tab/validation-summary/validation-details-with-visit/validation-details-with-visit.component';
import { AdvanceSearchModalComponent } from './core/modals/advance-search-modal/advance-search-modal.component';
import { EligibilityModalComponent } from './core/modals/eligibility-modal/eligibility-modal.component';
import { DocumentHistoryModalComponent } from './core/modals/document-history-modal/document-history-modal.component';

@NgModule({
  declarations: [
      AppComponent,
      CreateComponent,
      HeaderComponent,
      SidebarComponent,
      MainContentComponent,
      SearchComponent,
      HotlistComponent,
      SearchResultsComponent,
      DetailsComponent,
      BusinessDetailsTabComponent,
      BusinessEntityInfoTabComponent,
      DocumentsTabComponent,
      SecurityProfileTabComponent,
      EventHistoryTabComponent,
      AccountInformationComponent,
      BusinessInformationComponent,
      AddressesComponent,
      ContactsComponent,
      AgreementComponent,
      SecurityProfileSectionComponent,
      CreateAccountModalComponent,
      CreateBeiModalComponent,
      BusinessEntityInformationComponent,
      CenterExcellenceExpertiseComponent,
      CountryOfOriginComponent,
      AddNewBeiModalComponent,
      EditBeiModalComponent,
      EditCeeModalComponent,
      AddCountryOfOriginModalComponent,
      EditCountryOfOriginModalComponent,
      PartnerDocumentTabComponent,
      InternalDocumentTabComponent,
      UploadDocumentModalComponent,
      DocumentHistoryModalComponent,
      ConfirmationDialogModalComponent,
      VettingTabComponent,
      VettingHistoryComponent,
      NewVettingModalComponent,
      CompanyNameListComponent,
      BusinessHistoryComponent,
      CompanyAddressListComponent,
      BeiListComponent,
      CompanyContactListComponent,
      EligibilityComponent,
      EligibilityModalComponent,
      SignaturesComponent,
      IntelligenceGatheringComponent,
      ValidationTabComponent,
      PlanValidationModalComponent,
      ValidationFormComponent,
      ValidationSummaryComponent,
      ValidationDetailsWithVisitComponent,
      PlanValidationWithVisitModalComponent,
      PlanValidationWithNoVisitModalComponent,
      EditTimelineModalComponent,
      AddNewVisitModalComponent,
      AddPreviousVisitRecordsModalComponent,
      AssociateMrRecordsModalComponent,
      ApproveRejectValidationReportModalComponent,
      SviTabComponent,
      SviPanelComponent,
      ValidationDetailsNoVisitComponent,
      SubmitToSupervisorModalComponent,
      EditSiteListModalComponent,
      EditSiteInfoModalComponent,
      SiteValidationVisitModalComponent,
      JoinSviModalComponent,
      PartnerMonitoringTabComponent,
      SviAgreementModalComponent,
      SviSettingsModalComponent,
      SviSendCertificationEmailModalComponent,
      SviSendRequestToPartnerModalComponent,
      SviCertificationEmailDetailsModalComponent,
      SiteValidationVisitModalComponent,
      EditSecurityProfileSectionModalComponent,
      EditSecurityProfileQuestionModalComponent,
      AddMilestoneModalComponent,
      MilestonesTabComponent,
      MilestoneDetailsComponent,
      AdvanceSearchModalComponent
   ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatButtonModule,
    DragDropModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: get_settings, deps: [CtpatUserService, CtpatEnvService, ApiTokenService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
   // { provide: CBP_USER_SERVICE, useClass: CtpatUserService }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {}
 }

export function get_settings(ctpatUserService: CtpatUserService, ctpatEnvService: CtpatEnvService,
                             apiTokenService: ApiTokenService): VoidFunction {
  return () =>  ctpatEnvService.loadBaserUrl()
             .then(() => ctpatUserService.loadUserInfo())
             .then(() => apiTokenService.loadApiCtpatToken(environment.baseUrl + '/authenticate'));
}

