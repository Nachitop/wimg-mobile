import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { Pais } from '../../app/models/pais.model';
import { RegistroProvider } from '../../providers/registro/registro';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { Usuario } from '../../app/models/usuario.model';
import { Persona } from '../../app/models/persona.model';
import { HomePage } from '../home/home';



/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  form:FormGroup;
  emailExiste:boolean;
  image:any;
  paises:Pais[]=[];
  passCoincide:boolean;
  loader:any;
  foto:string="data:image/png;base64,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";
  constructor(public loadingCtrl: LoadingController,public alertsService:AlertsProvider,public registroService:RegistroProvider ,public loginService:LoginProvider,public fb:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.iniciarForm();
    
    this.obtenerPaises();
    this.loader = this.loadingCtrl.create({
      content: "Please wait... Registration already in proccess",
    
    });
  }

  ionViewDidLoad() {
 
    
  }
  
  iniciarForm(){
    this.form=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6), Validators.maxLength(10)]],
      confirm_password:['',[Validators.required]],
      nombre:['',[Validators.required,Validators.maxLength(20)]],
      apellido:['',[Validators.required,Validators.maxLength(20)]],
      pais:['',[Validators.required]],
      foto:['',[]]
    });
    this.disableInputs();
    this.onChanges();
  }

  disableInputs(){
    this.form.controls.password.disable();
    this.form.controls.confirm_password.disable();
    this.form.controls.nombre.disable();
    this.form.controls.apellido.disable();
    this.form.controls.pais.disable();
  }
  
// changeListener($event) : void {
//   this.readThis($event.target);
// }

// readThis(inputValue: any): void {
//   var file:File = inputValue.files[0];
//   var myReader:FileReader = new FileReader();

//   myReader.onloadend = (e) => {
//     this.image = myReader.result;
//     console.log(this.image)
//   }
//   myReader.readAsDataURL(file);
 
// }

  onChanges(){
    this.form.controls['email'].valueChanges.subscribe(val=>{
      let value=val as string;
      if(value.length>0){
        this.loginService.validarEmail(value).subscribe(res=>{
          let resp=JSON.stringify(res);
          let resp2=JSON.parse(resp);
          console.log(resp2)
          if(resp2.estado==1){
            this.emailExiste=true;
         
          }else{
            this.emailExiste=false;
            this.form.controls.password.enable();
          }
        });
      }
    });


    this.form.controls.password.valueChanges.subscribe(res=>{{
      if(this.form.controls.password.valid){
        console.log("hola")
        this.form.controls.confirm_password.enable();
      }
    }});

    this.form.controls.confirm_password.valueChanges.subscribe(res=>{
      if(res===this.form.controls.password.value){
        this.passCoincide=true;
        this.form.controls.nombre.enable();
        this.form.controls.apellido.enable();
        this.form.controls.pais.enable();
      }
      else{
        this.passCoincide=false;
      }
    })
     
    




    
  }

 registrarse(){
  this.loader.present();

  let turista:Persona= new Persona();
  turista.nombre=this.form.controls.nombre.value;
  turista.apellido=this.form.controls.apellido.value;
  turista.id_pais=this.form.controls.pais.value;
  turista.email=this.form.controls.email.value;
  turista.foto=this.foto
  this.registroService.registrarInfoTurista(turista).subscribe(res=>{
    let resp=JSON.stringify(res);
    let resp2=JSON.parse(resp);
    if(resp2.estado==1){

      let usuario:Usuario=new Usuario();
      usuario.email=this.form.controls.email.value;
      usuario.password=this.form.controls.password.value;
      usuario.estado=1;
    
    
      this.registroService.registrarUsuario(usuario).subscribe(res=>{
        let resp=JSON.stringify(res);
        let resp2=JSON.parse(resp);
        if(resp2.estado==1){
          this.navCtrl.push(HomePage,{
             email:turista.email
        });
        this.loader.dismiss();
        }
        else{
         
          this.alertsService.showAlert("Sign up error","User has not been created for internal errors server");
        }
      });
     
    }
    else{
      this.loader.dismiss();
      this.alertsService.showAlert("Sign up error","User info registration failed for internal errors server");
    }
  });





 }

 obtenerPaises(){
  this.registroService.obtenerPaises().subscribe(res=>{
   let resp=JSON.stringify(res);
    let resp2=JSON.parse(resp);

    if(resp2.estado==1){
      this.paises=resp2.Paises;
    }
    else{
      this.alertsService.showAlert("Server error","Countries haven't been found. Unable to sign up.")
      this.navCtrl.push('HomePage');
    }
  })
 }

}
