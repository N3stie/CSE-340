const invModel = require('image/model/invModel');
const utilities = require('../utilities');

async function getVehicleDetail(req, res) {
  try {
    const vehicleId = req.params.id;
    const vehicleData = await invModel.getVehicleById(vehicleId);

    if (!vehicleData) {
      return res.status(404).send('Vehicle not found');
    }

    const vehicleHtml = utilities.buildVehicleDetailHtml(vehicleData);
    res.render('inventory/detail', {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      vehicleHtml: vehicleHtml
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).send('Server error');
  }
}

module.exports = { getVehicleDetail };