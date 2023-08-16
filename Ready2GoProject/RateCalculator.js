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