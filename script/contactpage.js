"use strict";
$(document).ready(function() {

	//pattern for email
	var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
	var phpattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
	/* 
		Reference for phone number pattern
		https://www.abstractapi.com/guides/validate-phone-number-javascript
	*/

	//statement that moves the focus to the Arrival date text box
	$("#first_name").focus();

	//an event handler for the submit event of the form
	$("#contactus_form").submit(evt => {

		//set isvalid to true initially
		let isvalid = true;

		//get value using id and trim it
		const fname = $("#f_name").val().trim();

		//set value to the control
		$("#f_name").val(fname);
		
		//A value must be entered into each text box
		if(fname == ""){
		
			//set text of the control next element
			$("#f_name").next().text("This field is required");
		
			//set isvalid to false
			isvalid = false;
		
		}else{
			//set text of the control next element
			$("#f_name").next().text("");
		}
		
		//get value using id and trim it
		const lname = $("#l_name").val().trim();

		//set value to the control
		$("#l_name").val(lname);
		
		//A value must be entered into each text box
		if(lname == ""){
		
			//set text of the control next element
			$("#l_name").next().text("This field is required");
		
			//set isvalid to false
			isvalid = false;
			
		}else{
			//set text of the control next element
			$("#l_name").next().text("");
		}
		
		
		//get value using id and trim it
		const eaddress = $("#email").val().trim();

		//set value to the control
		$("#email").val(eaddress);
		
		//A value must be entered into each text box
		if(eaddress ==""){
		
			//set text of the control next element
			$("#email").next().text("This field is required");
		
			//set isvalid to false
			isvalid = false;
		
		}else if( !emailPattern.test(eaddress)){  //check if entered value is in correct email format or not
		
			//set text of the control next element
			$("#email").next().text("Must be a valid email address");
		
			//set isvalid to false
			isvalid = false;
		}else{
			//set text of the control next element
			$("#email").next().text("");
		}
		
		//get value using id and trim it
		const phno = $("#phone").val().trim();

		//set value to the control
		$("#phone").val(phno);
		
		//A value must be entered into each text box
		if(phno ==""){
		
			//set text of the control next element
			$("#phone").next().text("This field is required");
		
			//set isvalid to false
			isvalid = false;
		
		}else if( !phpattern.test(phno)){//check if entered value is in correct phno format or not
		
			//set text of the control next element
			$("#phone").next().text("Must be a valid phone number");
		
			//set isvalid to false
			isvalid = false;
		}else{
			//set text of the control next element
			$("#phone").next().text("");
		}

		//if isvalid is ! false then prevent defualt method of the event
		if(!isvalid){
		
			evt.preventDefault();
		
		}
	
	});
}); // end ready