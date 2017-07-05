import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Nav, Platform, AlertController, LoadingController, NavController, NavParams, ToastController, MenuController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import 'rxjs/add/operator/map';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as Globals from '../../app/globals';

@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {

  public items: any = [];
  public loader: any;
  public email: any;
  resetForm: FormGroup;
  constructor(public http: Http, private splashscreen: SplashScreen, public viewCtrl: ViewController, public platform: Platform, public menuCtrl: MenuController, public navCtrl: NavController, public alertCtrl: AlertController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navParams: NavParams) {
    this.resetForm = formBuilder.group({
      email: ['', Validators.required]
    });
    this.menuCtrl.enable(false);
    this.platform.ready().then(() => {
      this.splashscreen.hide();
    });
  }
  logForm() {
    console.log(this.resetForm.value)
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
    this.email = this.resetForm.controls["email"].value;
    this.setEmail();
    this.loader.dismiss();
  }
  setEmail() {
    this.email = this.email.replace("@","%40");
    let headers: any = new Headers({ 
                                  'Accept':Globals.Type,
                                  'App':Globals.App,
                                  'Content-Type': Globals.Type
                                });
    let options : any = new RequestOptions({"headers":headers});
    let url : any = Globals.ApiURI+this.email;
    this.http.get(url,options).subscribe(data =>{
      console.log(data.status);      
      if(data.status == 200){
          this.sendNotification("El sistema le enviara un correo con instrucciones");
      }
       
    });
  }

  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
  registerPage(){
    this.navCtrl.setRoot(RegisterPage);
  }
  loginPge(){
    this.navCtrl.setRoot(LoginPage);
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
