// import { Component, OnInit } from '@angular/core';
// import { Validators, FormControl, FormGroup, Form } from '@angular/forms';
// import { HttpService } from '../shared/http.service';
// import { FormBuilder } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-contact',
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.css']
// })
// export class ContactComponent implements OnInit {
//   // emailFormControl = new FormControl("", [
//   //   Validators.required,
//   //   Validators.email
//   // ]);

//   // messageFormControl = new FormControl("", [
//   //   Validators.required,
//   //   Validators.minLength(5)
//   // ]);
//   form !: FormGroup;
//   name : FormControl = new FormControl("", [Validators.required]);
//   email : FormControl = new FormControl("", [Validators.required, Validators.email]);
//   message : FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
//   honeypot : FormControl = new FormControl("");
//   submitted : boolean = false;
//   isLoading : boolean = false;
//   responseMessage !: string;

//   constructor(private formBuilder: FormBuilder ,private http: HttpClient) { 
//     this.form = this.formBuilder.group({
//       name: this.name,
//       email: this.email,
//       message: this.message,
//       honeypot: this.honeypot
//     });
//   }

  
//   // register(){
//   //   let user = {
//   //     email: this.emailFormControl.value,
//   //     message: this.messageFormControl.value
//   //   }
//   //   //this.http.sendEmail()
//   //   if (user.email.length == 0 && user.message.length == 0){
//   //     alert("Please enter valid input in both fields!")
//   //   }
//   //   else if (!user.email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")){
//   //     alert("Please enter a valid email!")
//   //   }
//   //   else if(user.message.length <= 10){
//   //     alert("Message must contain at least 10 characters")
//   //   }
//   //   else{
//   //     alert("Success!")
//   //     console.log(user.email, user.message)
//   //   }
//   // }
  

//   ngOnInit(): void {
//   }
  
//   onSubmit(){
//     if(this.form.status == "VALID" && this.honeypot.value == ""){
//       this.form.disable();
//       var formData: any = new FormData();
//       formData.append("name", this.form.get("name")?.value);
//       formData.append("email", this.email.get("email")?.value);
//       formData.append("message", this.message.get("message")?.value);
//       this.isLoading = true;
//       this.submitted = false;
//       this.http.post("https://script.google.com/macros/s/AKfycbwvO2_nDC9BAnqvqkSeTVLBxD2ulygEaViXsxaYD6klvXqrX1iuskCJgUp6dzgtQQQb/exec", formData).subscribe{
//         (response) =>{
//           if(response["result"] == "success"){
//             this.responseMessage = "Thanks for the message! I'll get back to your soon!";
//           }else{
//             this.responseMessage = "Oops! Something went wrong... Reload the page and try again.";
//           }
//           this.form.enable();
//           this.submitted = true;
//           this.isLoading = false;
//           console.log(response);
//         },
//         (error) => {
//           this.responseMessage = "Oops! An error occured... Reload the page and try again.";

//         };
//         )
//       }
      
//     }
//   }

// }
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  message: FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
  honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage !: string; // the response message to show to the user
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
      honeypot: this.honeypot
    });
  }
  ngOnInit(): void {
  }

  checkError(){
    if (this.name.value == ""){
      alert("Please enter your name.")
    }
    if (!this.email.value.match("^[a-z0-9._%+-]+@[a-z0-9-.]+\\.[a-z]{2,4}$")){
      alert("Please enter a valid email.") 
    }
    if(this.message.value.length < 5){
      alert("Please enter a message with at least 5 or more characters.")
    }
  }

  onSubmit() {
    this.checkError()
    if (this.form.status == "VALID" && this.honeypot.value == "") {
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      var formData: any = new FormData();
      formData.append("name", this.form.get("name")?.value);
      formData.append("email", this.form.get("email")?.value);
      formData.append("message", this.form.get("message")?.value);
      this.isLoading = true; // sending the post request async so it's in progress
      this.submitted = false; // hide the response message on multiple submits
      console.log(this.email, this.message)
      this.http.post("https://script.google.com/macros/s/AKfycbwvO2_nDC9BAnqvqkSeTVLBxD2ulygEaViXsxaYD6klvXqrX1iuskCJgUp6dzgtQQQb/exec", formData).subscribe(
        (response) => {
          
          // choose the response message
          if (response) {
            this.responseMessage = "Thanks for the message! I'll get back to you soon!";
            console.log(response)
          }  else {
              this.responseMessage = "Thanks for the message! I'll get back to you soon!";
              console.log(response)
           }
          this.form.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
        },
        (error) => {
          this.responseMessage = "Oops! An error occurred... Reload the page and try again.";
          this.form.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(error);
        }
      );
    }
  }
}