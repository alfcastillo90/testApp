import { Component } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Nav, Platform, AlertController, LoadingController, NavController, NavParams, ToastController, MenuController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { PasswordresetPage } from '../passwordreset/passwordreset';
import { RegisterPage } from '../register/register';
import 'rxjs/add/operator/map';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as Globals from '../../app/globals';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public items: any = [];
  public loader: any;
  public username: any;
  public password: any;
  loginForm: FormGroup;
  constructor(public http: Http,private splashscreen: SplashScreen, public viewCtrl: ViewController, public platform: Platform, public menuCtrl: MenuController, public navCtrl: NavController, public alertCtrl: AlertController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navParams: NavParams) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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
    console.log(this.loginForm.value)
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
    this.username = this.loginForm.controls["username"].value;
    this.password = this.loginForm.controls["password"].value;
    this.setUserAndPassword();
    this.loader.dismiss();
  }
  setUserAndPassword() {
    this.username = this.username.replace("@","%40");
    let headers: any = new Headers({ 
                                  'Accept':Globals.Type,
                                  'App':Globals.App,
                                  'Content-Type': Globals.Type,
                                  'Password':this.password
                                });
    let options : any = new RequestOptions({"headers":headers});
    let url : any = Globals.ApiURI+this.username;
    this.http.put(url,"",options).map(res => res.json()).subscribe(data =>{
      
      this.items = data;
      if(this.items.active){
        if(this.items.active == true){
            this.sendNotification('Bienvenido ' + this.username, true);
            sessionStorage.setItem('userid', "1");
            sessionStorage.setItem('username', this.username);
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
