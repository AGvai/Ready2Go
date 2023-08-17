function calculateRate() {
    const carType = document.getElementById("carType").value;
    const mileage = parseFloat(document.getElementById("mileage").value);
    
    const economyRate = parseFloat(document.getElementById("economyRate").value);
    const economyAdditonalRate = parseFloat(document.getElementById("economyAdditonalRate").value);
    const premiumRate = parseFloat(document.getElementById("premiumRate").value);
    const premiumAdditonalRate = parseFloat(document.getElementById("premiumAdditonalRate").value);
    const luxuryRate = parseFloat(document.getElementById("luxuryRate").value);
    const luxuryAdditonalRate = parseFloat(document.getElementById("luxuryAdditonalRate").value);
    
    const rate = calculateRateBasedOnMileage(carType, mileage, economyRate, economyAdditonalRate, premiumRate,premiumAdditonalRate, luxuryRate, luxuryAdditonalRate);
    
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Rental Rate: $${rate.toFixed(2)}`;
}

function calculateRateBasedOnMileage(carType, mileage, economyRate, economyAdditonalRate, premiumRate,premiumAdditonalRate, luxuryRate, luxuryAdditonalRate) {
	economyRate = economyRate || 10;
	economyAdditonalRate = economyAdditonalRate || 0.15;
	premiumRate = premiumRate || 20;
	premiumAdditonalRate = premiumAdditonalRate || 0.3;
	luxuryRate = luxuryRate || 10;
	luxuryAdditonalRate = luxuryAdditonalRate || 0.15;
    let baseRate, additionalRate;
    

   
    switch (carType) {
		case "Economy":
			 baseRate = economyRate; 
   			 additionalRate = economyAdditonalRate;  
			break;
		case "Premium":
			 baseRate = premiumRate; 
   			 additionalRate = premiumAdditonalRate;  
			break;
    	case "Luxury":
			 baseRate = luxuryRate; 
   			 additionalRate = luxuryAdditonalRate;  
			break;
		default:
			baseRate = 50; 
   			additionalRate = 0.5;
    }
    
    let totalRate = baseRate;
    if (mileage > 3) {
        const additionalMiles = mileage - 3;
        totalRate += additionalMiles * additionalRate;
    }
    return totalRate;
}

function clearForm() {
    document.getElementById("carType").selectedIndex = 0;
    document.getElementById("mileage").value = "";
    document.getElementById("economyRate").value = "";
    document.getElementById("economyAdditonalRate").value = "";
    document.getElementById("premiumRate").value = "";
    document.getElementById("premiumAdditonalRate").value = "";
    document.getElementById("luxuryRate").value = "";
    document.getElementById("luxuryAdditonalRate").value = "";
    document.getElementById("result").textContent = "Rental Rate: $0.00";
}

function clearVehicle(){
    document.getElementById("vehicleReg").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("model").value = "";
    document.getElementById("seats").value = "";
    document.getElementById("carType").selectedIndex = 0;
    document.getElementById("availability").selectedIndex = 0;
}

function toggleForms() {
    const carType = document.getElementById("carType").value;
    const economyForm = document.getElementById("economyForm");
    const premiumForm = document.getElementById("premiumForm");
    const luxuryForm = document.getElementById("luxuryForm");
    
    economyForm.style.display = carType === "Economy" ? "block" : "none";
    premiumForm.style.display = carType === "Premium" ? "block" : "none";
    luxuryForm.style.display = carType === "Luxury" ? "block" : "none";
}

let vehiclesArray = [];

function saveVehicle() {
    const vehicleReg = document.getElementById("vehicleReg").value;
    const existingVehicle = vehiclesArray.find(vehicle=>vehicle.vehicleReg===vehicleReg);
    if (existingVehicle){
		alert(`${vehicleReg} already exists`);
		return;
	}
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const seats = parseInt(document.getElementById("seats").value);
    const carType = document.getElementById("carType").value;
    const availability = document.getElementById("availability").value;

    const vehicle = {
        vehicleReg: vehicleReg,
        brand: brand,
        model: model,
        seats: seats,
        carType: carType,
        availability: availability
    };

    vehiclesArray.push(vehicle);

    updateVehicleDropdown();
    console.log("Vehicle saved:", vehicle);
}

function updateVehicleDropdown() {
    const dropdown = document.getElementById("vehicleDropdown");
    dropdown.innerHTML = "";

    for (const vehicle of vehiclesArray) {
        const option = document.createElement("option");
        option.value = JSON.stringify(vehicle);
        option.textContent = `${vehicle.brand} ${vehicle.model} (${vehicle.vehicleReg})`;
        dropdown.appendChild(option);
    }
    }



	const form = document.getElementById("driverForm");
//	const submitButton = document.getElementById("submitDriver");
	const dList = document.getElementById("driverList")
	const driverList = document.getElementById("driverItems");
	let drivers = [];  
  
function saveDriver(){
		
	const name = document.getElementById("name").value;
	const phoneno = document.getElementById("phoneno").value;
	const licenseNo = document.getElementById("licenseNo").value;
	
	const driver = {
		name: name,
		phoneno: phoneno,
		licenseno: licenseNo,
		available: true,
	};
	
		drivers.push(driver);		
		updateDriverList();	
		
		localStorage.setItem('drivers', JSON.stringify(drivers));
				
		form.reset();
		console.log(drivers);
}

function updateDriverList(){
	driverList.innerHTML = "";
	drivers.forEach((driver, index) => {
    const list = document.createElement("li");
    const vehicleDropdown = generateVehicleDropdown(driver);
    list.innerHTML = `
      <strong>Name:</strong> ${driver.name} | 
      <strong>Phone:</strong> ${driver.phoneno} | 
      <strong>License No:</strong> ${driver.licenseno} | 
      <strong>Available:</strong> ${driver.available ? "Yes" : "No"} |
      <strong>Vehicle Availability:</strong> ${getVehicleAvailability(driver.vehicleReg)} 
      <button onclick="modifyDriver(${index})">Modify</button>
      <button onclick="toggleAvailability(${index})">${driver.available ? "Mark Unavailable" : "Mark Available"}</button>
      ${vehicleDropdown}
      <button onclick="deleteDriver(${index})">Delete</button>
    `;
    driverList.appendChild(list);
  });
}

function getDriversFromLocalStorage() {
  const savedDrivers = localStorage.getItem('drivers');
  if (savedDrivers) {
    drivers = JSON.parse(savedDrivers);
    updateDriverList();
  }
}

function generateVehicleDropdown(driver) {
    const availableVehicles = vehiclesArray.filter(vehicle => vehicle.availability === "Available");
    const dropdown = document.createElement("select");
    dropdown.id = `vehicleDropdown_${driver.licenseno}`;
    dropdown.innerHTML = `<option value="" selected disabled>Select Vehicle</option>`;
    
    availableVehicles.forEach(vehicle => {
        const option = document.createElement("option");
        option.value = vehicle.vehicleReg;
        option.textContent = `${vehicle.brand} ${vehicle.model} (${vehicle.vehicleReg})`;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", function () {
        const selectedVehicleReg = this.value;
        updateDriverVehicle(driver.licenseno, selectedVehicleReg);
    });

    return dropdown.outerHTML;
}

function updateDriverVehicle(licenseNo, vehicleReg) {
    const driver = drivers.find(driver => driver.licenseno === licenseNo);
    driver.vehicleReg = vehicleReg;

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
    updateLocalStorage();
    updateDriverList();
  }
}

function deleteDriver(index) {
  drivers.splice(index, 1);
  updateLocalStorage();
  updateDriverList();
}

function updateLocalStorage() {
  localStorage.setItem('drivers', JSON.stringify(drivers));
}

function toggleAvailability(index) {
  const driver = drivers[index];
  driver.available = !driver.available;
  updateDriverList();
}

function getVehicleAvailability(vehicleReg) {
    const vehicle = vehiclesArray.find(vehicle => vehicle.vehicleReg === vehicleReg);
    return vehicle ? vehicle.availability : "N/A";
}

