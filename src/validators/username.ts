import { FormControl } from '@angular/forms';
export class UsernameValidator {
      static checkUsername(control: FormControl): any { 
        return new Promise(resolve => {
        setTimeout(() => {
            if(control.value.toLowerCase() === "greg"){
                resolve({
                    "El usuario ya existe": true
                });        
            }
            else {
                resolve(null);
            }
        }, 2000);
        });
    }
}