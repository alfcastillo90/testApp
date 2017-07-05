import { FormControl } from '@angular/forms';
export class AgeValidator{
    static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "Indique un numero": true
            };
        }
        if(control.value < 18){
            return {
                "Tiene que ser mayor de 18 años": true
            };
        }
 
        if (control.value > 65){
            return {
                "No aceptamos personas de tercera edad": true
            };
        }
 
        return null;
    }
}