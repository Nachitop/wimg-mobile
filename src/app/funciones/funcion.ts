import { Geo } from "../models/geolocation.model";

export function obtenerProvincia(value:string){
    if(value=="Sin.")
    {
        value="Sinaloa"
    }
    console.log(value);
    return value
}

export function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export function calculateEdad(birthday) { // birthday is a date
    
    var b= new Date(Date.parse(birthday));
    var ageDifMs = Date.now() - b.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  export function sexo(sexo:any){
      if(sexo==="M"){
          return "Masculino"
      }
      else{
          return "Femenino"
      }


  }

  export function disponibilidad(disponibilidad){
      if(disponibilidad==="A"){
          return "Activo"
      }
      else{
          if(disponibilidad==="I"){
              return "Inactivo"
          }
          else{ 
              if(disponibilidad==="R")
              return "En recorrido"
          }
      }
  }