import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

declare var Cookies: any;

@Component({
  selector: 'app-main-flow',
  templateUrl: './main-flow.component.html',
  styleUrls: ['./main-flow.component.scss']
})
export class MainFlowComponent implements OnInit {
  sandOptions: FormGroup;

  toppingsOptions: string[];

  selectedType: string;
  toppingsSelected: boolean[];
  toppingsSelectedStrings: string[];

  sandTypeErrorExist: boolean;
  sandToppingErrorExist: boolean;

  onSandTypeChanges(): void {
    this.sandOptions.valueChanges.subscribe(val => {
      this.selectedType = val.selectedSandType;
      if (val.selectedSandType === 'ham') {
        this.toppingsSelected = [true, false, false, false, false, false, false];
        this.sandTypeErrorExist = false;
      } else if (val.selectedSandType === 'turkey') {
        this.toppingsSelected = [false, true, false, false, false, false, false];
        this.sandTypeErrorExist = false;
      } else if (val.selectedSandType === 'chicken') {
        this.toppingsSelected = [false, false, true, false, false, false, false];
        this.sandTypeErrorExist = false;
      } else if (val.selectedSandType === 'veggie') {
        this.toppingsSelected = [false, false, false, false, true, true, false];
        this.sandTypeErrorExist = false;
      } else if (val.selectedSandType === 'custom') {
        this.toppingsSelected = [false, false, false, false, false, false, false];
        this.sandTypeErrorExist = false;
      } else {
        this.sandTypeErrorExist = true;
      }
      this.onSandToppingsChanges();
    });
  }

  onSandToppingsChanges(): void {
    this.sandToppingErrorExist = true;

    for (const topping of this.toppingsSelected) {
      if (topping === true) {
        this.sandToppingErrorExist = false;
      }
    }
  }

  orderSubmit(): void {
    this.toppingsSelectedStrings = [];

    for (const i in this.toppingsSelected) {
      if (this.toppingsSelected[i] === true) {
        this.toppingsSelectedStrings.push(this.toppingsOptions[i]);
      }
    }

    console.log(JSON.stringify({
      'hash': Cookies.get('hashid'),
      'status': 0,
      'toppings': this.toppingsSelectedStrings
    });

    this.http.post('http://localhost:3000/api/orders', JSON.stringify({
      'hash': Cookies.get('hashid'),
      'status': 0,
      'toppings': this.toppingsSelectedStrings
    }), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(data => {
      console.log(data);
    });
  }

  constructor(private http: HttpClient, private _formBuilder: FormBuilder, private _router: Router) {
    this.toppingsOptions = ['Ham', 'Turkey', 'Chicken', 'Cheese', 'Lettuce', 'Tomatoes', 'Mustard'];

    this.toppingsSelected = [false, false, false, false, false, false, false];

    this.sandTypeErrorExist = true;
    this.sandToppingErrorExist = true;

    this.sandOptions = _formBuilder.group({
      hideRequired: false,
      selectedSandType: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
    if (Cookies.get('hashid') == null) {
      this._router.navigateByUrl('');
    }

    this.onSandTypeChanges();
    this.onSandToppingsChanges();
  }

}
