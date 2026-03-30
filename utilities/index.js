function formatPrice(price) {
    return '$' + parseInt(price).toLocaleString();
}

function formatMileage(miles) {
    return parseInt(miles).toLocaleString();
}

// this function builds the HTML for the vehicle detail page, including the reserve button and modal form
function buildVehicleDetailHtml(vehicle) {
    return `
        <div class="vehicle-detail">
            <div class="vehicle-detail-image">
                <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
            </div>
            <div class="vehicle-detail-info">
                <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
                <p class="price"><strong>Price:</strong> ${formatPrice(vehicle.inv_price)}</p>
                <p class="mileage"><strong>Mileage:</strong> ${formatMileage(vehicle.inv_miles)} miles</p>
                <p class="color"><strong>Color:</strong> ${vehicle.inv_color}</p>
                <p class="description"><strong>Description:</strong> ${vehicle.inv_description}</p>
                <button class="reserve-btn" onclick="openReserveForm()">Click for Reserve</button>
            </div>
        </div>

        <!-- Modal - Add this -->
        <div id="reserveModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3>Reserve This Vehicle</h3>
                <form id="reserveForm">
                    <input type="text" id="fullName" placeholder="Full Name" required>
                    <input type="email" id="email" placeholder="Email" required>
                    <input type="tel" id="phone" placeholder="Phone Number" required>
                    <textarea id="message" placeholder="Message (optional)"></textarea>
                    <button type="submit">Submit Reservation</button>
                </form>
            </div>
        </div>
    `;
}

module.exports = { formatPrice, formatMileage, buildVehicleDetailHtml };