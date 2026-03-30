const invModel = require('../models/invModel');  // Fixing change 'image/model' to '../models'
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

// Adding this new function so that the controller can handle requests for vehicles by classification
async function getVehiclesByClassification(req, res) {
  try {
    const classificationName = req.params.classification;
    console.log('📝 Looking for classification:', classificationName);
    
    const vehicles = await invModel.getVehiclesByClassification(classificationName);
    console.log('🚗 Found vehicles:', vehicles.length);
    
    res.render('classification', { 
      title: `${classificationName} Vehicles`,
      vehicles: vehicles,
      classification: classificationName
    });
  } catch (error) {
    console.error('❌ Controller error:', error);
    res.status(500).render('error');
  }
}

module.exports = { getVehicleDetail, getVehiclesByClassification };