import { Router, ActivatedRoute } from '@angular/router';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ValidationService } from '../../services/validation.service';
import { _MatTabGroupBase } from '@angular/material/tabs';

@Component({
  selector: 'app-plan-validation-modal',
  templateUrl: './plan-validation-modal.component.html',
  styleUrls: ['./plan-validation-modal.component.scss']
})
export class PlanValidationModalComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  public submitted = false;
  public submitEnabled = false;

  public showSideNav = true;
  public sectionOpens!: boolean[];
  public sectionDone!: boolean[];
  public sectionTitles!: string[];
  public sections: any[] = [];
  public showForm = false;

  public sectionNumber: any;
  public subSectionNumber: any;

  constructor(public dialogRef: MatDialogRef<PlanValidationModalComponent>, private validationService: ValidationService,
              @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit(): void {
    this.submitted = false;

    this.getModalData();
    this.validationService.broadcastValidationQuestions(this.sections);
    this.validationService.broadcastValidationTitles(this.sectionTitles);

    this.validationService.validationSection$.subscribe(data => {
      if (this.sectionNumber !== data){
        this.sectionNumber = data;
        this.subSectionNumber = 0;
      }
    });
  }

  saveDraft(): void{
    this.submitted = true;
    // UI validation before this point
    console.log('get data from sections and save draft');
  }

  submit(): void {
    this.submitted = true;
    // UI validation before this point
    console.log('get data from sections and submit');
  }

  setValidationSection(sec: number, subsec: string, subsecNum: number): void{
    const currentSec = this.sectionNumber;
    if (currentSec !== sec){ // need to check if current section is changed
      this.saveSection();
    }
    this.showForm = true;
    this.sectionNumber = sec;
    this.validationService.broadcastValidationSection(sec);

    setTimeout(() => {
        if (subsec){
          this.subSectionNumber = subsecNum;
          document.querySelector('#' + subsec)?.scrollIntoView();
        } else{
          this.subSectionNumber = 0;
          document.querySelector('#top')?.scrollIntoView();
        }
      }, 300);
  }

  saveSection(): void{
    console.log('save current section contents before switching to another section');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  clear(): void {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onScroll(event: any): void{
    if (!this.sectionOpens[this.sectionNumber]) {
      this.sectionOpens[this.sectionNumber] = true;
    }
    const containerY = document.getElementById('midContainer')?.getBoundingClientRect().top;
    let subsecTemp = 0;
    for (const subSection of this.sections[this.sectionNumber]){
      const subsecY = document.getElementById(subSection.id)?.getBoundingClientRect().top;

      if (containerY && subsecY && (subsecY - containerY >= -5)){
        this.subSectionNumber = subsecTemp;
        break;
      }
      subsecTemp++;
    }

    // bottom section
    const containerYB = document.getElementById('midContainer')?.getBoundingClientRect().bottom;
    const subsecYB = document.getElementById('contentBottom')?.getBoundingClientRect().bottom;
    if (containerYB && subsecYB && (Math.abs(subsecYB - containerYB) < 3)){
      this.subSectionNumber = this.sections[this.sectionNumber].length - 1;
    }

  }

  // sections/chapters relatively fixed. subsections/questions sorting preferably @ backend
  getModalData(): void{
    this.sectionOpens = [false, false, false, false, false, false, false, false, false, false, false];
    this.sectionDone = [false, false, false, false, false, false, false, false, false, false, false];

    this.sectionTitles = ['Upper Management', 'Risk Assessment', 'Business Partners', 'Procedural Security', 'Conveyance and IIT',
     'Agricultural Procedures', 'Physical Security', 'Access Controls', 'Personnel Security', 'Education and Training', 'Cybersecurity'];

    this.sections.push([
      {sort: 1, id: 'q01', msc: '1.2', profile: '1', done: true, criteria: 'Cross-Functional Team', must: false, help: 'Does the company have a team which maintains the supply chain security program? If yes, please detail the members of the team and each respective function.',
      question: 'Have representatives from all of the relevant departments been incorporated into a cross-functional team to build a robust Supply Chain Security Program?'},
      {sort: 2, id: 'q02', msc: '1.2', profile: '1', done: true, criteria: 'Incorporated into Existing Procedures', must: false, help: '',
      question: 'Have these new security measures been incorporated into existing company procedures to create a more sustainable structure that emphasizes that supply chain security is everyone\'s responsibility?'},
      {sort: 3, id: 'q03', msc: '1.3', profile: '2', done: true, criteria: 'Written Review Component', must: true, help: 'Briefly describe the company\'s supply chain security audit program, and list who (title or department) is responsible for administering it.',
      question: 'Is the supply chain security program designed with, supported by, and implemented by an appropriate written review component?'},
      {sort: 4, id: 'q04', msc: '1.3', profile: '3', done: true, criteria: 'Review Plan Updated', must: true, help: 'Please describe the process for updating the supply chain security audit program and include how often is it updated.',
      question: 'Is the review plan updated as needed based on pertinent changes in the organization\'s operations and level of risk?'},
      {sort: 5, id: 'q05', msc: '1.4', profile: '4', done: true, criteria: 'POC Provides Updates', must: true, help: 'Does the company have upper management oversight of supply chain security? If yes, please describe the process for providing updates to the company officer responsible for the oversight.',
      question: 'The role of a company\'s upper management in CTPAT is to provide support and oversight to ensure the creation and maintenance of the company\'s Supply Chain Security Program. To this end, do the CTPAT point(s) of contact (POC) provide regular updates regarding the progress or outcomes of any audits, exercises, or validations?'},
      {sort: 6, id: 'q06', msc: '1.4', profile: '5', done: true, criteria: 'POC Knowledgeable', must: true, help: 'Briefly describe how the point of contact(s) (POCs) have become familiar with the CTPAT program.',
      question: 'Are the POCs knowledgeable about CTPAT\'s program requirements?'},
      {sort: 7, id: 'q07', msc: '1.1', profile: '7', done: true, criteria: 'Statement of Support', must: false, help: 'Does the company have a statement of support for the CTPAT program? If yes, please provide an example and upload a copy into the Document Exchange portion of the Portal.',
      question: 'In promoting a culture of security, is commitment to supply chain security and the CTPAT program demonstrated through a statement of support?'},
      {sort: 8, id: 'q08', msc: '1.1', profile: '7', done: true, criteria: 'Signed/Displayed Statement of Support', must: false, help: '',
      question: 'Is the statement of support signed by a senior company official and displayed in appropriate company locations?'}
    ]);
    this.sections.push([
      {sort: 1, id: 'q09', msc: '2.1', profile: '8', done: true, criteria: 'Risk Documented', must: true, help: 'Describe the company\'s process for conducting a risk assessment. Provide an example of the risk assessment and upload a copy to the portal document exchange library.',
      question: 'Is the amount of risk in supply chains documented?'},
      {sort: 2, id: 'q10', msc: '2.1', profile: '8', done: true,
       criteria: 'Vulnerabilities, Threats, Risk, Sustainable Measures', must: true, help: '',
      question: 'Has an overall risk assessment (RA) been conducted to identify where security vulnerabilities may exist? Does the RA identify : 1. threats, 2. assess risks 3. incorporate sustainable measures to mitigate vulnerabilities?'},
      {sort: 3, id: 'q11', msc: '2.1', profile: '8', done: false, criteria: 'Specific Role in Supply Chain', must: true, help: '',
      question: 'Are CTPAT requirements specific to the role in supply chain taken into account in the risk assessment?'},
      {sort: 4, id: 'q12', msc: '2.2', profile: '9', done: true, criteria: 'Map Origin to DC', must: false, help: 'Does the company include a map of the international supply chain within the risk assessment document? If yes, briefly describe the process taken in order to map the international supply chain.',
      question: 'Does the international portion of the risk assessment document or map the movement of cargo throughout the supply chain from the point of origin to the distribution center?'},
      {sort: 5, id: 'q13', msc: '2.2', profile: '9', done: false,
       criteria: 'Map All BP, Mode of Transport, At Rest', must: true, help: '',
      question: 'Does the mapping include all business partners involved both directly and indirectly in the exportation/movement of the goods and documenting how cargo moves in and out of transport facilities//cargo hubs and noting if the cargo is “at rest” at one of these locations for an extended period of time?'},
      {sort: 6, id: 'q14', msc: '2.3', profile: '10', done: true, criteria: 'Risk Assessment Reviewed Annually', must: true, help: 'Describe the annual process to review and update the risk assessment.',
      question: 'Are risk assessments reviewed annually, or more frequently as risk factors dictate?'},
      {sort: 7, id: 'q15', msc: '2.4', profile: '11', done: true, criteria: 'Business Continuity', must: false, help: 'Does the company have a documented business continuity/resumption plan? If yes, briefly describe the plan.',
      question: 'Are written procedures in place that address crisis management, business continuity, security recovery plans, and business resumption?'}
    ]);
    this.sections.push([
      {sort: 1, id: 'q16', msc: '3.1', profile: '12', done: true, criteria: 'Written New Business Partner Screening', must: true, help: 'Briefly state the process for selecting business partners.',
      question: 'Is a written, risk based process in place for screening new business partners and for monitoring current partners?'},
      {sort: 2, id: 'q17', msc: '3.1', profile: '15', done: true, criteria: 'Money Laundering', must: false, help: 'Does the company screen for money laundering and/or terrorist funding?  If yes, please describe the screening methods.  To assist, a document on key warning indicators is available in the CTPAT Portal (Public Library Section).',
      question: 'Are checks on activity related to money laundering and terrorist funding included in this process?  Based on risk, are CTPAT key warning indicators for money laundering and terrorism financing activities taken into account that are most applicable to the functions performed by the business entity in the supply chain?'},
      {sort: 3, id: 'q18', msc: '7.10', profile: '16', done: true, criteria: 'Documents Reviewed for Suspicious Shipment', must: true, help: 'Detail the process for the review of import/export documentation.  This must include how to identify/recognize suspicious shipments.',
      question: 'Is information in import/export documents reviewed to identify or recognize suspicious cargo shipments?'},
      {sort: 4, id: 'q19', msc: '3.4', profile: '17', done: true, criteria: 'CTPAT/AEO', must: true, help: 'Detail the company\'s process for determining if a business partner is a member of CTPAT and/or any other approved AEO program.',
      question: 'Does the business partner screening process take into account whether a partner is a CTPAT Member or a member in an approved Authorized Economic Operator (AEO) program with a Mutual Recognition Arrangement (MRA) with the United States (or an approved MRA)?'},
      {sort: 5, id: 'q20', msc: '3.4', profile: '17', done: true, criteria: 'Evidence of Certification/Continue Monitor', must: true, help: '',
      question: 'Is evidence of the certification obtained and are business partners continuously monitored to ensure they maintain their certification?'},
      {sort: 6, id: 'q21', msc: '3.5', profile: '18', done: true, criteria: 'Ensure Outsourced BP Meet MSC', must: true, help: 'Describe how the company ensures non-CTPAT business partners are meeting CTPAT security criteria',
      question: 'Where a CTPAT Member outsources or contracts elements of its supply chain, is due diligence exercised (via visits, questionnaires, etc.) to ensure these business partners have security measures in place that meet or exceed CTPAT’s Minimum Security Criteria (MSC)?'},
      {sort: 7, id: 'q22', msc: '3.6', profile: '19', done: true, criteria: 'BP Weaknesses Addressed ASAP', must: true, help: 'Detail the company\'s process for determining if a business partner is meeting CTPAT security criteria.  Detail the correction action plan for those deemed not meeting CTPAT security criteria.',
      question: 'If weaknesses are identified during business partners’ security assessments, are they addressed as soon as possible and are corrections implemented in a timely manner?'},
      {sort: 8, id: 'q23', msc: '3.6', profile: '19', done: true, criteria: 'Documented Deficiencies Mitigated', must: true, help: '',
      question: 'Is it confirmed that deficiencies have been mitigated via documentary evidence?'},
      {sort: 9, id: 'q24', msc: '3.7', profile: '20', done: true, criteria: 'BP Assessment Updated', must: false, help: 'Do the procedures to verify that partners meet the security criteria include periodic reviews? If yes, describe what a periodic review entails.',
      question: 'To ensure that business partners continue to comply with CTPAT’s security criteria, are security assessments of business partners updated on a regular basis, or as circumstances/risks dictate?'},
      {sort: 10, id: 'q25', msc: '3.9', profile: '22', done: true, criteria: 'Social Compliance', must: false, help: 'Does the company have a social compliance program (SCP)?  If yes, does it include a component for forced labor?',
      question: 'Is a  documented social compliance program in place that, at a minimum, addresses how the company ensures goods imported into the United States were not mined, produced or manufactured, wholly or in part, with prohibited forms of labor, e.g., forced, imprisoned, indentured, or indentured child labor?'}
    ]);
    this.sections.push([
      {sort: 1, id: 'q26', msc: '7.6', profile: '25', done: true, criteria: 'Procedures Ensure Information', must: true, help: 'Describe the company\'s procedures for ensuring information submitted is timely, accurate and protected.',
      question: 'Are procedures in place to ensure that all information used in the clearing of merchandise/cargo is legible, complete, accurate, protected against the exchange, loss, or introduction of erroneous information, and reported on time?'},
      {sort: 2, id: 'q27', msc: '7.8', profile: '26', done: true, criteria: 'Weight and Piece Count', must: true, help: 'Describe the company\'s procedure to ensure all cargo is recorded with accurate weight and piece count.',
      question: 'Are the weight and piece count accurate?'},
      {sort: 3, id: 'q28', msc: '7.8', profile: '27', done: true, criteria: 'Accurate Manifest', must: true, help: 'Describe how the company ensures bill of lading (BOL)/manifest information is reported accurately. Describe the company\'s procedures for ensuring the BOL/manifest are filed with CBP in a timely manner and include the procedure for verifying the first foreign location for the carrier.',
      question: 'Does the shipper or its agent ensure that bill of ladings (BOLs) and/or manifests accurately reflect the information provided to the carrier, and do carriers exercise due diligence to ensure these documents are accurate?'},
      {sort: 4, id: 'q29', msc: '7.8', profile: '27', done: true, criteria: 'Manifest Filed Timely', must: true, help: '',
      question: 'Are BOLs and manifests filed with CBP in a timely manner?'},
      {sort: 5, id: 'q30', msc: '7.8', profile: '27', done: true, criteria: 'First Foreign Location', must: true, help: '',
      question: 'Does BOL information filed with CBP show the first foreign location/facility where the carrier takes possession of the cargo destined for the United States?'},
      {sort: 6, id: 'q31', msc: '7.7', profile: '30', done: true, criteria: 'Secure Paper Documents', must: false, help: 'Does the company utilize paper documents?  If yes, detail how the paper documents are secured.',
      question: 'If paper is used, are forms and other import/export related documentation secured to prevent unauthorized use?'},
      {sort: 7, id: 'q32', msc: '7.1', profile: '31', done: true, criteria: 'Secure Overnight Staged Cargo', must: true, help: 'Detail procedures for securing cargo that is staged overnight or for an extended time period.',
      question: 'When cargo is staged overnight, or for an extended period of time, are measures taken to secure the cargo from unauthorized access?'},
      {sort: 8, id: 'q33', msc: '7.4', profile: '32', done: true, criteria: 'Loading Supervised', must: false, help: 'Is the loading/stuffing of cargo supervised?  If yes, detail who oversees the loading/stuffing process.',
      question: 'Is the loading/stuffing of cargo into containers/IIT supervised by a security officer/manager or other designated personnel?'},
      {sort: 9, id: 'q34', msc: '7.28', profile: '33', done: true, criteria: 'Arriving Cargo Reconciled', must: false, help: 'Does the company have a process for reconciling arriving and departing cargo? If yes, please detail those procedures.',
      question: 'Is arriving cargo reconciled against information on the cargo manifest?'},
      {sort: 10, id: 'q35', msc: '7.28', profile: '33', done: true, criteria: 'Departing Cargo Verified', must: false, help: '',
      question: 'Is departing cargo verified against purchase or delivery orders?'},
      {sort: 11, id: 'q36', msc: '7.27', profile: '34', done: true, criteria: 'Shortage/Overages', must: true, help: 'Detail the company\'s procedures for investigating and resolving significant cargo discrepancies or anomalies.',
      question: 'Are all shortages, overages, and other significant discrepancies or anomalies investigated and resolved, as appropriate?'},
      {sort: 12, id: 'q37', msc: '7.24', profile: '49', done: true,
       criteria: 'Procedures Unauthorized/Unidentified Persons', must: true, help: 'Please describe the policy/procedures to address unauthorized/unidentified persons.',
      question: 'Are procedures in place to identify, challenge, and address unauthorized/unidentified persons?'},
      {sort: 13, id: 'q38', msc: '7.24', profile: '49', done: true, criteria: 'Personnel Know Challenge, Respond, Remove', must: true, help: '',
      question: 'Do personnel know the protocol to challenge an unknown/unauthorized person, how to respond to the situation and are they familiar with the procedure for removing an unauthorized individual from the premises?'},
      {sort: 14, id: 'q39', msc: '7.23', profile: '50', done: true, criteria: 'Procedures Internal Escalation Reporting', must: true, help: 'Detail the written procedures for reporting an incident and/or suspicious or illegal activity to CTPAT, CBP, pertinent law enforcement agencies, and any affected business partners.',
      question: 'Are written procedures in place for reporting an incident to include a description of the facility\'s internal escalation process?'},
      {sort: 15, id: 'q40', msc: '7.23', profile: '50', done: true, criteria: 'Protocol Report to SCSS, Port, LE, BP', must: true, help: '',
      question: 'Is a notification protocol in place to report any suspicious activities or security incidents that may affect the security of the member\'s supply chain?  Are incidents reported to: 1. the SCSS, 2.the closest port of entry, 3. any pertinent law enforcement agencies, business partners that may be part of the affected supply chain?'},
      {sort: 16, id: 'q41', msc: '7.23', profile: '50', done: true, criteria: 'Procedures Accurate Contacts', must: true, help: '',
      question: 'Do notification procedures include the accurate contact information that lists the name(s) and phone number(s) of personnel requiring notification, as well as for law enforcement agencies?'},
      {sort: 17, id: 'q42', msc: '7.23', profile: '51', done: true, criteria: 'Notification Soon as Possible', must: true, help: 'Does the company have a procedure in place to notify CBP in case of a security incident?',
      question: 'Are notifications to CBP made as soon as feasibly possible and in advance of any conveyance or IIT crossing the border?'},
      {sort: 18, id: 'q43', msc: '7.23', profile: '52', done: true, criteria: 'Periodically Contacts Accurate', must: true, help: 'If applicable, detail the procedure the company has in place to ensure important contact information is up to date and accurate.',
      question: 'Are procedures periodically reviewed to ensure contact information is accurate?'},
      {sort: 19, id: 'q44', msc: '7.25', profile: '55', done: true, criteria: 'Anonymously Reporting', must: false, help: 'Does the company have a mechanism in place for employees to report security related issues anonymously?  If yes, describe that process in place.',
      question: 'Has a mechanism been established to report security related issues anonymously?'},
      {sort: 20, id: 'q45', msc: '7.25', profile: '55', done: true, criteria: 'Investigate Allegation and Action', must: false, help: '',
      question: 'When an allegation is received, is it investigated, and if applicable, are corrective actions taken?'},
      {sort: 21, id: 'q46', msc: '7.37', profile: '204', done: true, criteria: 'Internal Investigation', must: true, help: 'Detail the company\'s procedures for performing internal investigations upon discovery of a security related incident.',
      question: 'Are internal investigations performed immediately after an incident?'},
      {sort: 22, id: 'q47', msc: '7.37', profile: '204', done: true, criteria: 'Investigation Documented', must: true, help: '',
      question: 'Is the investigation documented?'}
    ]);
    this.sections.push([
      {sort: 1, id: 'q48', msc: '5.1', profile: '56', done: true, criteria: 'Stored Secure Area', must: true, help: 'Briefly describe the security measures used to secure conveyances and IIT.',
      question: 'Are conveyances and Instruments of International Traffic (IIT) stored in a secure area to prevent unauthorized access, which could result in an alteration to the structure of an Instruments of International Traffic or (as applicable) allow the seal/doors to be compromised?'},
      {sort: 2, id: 'q49', msc: '5.2', profile: '57', done: true, criteria: 'Written Procedures Security and Agricultural',
       must: true, help: 'Briefly describe the company\'s written CTPAT inspection process. Ensure the description includes both security and agricultural inspections.',
      question: 'Are written procedures in place for both security and agricultural inspections of IIT?'},
      {sort: 3, id: 'q50', msc: '5.3', profile: '58', done: true, criteria: 'Prior Loading, Security and Agricultural Inspections',
       must: true, help: 'Detail how the company is meeting all the points detailed in the CTPAT conveyance inspection process.  A copy of the procedure and/or example may be uploaded to the CTPAT document exchange library.',
      question: 'Prior to loading/stuffing/packing, do all conveyances and empty IIT undergo CTPAT approved security and agricultural inspections to ensure their structures have not been modified to conceal contraband or have not been contaminated with visible agricultural pests?'},
      {sort: 4, id: 'q51', msc: '5.3', profile: '58', done: true, criteria: '7-Point Inspection', must: true, help: '',
      question: 'Is a seven-point inspection on all empty containers and unit load devices (ULD), and an eight-point inspection on all empty refrigerated containers and ULDs conducted prior to loading/stuffing to include:1. Front wall; 2. Left side; 3. Right side; 4. Floor; 5. Ceiling/Roof; 6. Inside/outside doors, including the reliability of the locking mechanisms of the doors; 7. Outside/Undercarriage; 8. Fan housing on refrigerated containers?'},
      {sort: 5, id: 'q52', msc: '5.3', profile: '58', done: true, criteria: 'Tractor Inspection (7)', must: true, help: '',
      question: 'Do the systematic inspections include:\nTractors: \n1. Bumper/tires/rims; 2. Doors, tool compartments and locking mechanisms; 3. Battery box; 4. Air breather; 5. Fuel tanks; 6. Interior cab compartments/sleeper; 7. Faring/roof?'},
      {sort: 6, id: 'q53', msc: '5.3', profile: '58', done: true, criteria: 'Trailer Inspection (10)', must: true, help: '',
      question: 'Do the systematic inspections include:\nTrailers:\n1. Fifth wheel area - check natural compartment/skid plate; 2. Exterior - front/sides; 3. Rear - bumper/doors; 4. Front wall; 5. Left side; 6. Right side; 7. Floor; 8. Ceiling/roof; 9. Inside/outside doors and locking mechanisms; 10. Outside/Undercarriage? '},
      {sort: 7, id: 'q54', msc: '5.4', profile: '59', done: true, criteria: 'External Hardware', must: true, help: 'Describe the type of external hardware the company utilizes on conveyances and IIT. In addition, detail the inspection process for this hardware.  This is a must to be part of the CTPAT program.',
      question: 'Are conveyances and IIT (as appropriate) equipped with external hardware that can reasonably withstand attempts to remove it?'},
      {sort: 8, id: 'q55', msc: '5.4', profile: '59', done: true, criteria: 'Inspect Locking Mechanism', must: true, help: '',
      question: 'Are the doors, handles, rods, hasps, rivets, brackets, and all other parts of a container’s locking mechanism fully inspected to detect tampering and any hardware inconsistencies prior to the attachment of any sealing device?'},
      {sort: 9, id: 'q56', msc: '5.3', profile: '63', done: true, criteria: 'Systematic and at Storage Yard Inspections', must: true, help: 'Describe the procedures for conveyance/IIT inspections in regard to where and when they are required to be conducted.  The procedure must include entering and exiting a storage yard, as well as point of loading/stuffing.',
      question: 'Are inspections of conveyances and IIT systematic and  are they conducted at conveyance storage yards?'},
      {sort: 10, id: 'q57', msc: '5.3', profile: '63', done: true, criteria: 'Inspections When Entering and Departing',
       must: true, help: '',
      question: 'Where feasible, are inspections conducted upon entering and departing the storage yards and at the point of loading/stuffing?'},
      {sort: 11, id: 'q58', msc: '5.6', profile: '64', done: true, criteria: 'Inspections in Controlled Access and CCTV', must: false, help: 'Are conveyance/IIT inspections conducted in an area with controlled access? If yes, is the area monitored by CCTV?',
      question: 'Are security inspections performed in an area of controlled access and, if available, monitored via a CCTV system?'},
      {sort: 12, id: 'q59', msc: '5.5', profile: '65', done: true, criteria: 'Inspection Checklist', must: false, help: 'Are inspections recorded on a checklist?  If yes, please detail what is recorded on the checklist.',
      question: 'Is the inspection of all conveyances and IIT recorded on a checklist?  Are the following elements documented on the checklist: 1. container/trailer/instruments of international traffic number, 2. date of inspection, 3. time of inspection, 4. name of employee conducting the inspection, 5. specific areas of the instruments of international traffic that were inspected?'},
      {sort: 13, id: 'q60', msc: '5.5', profile: '66', done: true, criteria: 'Supervisor Sign Checklist', must: false, help: '',
      question: 'If the inspections are supervised, does the supervisor also sign the checklist?'},
      {sort: 14, id: 'q61', msc: '5.5', profile: '67', done: true, criteria: 'Inspection Sheet Part of Doc Packet', must: false, help: 'Are inspections supervised?  If yes, detail if the supervisor is required to sign the checklist or not?',
      question: 'Is the completed container/IIT inspection sheet part of the shipping documentation packet?'},
      {sort: 15, id: 'q62', msc: '5.5', profile: '67', done: true, criteria: 'Consignee Receive Doc Packet', must: false, help: 'If applicable, is the inspection checklist included with the shipping documents?  If yes, is it sent to the consignee before the goods arrive?',
      question: 'Does the consignee receive the complete shipping documentation packet prior to receiving the merchandise?'},
      {sort: 16, id: 'q63', msc: '5.8', profile: '69', done: true, criteria: 'Management Random Searches', must: false, help: '',
      question: 'Based on risk, does management conduct random searches of conveyances after the transportation staff have conducted conveyance/IIT inspections?'},
      {sort: 17, id: 'q64', msc: '5.8', profile: '69', done: true, criteria: 'Periodic Searches', must: false, help: 'Does management perform random searches of conveyances/IIT?  If yes, describe the management oversight process.',
      question: 'Are searches of the conveyance done periodically, with a higher frequency based on risk?'},
      {sort: 18, id: 'q65', msc: '5.8', profile: '69', done: true, criteria: 'Random Searches', must: false, help: '',
      question: 'Are the searches conducted at random without warning, so they will not become predictable?'},
      {sort: 19, id: 'q66', msc: '5.8', profile: '70', done: true, criteria: 'Inspections Various Locations', must: false, help: '',
      question: 'Are inspections conducted at various locations where the conveyance is susceptible: 1. the carrier yard, 2. after the truck has been loaded, 3. en route to the United States border?'},
      {sort: 20, id: 'q67', msc: '6.1', profile: '71', done: true, criteria: 'Written Seal Procedures', must: true, help: 'If applicable, list where the management inspections of conveyances/IIT take place.',
      question: 'Are written high security seal procedures in place that describe how seals are issued and controlled at the facility and during transit?'},
      {sort: 21, id: 'q68', msc: '6.1', profile: '71', done: true, criteria: 'Procedures for Alerted, Tampered, Incorrect Seal',
       must: true, help: '',
      question: 'Are procedures in place that provide the steps to take if a seal is found to be altered, tampered with, or has the incorrect seal number to include documentation of the event, communication protocols to partners, and investigation of the incident?'},
      {sort: 22, id: 'q69', msc: '6.1', profile: '71', done: true, criteria: 'Documented Investigation and Corrective Action',
       must: true, help: '',
      question: 'Are the findings from the investigation documented, and any corrective actions implemented as quickly as possible?'},
      {sort: 23, id: 'q70', msc: '6.1', profile: '71', done: true, criteria: 'Written Seal Control Elements', must: true, help: '',
      question: 'Do written seal controls include the following elements?\nA.  Controlling access to seals:  1. management of seals is restricted to authorized personnel, 2. secure storage, 3. inventory, 4. distribution, 5. tracking (seal log), 6. recording the receipt of new seals, 7. issuance of seals recorded in a log, 8. track seals via the log, 9. only trained, authorized personnel may affix seals to instruments of international traffic (IIT).\nB.  Controlling seals in transit:  1. when picking up sealed IIT (or after stopping), verify the seal is intact with no signs of tampering, 2. confirm the seal number matches what is noted on the shipping documents \nC. Seals broken in transit:  1. if load examined--record replacement seal number,  2. the driver must immediately notify dispatch when a seal is broken, 3. who broke the seal, 4. provide the new seal number, 5. the carrier must immediately notify the shipper, broker, and importer of the seal change, and the replacement seal number;  6. the shipper must note the replacement seal number in the seal log\nD. Seal discrepancies:  1. hold any seal discovered to be altered or tampered with to aid in the investigation, 2. investigate the discrepancy,  3. follow-up with corrective measures, 4. report compromised seals to CBP and the appropriate foreign government to aid in the investigation'},
      {sort: 24, id: 'q71', msc: '6.1', profile: '72', done: true, criteria: 'Reviewed/Update Once Year', must: true, help: 'Detail the company\'s written seal procedures and describe how each listed control element is met.',
      question: 'Are procedures reviewed at least once a year and updated as necessary?'},
      {sort: 25, id: 'q72', msc: '6.1', profile: '73', done: true, criteria: 'Maintained at Local Level', must: true, help: 'Describe the annual review process for seal controls.',
      question: 'Are written procedures maintained at the local, operating level so that they are easily accessible?'},
      {sort: 26, id: 'q73', msc: '6.2', profile: '74', done: true, criteria: 'High Security Seal After Loading', must: true, help: 'Detail where the written seal control procedures are maintained.',
      question: 'Are all CTPAT shipments that can be sealed secured immediately after loading/stuffing/packing by the responsible party (e.g. the shipper or packer acting on the shippers behalf) with a high security seal that meets or exceeds the most current International Standardization Organization (ISO) 17712 standard for high security seals?'},
      {sort: 27, id: 'q74', msc: '6.7', profile: '75', done: true, criteria: 'VVTT', must: true, help: 'Describe the type(s) of conveyances/IIT that are used in the supply chain.  If applicable, detail the type of seal(s) utilized.',
      question: 'Is CTPAT’s seal verification process followed to ensure all high security seals (bolt/cable) have been affixed properly to IIT, and are operating as designed?  The procedure is known as the VVTT process:\nV – View seal and container locking mechanisms; ensure they are OK;\nV – Verify seal number against shipment documents for accuracy;\nT – Tug on seal to make sure it is affixed properly;\nT – Twist and turn the bolt seal to make sure its components do not unscrew, separate from one another, or any part of the seal becomes loose.'},
      {sort: 28, id: 'q75', msc: '6.5', profile: '76', done: true, criteria: 'Documented ISO 17712 Standard', must: true, help: 'Describe your procedures for seal verification, which must include the VVTT method.',
      question: 'Is it documented that the high security seals either meet or exceed the most current ISO 17712 standard?'},
      {sort: 29, id: 'q76', msc: '7.5', profile: '77', done: true, criteria: 'Photos of Seal', must: false, help: 'Does the company maintain a seal inventory?  If yes, detail how they verify that the seals utilized meet the current ISO 17712 standards.',
      question: 'As documented evidence of the properly installed seal, are digital photographs taken at the point of stuffing?'},
      {sort: 30, id: 'q77', msc: '7.5', profile: '78', done: true, criteria: 'Photos Forwarded to Destination', must: false, help: 'Is a photograph taken of the sealed container/IIT?',
      question: 'To the extent feasible, are these *images electronically forwarded to the destination for verification purposes?\n*photographs taken at the point of stuffing.'},
      {sort: 31, id: 'q78', msc: '7.30', profile: '79', done: true, criteria: 'Seal# Printed on BL', must: false, help: 'If applicable, are photographs of the sealed container/IIT forwarded to the to the destination where the goods will be opened/received?',
      question: 'Are seal numbers electronically printed on the bill of lading or other shipping documents?'},
      {sort: 32, id: 'q79', msc: '7.29', profile: '80', done: true, criteria: 'Seal# Transmitted to Consignee', must: false, help: 'Are seal numbers required to be electronically printed on the bill of lading (BOL) or other shipping documents?  If yes, on which document(s) is the seal recorded on?',
      question: 'Are seal numbers assigned to specific shipments transmitted to the consignee prior to departure?'},
      {sort: 33, id: 'q80', msc: '6.6', profile: '81', done: true, criteria: 'Seal Audit', must: true, help: 'Do you require seal numbers to be  transmitted  to the consignee prior to departure?',
      question: 'If an inventory of seals is maintained, does company management or a security supervisor conduct audits of seals that includes periodic inventory of stored seals and reconciliation against seal inventory logs and shipping documents?'},
      {sort: 34, id: 'q81', msc: '6.6', profile: '81', done: true, criteria: 'Documented Seal Audit', must: true, help: 'If applicable, detail the process for conducting seal  audits.  Please upload the seal audit procedures do the Portal Document Exchange Library.',
      question: 'Are all audits documented?'},
      {sort: 35, id: 'q82', msc: '6.6', profile: '81', done: true, criteria: 'Supervisor Periodically Verify Seal#', must: true, help: '',
      question: 'As part of the overall seal audit process, do dock supervisors and/or warehouse managers periodically verify seal numbers used on conveyances and IIT?'},
      {sort: 36, id: 'q83', msc: '5.14', profile: '89', done: true, criteria: 'Track from Origin to Destination', must: false, help: 'Does the company have a procedure in place to track a conveyance/IIT from point of origin to final destination?  If yes, is the tracking of a conveyance/IIT incorporated into a terms of service agreement with a service provider?',
      question: 'Is there a mechanism in place to work with transportation providers to track conveyances from origin to final destination point?'},
      {sort: 37, id: 'q84', msc: '5.14', profile: '89', done: true, criteria: 'Service Agreements Requirements', must: false, help: '',
      question: 'Are specific requirements for tracking, reporting, and sharing of data incorporated within terms of service agreements with service providers?'},
      {sort: 38, id: 'q85', msc: '5.29', profile: '91', done: true, criteria: 'Credible Threat, BP and LE Alerted', must: true, help: 'Describe the process to alert business partners and law enforcement in the event there is a credible threat to the supply chain.',
      question: 'If a credible (or detected) threat to the security of a shipment or conveyance is discovered, are business partners in the supply chain that may be affected and any law enforcement agencies alerted (as soon as feasibly possible), as appropriate?'},
      {sort: 39, id: 'q86', msc: '5.16', profile: '106', done: true, criteria: 'No-Stop', must: false, help: 'In regard to unscheduled stops, is there a no stop policy when in the vicinity of the border?',
      question: 'For land border shipments that are in proximity to the United States border, is a “no-stop” policy implemented with regard to unscheduled stops?'}
    ]);
    this.sections.push([
      {sort: 1, id: 'q87', msc: '8.1', profile: '111', done: true, criteria: 'Written Procedures Pest/WPM', must: true,
       help: 'If applicable, describe the written procedures in place to prevent pest contamination.  The procedures must reference Wood Packaging Material regulations and compliance.',
       question: 'In accordance with the applicable business model, are there written procedures in place that are designed to prevent visible pest contamination to include compliance with Wood Packaging Materials (WPM) regulations?'},
      {sort: 2, id: 'q88', msc: '8.1', profile: '111', done: true, criteria: 'WPM Meet ISPM 15', must: true,
       help: '',
       question: 'Do measures regarding WPM meet the International Plant Protection Convention’s (IPPC) International Standards for Phytosanitary Measures No. 15 (ISPM 15)?'},
      {sort: 3, id: 'q89', msc: '8.1', profile: '112', done: true, criteria: 'Pest Prevention Supply Chain', must: true,
       help: 'As applicable, detail how the company ensures that business partners, throughout the supply chain, are following proper procedures to prevent pest infestation.',
       question: 'Are visible pest prevention measures adhered to throughout the supply chain?'},
      {sort: 4, id: 'q90', msc: '7.2', profile: '113', done: true, criteria: 'Cargo Staging Areas Inspected for Pests', must: true,
       help: 'As applicable, detail the company\'s procedures for inspecting cargo staging areas and ensuring the areas are free of pests.',
       question: 'Are cargo staging areas, and the immediate surrounding areas, inspected on a regular basis to ensure these areas remain free of visible pest contamination?'}
    ]);
    this.sections.push([
      {sort: 1, id: 'q91', msc: '9.1', profile: '206', done: true, criteria: 'Physical Barriers', must: true,
       help: 'Detail what barriers and/or deterrents are in place at the facility to prevent unauthorized access to offices, trailer yards, storage and cargo handling areas.',
       question: 'Are there physical barriers and/or deterrents in place to prevent unauthorized access to:  1. offices, 2. trailer yards, 3. cargo handling facilities 4. storage facilities?\n**need bullet boxes here for SCSS to check**'},
      {sort: 2, id: 'q92', msc: '9.2', profile: '115', done: true, criteria: 'Perimeter Fencing', must: false,
       help: 'Does the facility handle cargo?  If yes, is there fencing  around cargo handling and storage facilities?',
       question: 'Does perimeter fencing enclose the areas around cargo handling and storage facilities?'},
      {sort: 3, id: 'q93', msc: '9.2', profile: '116', done: true, criteria: 'Interior Fencing', must: false,
       help: 'Does the facility handle cargo?  If yes, is interior fencing used to secure cargo, cargo handling areas, high value cargo and/or hazardous materials?',
       question: 'If the facility handles cargo, is interior fencing used to secure cargo and cargo handling areas?  Based on risk, does additional interior fencing segregate various types of cargo such as domestic, international, high value, and/or hazardous materials?\n**need bullets here for SCSS to check**'},
      {sort: 4, id: 'q94', msc: '9.2', profile: '117', done: true, criteria: 'Fencing Inspected', must: false,
       help: 'Does the facility have fencing?  If yes, is the fencing regularly inspected for integrity and/or damage?',
       question: 'Is fencing regularly inspected for integrity and damage by designated personnel?'},
      {sort: 5, id: 'q95', msc: '9.2', profile: '118', done: true, criteria: 'Repairs Made ASAP', must: false,
       help: 'Does the facility have fencing?  If applicable, is the fencing repaired as soon as possible once a repair is needed?',
       question: 'If damage is found in the fencing, are repairs made as soon as possible?'},
      {sort: 6, id: 'q96', msc: '9.4', profile: '119', done: true, criteria: 'Gates Manned/Monitored', must: true,
       help: 'Describe the entry and exit points at the facility.  Detail how the entry and exit points are manned and/or monitored.',
       question: 'Are gates where vehicles and\/or personnel enter or exit (as well as other points of ingress\/egress) manned or monitored?'},
      {sort: 7, id: 'q97', msc: '9.5', profile: '120', done: true, criteria: 'Private Pax Prohibited Parking', must: false,
       help: 'Does the facility have a private passenger vehicle area, which is separated from cargo handling, conveyances and storage areas?',
       question: 'Are private passenger vehicles prohibited from parking in or adjacent to cargo handling and storage areas, and conveyances?'},
      {sort: 8, id: 'q98', msc: '9.6', profile: '121', done: true, criteria: 'Lighting', must: true,
       help: 'Describe the lighting placed inside and outside the facility.  Please detail lighting in critical areas:  entrances, exits, cargo handling areas, parking areas, etc.',
       question: 'Is adequate lighting provided inside and outside the facility including, as appropriate, the following areas: 1. entrances 2. exits, 3. cargo handling, 4. storage areas, 5. fence lines, 6. parking areas?\n**need bullet boxes here for SCSS to check**'},
      {sort: 9, id: 'q99', msc: '9.7', profile: '207', done: true, criteria: 'Security Technology', must: false,
       help: 'If applicable, describe the security technology utilized to monitor the premises and prevent unauthorized access.',
       question: 'Is Security Technology utilized to monitor the premises and prevent unauthorized access to sensitive areas?'},
      {sort: 10, id: 'q100', msc: '9.12', profile: '122', done: true, criteria: 'Cameras', must: false,
       help: 'Are cameras utilized at the facility?  If yes, briefly describe your camera surveillance system.',
       question: 'Do cameras monitor the facility’s premises and sensitive areas to deter unauthorized access?'},
      {sort: 11, id: 'q101', msc: '9.12', profile: '123', done: true, criteria: 'Alarms', must: false,
       help: 'Is an alarm system utilized at the facility?  If yes, briefly describe your alarm system.',
       question: 'Are alarms used to alert unauthorized access into sensitive areas?'},
      {sort: 12, id: 'q102', msc: '9.8', profile: '124', done: true, criteria: 'Written Procedures Security Technology', must: true,
       help: 'If applicable, briefly describe the written policies/procedures governing the use, maintenance and protection of security technology. Security technology may encompass cameras, alarms, electronic access controls, etc.',
       question: 'If relying on security technology for physical security, are there written policies and procedures governing the use, maintenance, and protection of this technology?'},
      {sort: 13, id: 'q103', msc: '9.8', profile: '124', done: true, criteria: 'Security Technology Procedures Stipulate', must: true,
       help: '',
       question: 'Do the security technology written policies and procedures stipulate: ** need bullets here for SCSS to check the below**\nHow access to the locations where the technology is controlled/managed or where its hardware (control panels, video recording units, etc.) is kept, is limited to authorized personnel?\nThe procedures that have been implemented to test/inspect the technology on a regular basis?\nThat the inspections include verifications that all of the equipment is working properly, and if applicable, that the equipment is positioned correctly?\nThat the results of the inspections and performance testing is documented?\nThat if corrective actions are necessary, these are to be implemented as soon as possible and that the corrective actions taken are documented?\nThat the documented results of these inspections be maintained for a sufficient time for audit purposes? '},
      {sort: 14, id: 'q104', msc: '9.8', profile: '125', done: true, criteria: 'Procedures Security Technology Updated', must: true,
       help: 'If applicable, briefly describe the procedures for reviewing and updating policies/procedures covering security technology.  Also include how often the reviews are completed.',
       question: 'Are security technology policies and procedures reviewed and updated annually, or more frequently, as risk or circumstances dictate?'},
      {sort: 15, id: 'q105', msc: '9.8', profile: '126', done: true, criteria: 'Third Party Station', must: true,
       help: 'Is a third party monitoring station utilized?  If yes, briefly describe the procedures for ensuring the service provider has sufficient measures/procedures for protecting its security systems at the monitoring station.',
       question: 'If a third party central monitoring station (off-site) is utilized, does the CTPAT Member have written procedures stipulating critical systems functionality and authentication protocols such as (but not limited to) security code changes, adding or subtracting authorized personnel, password revisions(s), and systems access or denial(s)? **need bullets here for SCSS to check**'},
      {sort: 16, id: 'q106', msc: '9.9', profile: '127', done: true, criteria: 'Licensed Installation', must: false,
       help: 'If applicable, did the facility utilize licensed/certified resources for the installation of security technology?',
       question: 'Are licensed/certified resources utilized when considering the design and installation of security technology?'},
      {sort: 17, id: 'q107', msc: '9.10', profile: '128', done: true, criteria: 'Security Technology Physically Secured', must: true,
       help: 'If applicable, briefly describe the controls in place for access to security technology.',
       question: 'Is all security technology infrastructure physically secured from unauthorized access?'},
      {sort: 18, id: 'q108', msc: '9.11', profile: '129', done: true, criteria: 'Alternative Power', must: false,
       help: 'If applicable, does the facility have an alternative power source in the event that power is lost?',
       question: 'Are security technology systems configured with an alternative power source that will allow the systems to continue to operate in the event of an unexpected loss of direct power?'},
      {sort: 19, id: 'q109', msc: '9.14', profile: '130', done: true, criteria: 'Camera Failure Alarm', must: false,
       help: 'Are there cameras at the facility?  If yes, does the camera system have an alarm/notification feature in the event the system is disabled/not functioning?',
       question: 'If camera systems are deployed, do cameras have an alarm/notification feature, which would signal a “failure to operate/record” condition?'},
      {sort: 20, id: 'q110', msc: '9.13', profile: '131', done: true, criteria: 'Cameras Cover Key Areas', must: true,
       help: 'If applicable, detail where the cameras are stationed/positioned.',
       question: 'If camera systems are deployed, are cameras positioned to cover key areas of facilities that pertain to the import/export process?'},
      {sort: 21, id: 'q111', msc: '9.13', profile: '132', done: true, criteria: 'Camera Highest Picture Quality and 24/7', must: false,
       help: 'If applicable, are the cameras set to record at the highest quality level?  Are the cameras set to record on a 24/7  basis?',
       question: 'Are cameras programmed to record at the highest picture quality setting reasonably available, and set to record on a 24/7 basis?'},
      {sort: 22, id: 'q112', msc: '9.16', profile: '133', done: true, criteria: 'Recordings Maintained', must: false,
       help: 'If applicable, how long are the camera recordings maintained/stored?  Is the camera system\'s data storage capacity sufficient to allow all shipments to be received by consignees and (if necessary) complete an investigation?',
       question: 'If cameras are being used, are recordings of footage covering key import/export processes maintained for a sufficient time for a monitored shipment to allow an investigation to be completed?'},
      {sort: 23, id: 'q113', msc: '9.15', profile: '134', done: true, criteria: 'Periodic/Random Review Footage', must: true,
       help: 'If applicable, briefly describe the periodic and random reviews of the camera footage.  Also detail how the results of the reviews are maintained and for how long.  This is a must to be part of the CTPAT program.',
       question: 'If camera systems are deployed, are periodic, random reviews of the camera footage conducted (by management, security, or other designated personnel) to verify that cargo security procedures are being properly followed in accordance with the law?'},
      {sort: 24, id: 'q114', msc: '9.15', profile: '134', done: true, criteria: 'Reviews Summarized with Corrective Action', must: true,
       help: '',
       question: 'Are results of the reviews summarized in writing to include any corrective actions taken?'},
      {sort: 25, id: 'q115', msc: '9.15', profile: '134', done: true, criteria: 'Results Maintained', must: true,
       help: '',
       question: 'Are the results maintained for a sufficient time for audit purposes?'}
    ]);
    this.sections.push([
      {sort: 1, id: 'q116', msc: '10.1', profile: '136', done: true, criteria: 'Written Procedure Access Devices', must: true,
       help: 'Detail the procedures in place for governing the issuance, change and/or removal of access devices.',
       question: 'Are there written procedures governing how identification badges and access devices are granted, changed, and removed?'},
      {sort: 2, id: 'q117', msc: '10.1', profile: '137', done: true, criteria: 'Personnel Identification System', must: true,
       help: 'If applicable, does the facility have an employee identification system in place?',
       // tslint:disable-next-line:max-line-length
       question: 'Where applicable, is a personnel identification system in place for positive identification and access control purposes?'},
      {sort: 3, id: 'q118', msc: '10.1', profile: '139', done: true, criteria: 'Sensitive Areas Restricted', must: true,
       help: 'Briefly describe how access to sensitive areas is restricted.',
       question: 'Is access to sensitive areas restricted based on job description or assigned duties?'},
      {sort: 4, id: 'q119', msc: '10.1', profile: '140', done: true, criteria: 'Removal of Access Devices', must: true,
       help: 'Briefly describe how access is removed once an employee separates from the company.',
       question: 'Does removal of access devices take place upon the employee’s separation from the company?'},
      {sort: 5, id: 'q120', msc: '9.4', profile: '141', done: true, criteria: 'Individuals and Vehicles Subject to Search', must: false,
       help: 'Does the company allow people and/or vehicles to be searched upon entering the facility?',
       question: 'Are individuals and vehicles subject to search in accordance with local and labor laws?'},
      {sort: 6, id: 'q121', msc: '10.2', profile: '143', done: true, criteria: 'Visitors Photo Identification', must: true,
       help: 'Describe the procedure for verifying photo identification of visitors, vendors and service providers upon arrival.  Detail how the visitor information is recorded.',
       question: 'Do visitors, vendors and service providers present photo identification upon arrival?'},
      {sort: 7, id: 'q122', msc: '10.2', profile: '143', done: true, criteria: 'Visitor Log Details', must: true,
       help: '',
       question: 'Is a log maintained that records the details of the visit and does the log include:  1. date of the visit, 2. visitor\'s name, 3. verification of photo identification, 4. time of arrival, 5. company point of contact, 6. time of departure.\n**need bullet boxes here for SCSS To check**'},
      {sort: 8, id: 'q123', msc: '10.2', profile: '144', done: true, criteria: 'Visitors Temp ID', must: false,
       help: 'Are visitors and service providers issued temporary identification?',
       question: 'Are all visitors and service providers issued temporary identification?'},
      {sort: 9, id: 'q124', msc: '10.2', profile: '145', done: true, criteria: 'Temp ID Displayed All Times', must: true,
       help: 'If applicable, briefly describe the temporary identification procedures.',
       question: 'If temporary identification is used, is it visibly displayed at all times during the visit?'},
      {sort: 10, id: 'q125', msc: '10.2', profile: '146', done: true, criteria: 'Visitors Escorted', must: false,
       help: 'Are visitors escorted while on the premises?',
       question: 'Are all visitors escorted?'},
      {sort: 11, id: 'q126', msc: '10.9', profile: '147', done: true, criteria: 'Delivery to Specific Monitored Area', must: false,
       help: 'Is there a policy in place for accepting/receiving of cargo?  If yes, briefly describe the policy.',
       question: 'Is the delivery of goods to the consignee or other persons accepting delivery of cargo at the partner’s facility limited to a specific monitored area?'},
      {sort: 12, id: 'q127', msc: '10.7', profile: '148', done: true, criteria: 'Delivery/Pick By Appointment', must: false,
       help: 'Are deliveries and pickups by appointment only?  If yes, briefly describe the process.',
       question: 'Where operationally feasible, are deliveries and pickups allowed by appointment only?'},
      {sort: 13, id: 'q128', msc: '10.7', profile: '149', done: true, criteria: 'Carrier Notify Facility', must: false,
       help: 'Does your facility require prior notification before a carrier arrives for pick up?  If yes, detail if the prior notification includes estimated time of arrival, name of the driver and/or truck number.',
       question: 'Prior to arrival, does the carrier notify the facility of the following:  1. the estimated time of arrival for the scheduled pick up, 2. the name of the driver, 3. the truck number?\n**need bullet boxes here for SCSS to check**'},
      {sort: 14, id: 'q129', msc: '10.3', profile: '150', done: true, criteria: 'Drivers Positively Identified', must: true,
       help: 'Detail the procedure for identification verification of drivers.',
       question: 'Are drivers delivering or receiving cargo positively identified before cargo is received or released?'},
      {sort: 15, id: 'q130', msc: '10.3', profile: '150', done: true, criteria: 'Drivers Present Government ID', must: true,
       help: '',
       question: 'Do drivers present government-issued photo identification to the facility employee granting access to verify their identity?  If presenting a government-issued photo identification is not feasible, the facility employee may accept a recognizable form of photo identification issued by the highway carrier company that employs the driver picking up the load.'},
      {sort: 16, id: 'q131', msc: '10.4', profile: '151', done: true, criteria: 'Cargo Pick Up Log', must: true,
       help: 'Describe the procedure/process in place for recording a driver\'s information as well as the conveyance upon arrival.',
       question: 'Is a cargo pickup log kept to register drivers and record the details of their conveyances when picking up cargo?'},
      {sort: 17, id: 'q132', msc: '10.4', profile: '151', done: true, criteria: 'Register Driver in Cargo Pick Up Log', must: true,
       help: '',
       question: 'When drivers arrive to pick up cargo at a facility, does a facility employee register them in the cargo pickup log?'},
      {sort: 18, id: 'q133', msc: '10.4', profile: '151', done: true, criteria: 'Drivers Logged Out', must: true,
       help: '',
       question: 'Upon departure, are drivers logged out?'},
      {sort: 19, id: 'q134', msc: '10.4', profile: '151', done: true, criteria: 'Cargo Log Secured', must: true,
       help: '',
       question: 'Is the cargo log kept secured and are drivers not allowed access to it?'},
      {sort: 20, id: 'q135', msc: '10.4', profile: '152', done: true, criteria: 'Cargo Log Recorded Items', must: false,
       help: 'List the items that detailed on the driver\'s arrival log.  The log should include:  date, time, driver\'s name, employer, truck number, seal number and departure time.',
       question: 'Does the cargo pickup log have the following items recorded:\n1. driver\'s name, 2. date, 3. time of arrival, 4. employer, 5. truck number, 6. trailer number, 7. time of departure, 8. the seal number affixed to the shipment at the time of departure? **need bullet boxes here for SCSS to check**'},
      {sort: 21, id: 'q136', msc: '10.8', profile: '153', done: true, criteria: 'Screening Packages/Mail', must: false,
      help: 'Are incoming packages/mail screened before dissemination?  If yes, describe the screening process.',
      question: 'Are arriving packages and mail periodically screened for contraband before being admitted?'},
      {sort: 22, id: 'q137', msc: '10.10', profile: '154', done: true, criteria: 'Guard Work Instructions', must: true,
      help: 'If applicable, briefly describe the written policies/procedures detailing the security guard work instructions.',
      question: 'If security guards are used, are work instructions for security guards contained in written policies and procedures?'},
      {sort: 23, id: 'q138', msc: '10.10', profile: '155', done: true, criteria: 'Management Verify Guard Compliance', must: true,
      help: 'Briefly describe the procedures for management oversight and audits of security guard procedures.',
      question: 'Does management periodically verify compliance and appropriateness with the security guard procedures through audits and policy reviews?'}
    ]);
    this.sections.push([
      {sort: 1, id: 'q139', msc: '11.1', profile: '157', done: true,
       criteria: 'Written Procedures Screening Prospective Employees', must: true,
       help: 'Describe the process for verifying applicant information such as references and employment history.',
       question: 'Are there written procedures for screening prospective employees and for performing checks on current employees?'},
      {sort: 2, id: 'q140', msc: '11.1', profile: '157', done: true, criteria: 'Application Verified', must: true,
       help: '',
       question: 'Is application information, such as employment history and references, verified prior to employment, to the extent possible and allowed under the law?'},
      {sort: 3, id: 'q141', msc: '11.2', profile: '158', done: true, criteria: 'Background Screening', must: false,
       help: 'Are background checks or investigations conducted on prospective employees?  If yes, please describe what the background check entails.',
       question: 'In accordance with applicable legal limitations, and the availability of criminal record databases, are employee background screenings conducted?'},
      {sort: 4, id: 'q142', msc: '11.2', profile: '158', done: true, criteria: 'Background Checks Factored', must: false,
       help: '',
       question: 'Are results of background checks factored in, as permitted by local statutes, when making hiring decisions?'},
      {sort: 5, id: 'q143', msc: '11.2', profile: '158', done: true, criteria: 'Background Includes', must: false,
       help: '',
       question: 'Does employee background screening include: 1. verification of the employee’s identity 2. criminal history that encompass city, state and provincial, 3. criminal history for country databases 4. extended investigation methods?  Background checks are not limited to verification of identity and criminal records.  In areas of greater risk, more in depth investigations may be warranted.\n**need bullet boxes here for SCSS to check**'},
      {sort: 6, id: 'q144', msc: '11.2', profile: '159', done: true, criteria: 'Temp and Contractors', must: false,
       help: 'Does the company employee contracted labor or temporary workers?  If yes, detail the vetting requirements for those workers.',
       // tslint:disable-next-line:max-line-length
       question: 'Based on the sensitivity of the position, do employee vetting requirements extend to temporary workforce and contractors?'},
      {sort: 7, id: 'q145', msc: '11.2', profile: '160', done: true, criteria: 'Periodic Reinvestigations', must: false,
       help: 'Do you perform periodic reinvestigations on current employees?  If yes, detail the procedures.',
       question: 'Once employed, are periodic reinvestigations performed based on cause, and\/or the sensitivity of the employee\'s position?'},
      {sort: 8, id: 'q146', msc: '11.5', profile: '211', done: true, criteria: 'Code of Conduct', must: true,
       help: 'Briefly describe your company\'s Code of Conduct.  Detail if employees/contractors acknowledge they have read and understood the Code of Conduct.  Detail if records are maintained.',
       question: 'Is there an Employee Code of Conduct that includes expectations and defines acceptable behaviors?'},
      {sort: 9, id: 'q147', msc: '11.5', profile: '211', done: true, criteria: 'Acknowledge Code of Conduct', must: true,
       help: '',
       question: 'Are employees and contractors required to acknowledge that they have read and understand the Code of Conduct?'}
    ]);
    this.sections.push([
      {sort: 1, id: 'q148', msc: '12.1', profile: '164', done: true, criteria: 'Security Training Program', must: true,
       help: 'Briefly describe the company\'s security training and awareness program.',
       question: 'Is a security training and awareness program in place and maintained to recognize and foster awareness of the security vulnerabilities to facilities, conveyances, and cargo at each point in the supply chain, which could be exploited by terrorists or contraband smugglers?'},
      {sort: 2, id: 'q149', msc: '12.1', profile: '165', done: true, criteria: 'Based on Function\/Position', must: true,
       help: 'List who must attend security training.  Detail if the training includes CTPAT security requirements.',
       question: 'Is security training provided to employees, as required based on their functions and position, on a regular basis?'},
      {sort: 3, id: 'q150', msc: '12.1', profile: '165', done: true, criteria: 'Training for Newly Hired', must: true,
       help: '',
       question: 'Do newly hired employees receive this training as part of their orientation\/job skills training?'},
      {sort: 4, id: 'q151', msc: '12.1', profile: '165', done: true, criteria: 'Cover All CTPAT Requirements', must: true,
       help: '',
       question: 'Is the training program comprehensive and does it cover all of CTPAT’s security requirements?'},
      {sort: 5, id: 'q152', msc: '12.1', profile: '166', done: true, criteria: 'Specialized Training', must: true,
       help: 'Briefly describe the specialized training your company provides for personnel in sensitive positions.',
       question: 'Do personnel in sensitive positions receive additional specialized training geared toward the responsibilities that the position holds?'},
      {sort: 6, id: 'q153', msc: '12.2', profile: '167', done: true, criteria: 'Refresher Training', must: true,
       help: 'Detail how often refresher training is provided and\/or when it is provided.',
       question: 'Is refresher training conducted: 1. periodically, 2. as needed after an incident or security breach, 3. when there are changes to company procedures? **need bullet boxes here for the SCSS**'},
      {sort: 7, id: 'q154', msc: '12.1', profile: '168', done: true, criteria: 'Evidence', must: true,
       help: 'Briefly describe how training is recorded and retained.',
       question: 'Is training evidence retained, such as training logs, sign in sheets (roster), or electronic training records?'},
      {sort: 8, id: 'q155', msc: '12.1', profile: '169', done: true, criteria: 'Training Records Include', must: false,
       help: 'Detail what is recorded on the training records.  The records should include date of training, attendees, topic, etc.',
       question: 'Do training records include:   1. the date of the training, 2. names of attendees, 3. topics of the training? **need bullet boxes here for the SCSS**'},
      {sort: 9, id: 'q156', msc: '12.4', profile: '170', done: true, criteria: 'Verify Training Met Objectives', must: false,
       help: 'How are the training objectives tested?  If applicable, detail the process for verifying the training objectives were met.',
       question: 'Are measures in place to verify that the training provided met all training objectives?'},
      {sort: 10, id: 'q157', msc: '12.2', profile: '171', done: true, criteria: 'Trained to Inspect Conveyances', must: true,
       help: 'Briefly describe the training provided to drivers\/personnel on security and agricultural inspections.  The training must include:  hidden compartments and pest contamination.',
       question: 'Are drivers and other personnel that conduct security and agricultural inspections of empty conveyances and IIT trained to inspect their conveyances\/IIT for both security and agricultural purposes?'},
      {sort: 11, id: 'q158', msc: '12.2', profile: '171', done: true, criteria: 'Inspection Training Topics', must: true,
       help: '',
       question: 'Does inspection training include the following topics: 1. signs of hidden compartments, 2. concealed contraband in naturally occurring compartments, 3. signs of pest contamination? **need bullet boxes here for the SCSS**'},
      {sort: 12, id: 'q159', msc: '12.10', profile: '174', done: true,
       criteria: 'Report Security Incident/Suspicious Activities', must: true,
       help: 'Briefly describe the training on how to report suspicious activity.',
       question: 'Are employees trained on how to report security incidents and suspicious activities?'},
      {sort: 13, id: 'q160', msc: '12.7', profile: '175', done: true, criteria: 'Preventing Pest for Applicable Personnel', must: true,
       help: 'Briefly describe the training provided for preventing pest infestation\/contamination and compliance with wood packaging material (WPM).',
       question: 'Is training provided to applicable personnel on preventing visible pest contamination?'},
      {sort: 14, id: 'q161', msc: '12.7', profile: '175', done: true,
       criteria: 'Pest Prevention, WPM Requirements, ID Infested Wood', must: true,
       help: '',
       question: 'Does training encompass:  1. pest prevention measures, 2. regulatory requirements applicable to wood packaging materials (WPM), 3. identification of infested wood? **need bullet boxes here for the SCSS**'},
      {sort: 15, id: 'q162', msc: '12.6', profile: '176', done: true,
       criteria: 'Trade Based Money Laundering/Terrorism Financing', must: false,
       help: 'Is specialized training provided for personnel that may be able to identify signs of Trade Based Money Laundering and Terrorism Financing?',
       question: 'Is specialized training provided annually to personnel who may be able to identify the warning indicators of trade based money laundering and terrorism financing?'},
      {sort: 16, id: 'q163', msc: '7.10', profile: '177', done: true, criteria: 'Suspicious Indictors in Shipping Documents', must: true,
       help: 'Describe the training given to personnel who review shipping documents.',
       question: 'Are relevant personnel trained on how to identify information in shipping documents, such as manifests, that might indicate a suspicious shipment?'},
      {sort: 17, id: 'q164', msc: '12.8', profile: '178', done: true, criteria: 'Cyber Security Policies', must: true,
       help: 'Briefly describe the cybersecurity training program for employees with system access to include protecting electronic information\/data.',
       question: 'As applicable based on their functions and\/or positions, are employees trained on the company\'s cybersecurity policies and procedures?'},
      {sort: 18, id: 'q165', msc: '12.8', profile: '178', done: true, criteria: 'Protect Passwords/Computer Access', must: true,
       help: '',
       question: 'Does this include the need for employees to protect passwords\/passphrases and computer access?'},
      {sort: 19, id: 'q166', msc: '12.9', profile: '179', done: true, criteria: 'Security Technology Training', must: true,
       help: 'Briefly describe the training provided to personnel operating\/managing security technology systems.',
       question: 'Have employees operating and managing security technology systems received training in their operation and maintenance?'}
    ]);
    this.sections.push([
      {sort: 1, id: 'q167', msc: '4.1', profile: '180', done: true, criteria: 'Written Procedures Cybersecurity', must: true,
       help: 'Briefly give an overview of the cybersecurity policies and procedures.',
       question: 'Are comprehensive written cybersecurity policies and\/or procedures in place to protect information technology (IT) systems?'},
      {sort: 2, id: 'q168', msc: '4.6', profile: '181', done: true, criteria: 'Reviewed Annually\/More Frequently', must: true,
       help: 'Describe your process for conducting an annual review of cybersecurity policies.',
       question: 'Are cybersecurity policies and procedures reviewed annually, or more frequently, as risk or circumstances dictate?'},
      {sort: 3, id: 'q169', msc: '4.6', profile: '181', done: true, criteria: 'Procedures Updated if Necessary', must: true,
       help: '',
       question: 'Are policies and procedures updated if\/when necessary?'},
      {sort: 4, id: 'q170', msc: '4.2', profile: '182', done: true, criteria: 'Recovery of Systems/Data', must: true,
       help: 'Describe the procedure in case of a data breach resulting in loss of data and/or equipment to include your process to recover data and/or replace equipment—if needed.',
       question: 'If a data breach occurs or an event results in the loss of data and\/or equipment, do procedures include the recovery (or replacement) of IT systems and\/or data?'},
      {sort: 5, id: 'q171', msc: '4.4', profile: '183', done: true, criteria: 'Share Info on Threats', must: false,
       help: 'Is there a policy regarding information sharing?  If yes, does that policy include sharing information with business partners and/or the Government?',
       question: 'Do cybersecurity policies address how information is shared on cybersecurity threats with the government and other business partners?'},
      {sort: 6, id: 'q172', msc: '4.2', profile: '184', done: true, criteria: 'Prevent Social Engineering', must: true,
       help: 'Describe the company\'s policy/procedure for preventing cyber attacks via social engineering.',
       question: 'Are policies and procedures in place to prevent attacks via social engineering?'},
      {sort: 7, id: 'q173', msc: '4.11', profile: '185', done: true,
       criteria: 'Prevent Counterfeit/Improperly Licensed Technology', must: false,
       help: 'Is there a policy/procedures to prevent the use of counterfeit or improperly licensed products?  If yes, describe your anti-counterfeit measures and methods to ensure products are authentic.',
       question: 'Do cybersecurity policies and procedures include measures to prevent the use of counterfeit or improperly licensed technological products?'},
      {sort: 8, id: 'q174', msc: '4.5', profile: '186', done: true, criteria: 'Identify Unauthorized/Abuse/Improper/Tampering', must: true,
       help: 'Briefly describe the procedures in place to identify unauthorized access of IT systems/data, abuse of IT policies/procedures and tampering, or the altering of business data.',
       question: 'Is a system in place to identify:  1. unauthorized access of IT systems\/data 2. abuse of policies and procedures 3. improper access of internal systems or external websites 4. tampering or altering of business data by employees or contractors? **need bullet bpxes here for SCSS to check**'},
      {sort: 9, id: 'q175', msc: '4.5', profile: '187', done: true, criteria: 'Disciplinary Action', must: true,
       help: 'Briefly describe the disciplinary actions in place for any IT policy/procedure violations.',
       question: 'Are all violators subject to appropriate disciplinary actions?'},
      {sort: 10, id: 'q176', msc: '4.2', profile: '188', done: true, criteria: 'Software/Hardware/IDS to Defend', must: true,
       help: 'Describe the plan/policy to protect the IT system from malware and other cyber threats.  What types of protective software are installed?   Describe how hardware and network systems are protected.',
       question: 'To defend Information Technology (IT) systems against common cybersecurity threats, has sufficient software\/hardware been installed for the protection from malware (viruses, spyware, worms, Trojans, etc.) and has an internal\/external intrusion detection system been installed (firewalls)?'},
      {sort: 11, id: 'q177', msc: '4.2', profile: '189', done: true, criteria: 'Regular Updates Software', must: true,
       help: 'Describe your procedures for ensuring security software is up to date.',
       question: 'Is security software current and does it receive regular security updates?'},
      {sort: 12, id: 'q178', msc: '4.3', profile: '190', done: true, criteria: 'Infrastructure Regularly Tested', must: true,
       help: 'Briefly describe how the security of the T infrastructure is tested.',
       question: 'When utilizing network systems, is the security of the IT infrastructure regularly tested?'},
      {sort: 13, id: 'q179', msc: '4.3', profile: '190', done: true, criteria: 'Corrective Action Implemented', must: true,
       help: '',
       question: 'If vulnerabilities are found, are corrective actions implemented as soon as feasible?'},
      {sort: 14, id: 'q180', msc: '4.12', profile: '191', done: true, criteria: 'Weekly Data Back Up', must: false,
       help: 'Are data backups performed of the IT system?  If yes, how often is the system backed up?',
       question: 'Is data backed up once a week or as appropriate?'},
      {sort: 15, id: 'q181', msc: '4.12', profile: '191', done: true, criteria: 'Sensitive Data Encrypted', must: false,
       help: '',
       question: 'Is all sensitive and confidential data stored in an encrypted format?'},
      {sort: 16, id: 'q182', msc: '4.13', profile: '192', done: true, criteria: 'Regular Inventories', must: true,
       help: 'Describe the inventory policy and procedures for all media, hardware, and IT equipment.',
       question: 'Are all media, hardware, or other IT equipment that contains sensitive information regarding the import\/export process accounted for through regular inventories?'},
      {sort: 17, id: 'q183', msc: '4.13', profile: '193', done: true, criteria: 'Sanitized/Destroyed to NIST Standard', must: true,
       help: 'Describe the procedures for the disposal of all media, hardware, and IT equipment.',
       question: 'When disposed, are they properly sanitized and\/or destroyed in accordance with the National Institute of Standards and Technology (NIST) Guidelines for Media Sanitization or other appropriate industry guidelines?'},
      {sort: 18, id: 'q184', msc: '4.10', profile: '194', done: true, criteria: 'Personal Devices', must: true,
       help: 'Are employees allowed to use personal devices to conduct company business?  If yes, are the employees required to adhere to the company\'s cybersecurity policies/procedures?',
       question: 'If employees are allowed to use personal devices to conduct company work, do all such devices adhere to the company\'s cybersecurity policies and procedures to include regular security updates and a method to securely access the company\'s network?'},
      {sort: 19, id: 'q185', msc: '4.8', profile: '195', done: true, criteria: 'Individually Assigned Accounts', must: true,
       help: 'Describe the IT policies for individual account assignment.',
       question: 'Do individuals with access to IT systems use individually assigned accounts?'},
      {sort: 20, id: 'q186', msc: '4.8', profile: '196', done: true, criteria: 'Passwords/Authentication', must: true,
       help: 'Describe the IT system security policies pertaining to passwords/passphrases or other forms of authentication requirements.',
       question: 'Is access to IT systems protected from infiltration via the use of strong passwords, passphrases, or other forms of authentication and is user access to IT systems safeguarded?'},
      {sort: 21, id: 'q187', msc: '4.7', profile: '197', done: true, criteria: 'Restricted User Access', must: true,
      help: 'Describe the procedures to restrict user access to information technology systems.',
      question: 'Is user access restricted based on job description or assigned duties?'},
      {sort: 22, id: 'q188', msc: '4.7', profile: '198', done: true, criteria: 'Access Reviewed Regularly', must: true,
      help: 'Describe the procedure for review of current employee system accesses against job requirements.',
      question: 'Is authorized access reviewed on a regular basis to ensure access to sensitive systems is based on job requirements?'},
      {sort: 23, id: 'q189', msc: '4.7', profile: '199', done: true, criteria: 'Access Removed', must: true,
      help: 'Describe the procedures for removal of system access upon an employee\'s exit/separation from the company.',
      question: 'Is computer and network access removed upon employee separation?'},
      {sort: 24, id: 'q190', msc: '4.9', profile: '200', done: true, criteria: 'Secure Remote Connection to Network', must: true,
      help: 'Are employees allowed to remotely connect to the company\'s network?  If yes, describe the policy/procedures for remote connectivity via virtual private networks (VPNs) or multi-factor authentication etc.',
      question: 'When users are allowed to remotely connect to a network, are secure technologies employed, such as virtual private networks (VPNs), to allow employees to access the company\'s intranet securely when located outside of the office?'},
      {sort: 25, id: 'q191', msc: '4.9', profile: '200', done: true,
       criteria: 'Procedures Prevent Remote Access Unauthorized Users', must: true,
      help: '',
      question: 'Are procedures in place that are designed to prevent remote access from unauthorized users?'}
    ]);

    for (let i = 0; i < 11; i++){
      let doneFlag = true;
      for (const subSection of this.sections[i]){
        doneFlag = doneFlag && subSection.done;
      }
      this.sectionDone[i] = doneFlag;
      this.submitEnabled = this.submitEnabled && this.sectionDone[i];
    }
  }
}


