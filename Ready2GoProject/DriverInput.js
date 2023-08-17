const form = document.getElementById("driverForm");
const submitButton = document.getElementById("submitDriver");
const driverList = document.getElementById("driverItems");

let drivers = [];  
  
form.addEventListener("submit", function(event){
	event.preventDefault();
		
	const name = document.getElementById("name").value;
	const phoneno = document.getElementById("phoneno").value;
	const licenseno = document.getElementById("licenseno").value;
	
	const driver = {
		name: name,
		phoneno: phoneno,
		licenseno: licenseno,
		available: true
	};
	
		drivers.push(driver);		
		updateDriverList();		
		alert("Driver Added");	
		form.reset();
		console.log(drivers);
});

function updateDriverList(){
	driverList.innerHTML = "";
	drivers.forEach((driver, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Name:</strong> ${driver.name} | 
      <strong>Phone:</strong> ${driver.phoneno} | 
      <strong>License No:</strong> ${driver.licenseno} | 
      <strong>Available:</strong> ${driver.available ? "Yes" : "No"} |
      <button onclick="modifyDriver(${index})">Modify</button>
      <button onclick="toggleAvailability(${index})">${driver.available ? "Mark Unavailable" : "Mark Available"}</button>
    `;
    driverList.appendChild(li);
  });
}

function modifyDriver(index) {
  const driver = drivers[index];
  const newName = prompt("Enter new name:", driver.name);
  const newPhone = prompt("Enter new phone number:", driver.phoneno);
  const newLicense = prompt("Enter new license number:", driver.licenseno);

  if (newName && newPhone && newLicense) {
    driver.name = newName;
    driver.phoneno = newPhone;
    driver.licenseno = newLicense;
    updateDriverList();
  }
}

function toggleAvailability(index) {
  const driver = drivers[index];
  driver.available = !driver.available;
  updateDriverList();
}



