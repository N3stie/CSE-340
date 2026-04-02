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

// ADD THIS NEW FUNCTION for adding classification
async function addClassification(req, res) {
    try {
        console.log('📝 addClassification function CALLED!');
        console.log('📝 Request body:', req.body);
        
        const { classification_name } = req.body;
        console.log('📝 Classification name received:', classification_name);
        
        // Check if classification_name exists
        if (!classification_name) {
            console.log('❌ No classification name provided');
            return res.render('inventory/add-classification', {
                title: 'Add New Classification',
                error: 'Classification name is required'
            });
        }
        
        // Server-side validation
        const regex = /^[A-Za-z]+$/;
        if (!regex.test(classification_name)) {
            console.log('❌ Validation failed - invalid characters');
            return res.render('inventory/add-classification', {
                title: 'Add New Classification',
                error: 'Classification name must contain only letters (no spaces or special characters)'
            });
        }
        
        console.log('✅ Validation passed, calling model...');
        
        // Call model to insert
        const result = await invModel.addClassification(classification_name);
        console.log('📝 Model result:', result);
        
        if (result) {
            console.log('✅ Redirecting to /inv');
            res.redirect('/inv');
        } else {
            console.log('❌ Insert failed, no result');
            res.render('inventory/add-classification', {
                title: 'Add New Classification',
                error: 'Failed to add classification. It may already exist.'
            });
        }
    } catch (error) {
        console.error('❌ Controller error:', error);
        res.status(500).render('error');
    }
}

module.exports = { getVehicleDetail, getVehiclesByClassification, addClassification };