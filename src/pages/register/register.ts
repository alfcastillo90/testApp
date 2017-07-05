import { Component } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Nav, Platform, AlertController, LoadingController, NavController, NavParams, ToastController, MenuController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { PasswordresetPage } from '../passwordreset/passwordreset';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as Globals from '../../app/globals';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public items: any = [];
  public loader: any;
  public email: any;
  public password: any;
  public firstname: any;
  public lastname: any;
  public phoneNumber: any;
  registerForm: FormGroup;

  constructor(public http: Http,private splashscreen: SplashScreen, public viewCtrl: ViewController, public platform: Platform, public menuCtrl: MenuController, public navCtrl: NavController, public alertCtrl: AlertController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navParams: NavParams) {
    this.registerForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
    this.menuCtrl.enable(false);
    this.platform.ready().then(() => {
      this.splashscreen.hide();
    });
  }
  ionViewWillEnter() {
    if (sessionStorage.getItem('userid') != null) {
      this.sendNotification('Bienvenido de nuevo ' + sessionStorage.getItem('userid'), true);
    }
    this.backbuttonAction();
  }

  logForm() {
    console.log(this.registerForm.value)
  }
  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  submit() {
    this.loader = this.loadingCtrl.create({
      content: "Iniciando sesi&oacute;n..."
    });
    this.loader.present();
    this.email = this.registerForm.controls["email"].value;
    this.firstname = this.registerForm.controls["firstname"].value;
    this.lastname = this.registerForm.controls["lastname"].value;
    this.phoneNumber = this.registerForm.controls["phoneNumber"].value;
    this.password = this.registerForm.controls["password"].value;
    this.setUserInformation();
    this.loader.dismiss();
  }
  setUserInformation() {
    this.email = this.email.replace("@","%40");
    let headers: any = new Headers({ 
                                  'Accept':Globals.Type,
                                  'App':Globals.App,
                                  'Content-Type': Globals.Type,
                                  'Password':this.password
                                });
    let options : any = new RequestOptions({"headers":headers});
    let url : any = Globals.ApiURI+this.email+"?firstname="+this.firstname+"&lastname="+this.lastname+"&phoneNumber="+this.phoneNumber;
    this.http.put(url,"",options).map(res => res.json()).subscribe(data =>{
      
      this.items = data;
      if(this.items.active){
        if(this.items.active == true){
            this.sendNotification('Bienvenido ' + this.email, true);
            sessionStorage.setItem('userid', "1");
            sessionStorage.setItem('username', this.email);
         }
         else {
            this.showAlert('Inicio de sesión fallido', 'Usuario y/o contraseña erroneos');
         }     
      }
       
    });
  }

  sendNotification(message, login = false): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
    if (login == true) {
      this.navCtrl.setRoot(HomePage);
    }
  }
  registerPage(){
    this.navCtrl.setRoot(RegisterPage);
  }
  recoveryPassword(){
    this.navCtrl.setRoot(PasswordresetPage)
  }
  backbuttonAction() {
    this.platform.registerBackButtonAction(() => {
      let backbutton = this.alertCtrl.create({
        message: '¿Desea salir de la aplicacion?',
        buttons: [{
          text: 'Si',
          handler: () => {
            this.platform.exitApp();
          }
        }, {
          text: 'No',
          handler: () => {

          }
        }]
      });
      backbutton.present();
    }, 9);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
