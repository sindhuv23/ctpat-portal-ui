import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SaveDisMeta } from '../../models/save-dis-meta.model';

import { DisService } from '../../services/dis.service';

@Component({
  selector: 'app-document-history-modal',
  templateUrl: './document-history-modal.component.html',
  styleUrls: ['./document-history-modal.component.scss']
})
export class DocumentHistoryModalComponent implements OnInit, OnDestroy {


  private subscriptions = new Subscription();
  public dataVersions: any[] = [];
  public isUploading = false;
  public documentFile!: File | null;
  public fileName = '';

  constructor(public dialogRef: MatDialogRef<DocumentHistoryModalComponent>, private disService: DisService,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    let vLinks = ["vlink1", "vLink2"]
    for (var i in vLinks) {
      this.dataVersions.push({
        version: i,
        view: vLinks[i], entryId: i
      });
    }

    
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

