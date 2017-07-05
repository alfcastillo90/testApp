import { Component } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController, NavController, NavParams, ToastController, MenuController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SplashScreen } from '@ionic-native/splash-screen';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public items: any = [];
  public loader: any;
  public username: any;
  public password: any;
  public contador: number;
  loginForm: FormGroup;
  constructor(private splashscreen: SplashScreen, public viewCtrl: ViewController, public platform: Platform, public menuCtrl: MenuController, public navCtrl: NavController, public alertCtrl: AlertController, private formBuilder: FormBuilder, public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navParams: NavParams) {
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
    let username: string = this.loginForm.controls["username"].value, password: string = this.loginForm.controls["password"].value;
    this.setUserAndPassword(username, password);
    this.loader.dismiss();
  }
  setUserAndPassword(username, password) {
    if (username == "demo" && password == "demo") {
      this.sendNotification('Bienvenido ' + username, true);
      sessionStorage.setItem('userid', "1");
      sessionStorage.setItem('username', username);
    }
    else {
      this.showAlert('Inicio de sesión fallido', 'Usuario y/o contraseña erroneos')
    }
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

  backbuttonAction() {
    this.platform.registerBackButtonAction(() => {
      let backbutton = this.alertCtrl.create({
        message: '¿Desea salir de la aplicacion y Cerrar sesión?',
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
