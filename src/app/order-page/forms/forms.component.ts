import { Component, OnInit } from '@angular/core';
import { Instrument } from '../../instrument';
import { instruments } from '../../instruments';
import { formInputs } from './inputs';
import {  CurrencyPipe } from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})

export class FormsComponent implements OnInit {
  myFormValueChanges$;
  form: FormGroup;
  instruments = instruments;
  totalSum: number;
  formInputs = formInputs;
  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe
    ) {

   }

  /**
 * Form initialization
 */

  ngOnInit(): void {
    // create form with validators and dynamic rows array
    this.form = this.fb.group({
      clientName: ['', [Validators.required,Validators.maxLength(30)]],
      phoneNumber: [''],
      email: [''],
      department: [''],
      instrumentList: this.fb.array([
        // load first row at start
        this.getInstrumentList()
     ])
    });
        // initialize stream on instrumentList
    this.myFormValueChanges$ = this.form.controls['instrumentList'].valueChanges;
    // subscribe to the stream so listen to changes on instrumentList
    this.myFormValueChanges$.subscribe(instrumentList => this.updateTotalPrice(instrumentList));
  }

    /**
   * unsubscribe listener
   */

  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }

    /**
   * Create form instrumentList
   */

  private getInstrumentList() {
    const numberPatern = '^[0-9.,]+$';
    return this.fb.group({
      instrumentName: ['', Validators.required],
      qty: [1, [Validators.required, Validators.pattern(numberPatern)]],
      unitPrice: ['', [Validators.required, Validators.pattern(numberPatern)]],
      totalPrice: [{value: '', disabled: true}]
    });
  }

    /**
   * get instrumentList. This is called by *ngFor Loop in DOM
   */

  get instrumentList() {
    return this.form.get('instrumentList') as FormArray;
  }

    /**
   * add a new instrumentList. This is called by 'add instrument' button in DOM
   */

  addInstrument(){
    const control = <FormArray>this.form.controls['instrumentList'];
    control.push(this.getInstrumentList());
  }
    /**
   * remove an  instrumentList. This is called by the remove button in DOM
   */

  remInstrument(i: number){
    const control = <FormArray>this.form.controls['instrumentList'];
    control.removeAt(i)

  }

      /**
   * clear all instrumentLists except one. This is called by 'clear' button in DOM
   */


  clearAllInstruments() {
    const control = <FormArray>this.form.controls['instrumentList'];
    while(control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
    control.push(this.getInstrumentList());
  }
  private updateTotalPrice(instrumentList: any) {
    // get our instrumentList group controll
    const control = <FormArray>this.form.controls['instrumentList'];
    // before recount total price need to be reset. 
    this.totalSum = 0;
    for (let i in instrumentList) {
      let totalPrice = (instrumentList[i].qty*instrumentList[i].unitPrice);
      // now format total price with angular currency pipe
      let totalPriceFormatted = this.currencyPipe.transform(totalPrice, 'GHS', 'symbol', '1.2-2');
      // update total sum field on instrument and do not emit event myFormValueChanges$ in this case on instrumentList
      control.at(+i).get('totalPrice').setValue(totalPriceFormatted, {onlySelf: true, emitEvent: false});
      // update total price for all instrumentList
      this.totalSum += totalPrice;
    }
  }

  print(model: any){
    const doc = new jsPDF();
    //doc.text(JSON.stringify(model), 50, 50);
    //doc.autoPrint();
    //This is a key for printing
    //doc.output('dataurlnewwindow');
    console.log(model.clientName);
  }

}
