import { Component,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('signupSlider') signupSlider : any;
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    submitAttempt: boolean = false;
    
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
        this.slideOneForm = formBuilder.group({
            firstName : [''],
            lastName : [''],
            age:['']
        });

        this.slideTwoForm = formBuilder.group({
            username : [''],
            password : [''],
            bio:['']
        });
    }
    
    next(){
        this.signupSlider.slideNext();
    }
    
    prev(){
        this.signupSlider.slidePrev();
    }
    
    save(){
        
    }

}
