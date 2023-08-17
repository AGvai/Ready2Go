const form = document.getElementById("customerForm");
const submitButton = document.getElementById("submitCustomerButton");
const emailInput = document.getElementById("email");

let customers = [];

form.addEventListener("submit", function(event){
	event.preventDefault();
	
		const name = document.getElementById("name").value;
		const phoneno = document.getElementById("phoneno").value;
		const address = document.getElementById("address").value;
		const email = document.getElementById("email").value;
		
		if (!validate_email()){
			return;
		}
	
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
		
		alert("Customer Added");
	
		form.reset();
	
		const newPassword = prompt("You have been assigned the login ID: " + randomId + "\nPlease enter a password for your account:");
        	if (newPassword !== null) {
            	customer.password = newPassword;
            	}
	
		console.log(customers);
		
//		updateCustomerDropdown();
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

/* function updateCustomerDropdown() {
    const customerDropdown = document.getElementById("customerDropdown");
    customerDropdown.innerHTML = "        ";

    for (const customer of customers) {
        const option = document.createElement("option");
        option.value = JSON.stringify(customer);
        option.textContent = `${customer.name} ${customer.id} (${customer.phoneno})`;
        dropdown.appendChild(option);
    }
} */
