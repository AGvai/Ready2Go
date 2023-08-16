const form = document.getElementById("customerForm");
const submitButton = document.getElementById("submitCustomerButton");
const emailInput = document.getElementById("email");

form.addEventListener("submit", function(event){
	event.preventDefault();
	
	let customers = [];
	
		const name = document.getElementById("name").value;
		const phoneno = document.getElementById("phoneno").value;
		const address = document.getElementById("address").value;
		const email = document.getElementById("email").value;
		
		validate_email();
	
		const randomId = generateRandomId();
	
		const customer = {
			id: randomId,
			password: null,
			name: name,
			phoneno: phoneno,
			address: address,
			email: email
		}
	
		customers.push(customer);
	
		form.reset();
	
		const newPassword = prompt("Please enter a password for your account:");
        	if (newPassword !== null) {
            	customer.password = newPassword;
            	}
	
		console.log(customers);
	}

);


	function generateRandomId() {
    	const randomNumber = Math.floor(Math.random() * 100000000);
    	const randomId = randomNumber.toString().padStart(8, '0');
    	return randomId;
	}
	
	function validate_email(){
	valid =true;
	
	if(form.email.value.indexOf("@") === -1){
		alert("Please enter valid Email")
		valid = false;
	}
	
	return valid;
}

