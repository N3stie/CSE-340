const invModel = require('../models/invModel');
const utilities = require('../utilities');

console.log('✅ invController.js loaded');

// Show vehicle detail with reviews
async function getVehicleDetail(req, res) {
  try {
    const vehicleId = req.params.id;
    const vehicleData = await invModel.getVehicleById(vehicleId);
    
    if (!vehicleData) {
      return res.status(404).send('Vehicle not found');
    }
    
    // Get reviews and average rating
    const reviews = await invModel.getReviewsByVehicleId(vehicleId);
    const ratingData = await invModel.getAverageRating(vehicleId);
    
    // Check if user has already reviewed
    let userReviewed = false;
    let user = null;
    
    if (res.locals.loggedIn && res.locals.user) {
      user = res.locals.user;
      userReviewed = await invModel.hasUserReviewed(user.account_id, vehicleId);
    }
    
    // Pass data to the view
    res.render('inventory/detail', {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      vehicle: vehicleData,
      reviews: reviews,
      averageRating: parseFloat(ratingData.average).toFixed(1),
      totalReviews: ratingData.total,
      userReviewed: userReviewed,
      user: user,
      loggedIn: res.locals.loggedIn,
      reviewError: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error');
  }
}

async function getVehiclesByClassification(req, res) {
  try {
    const classificationName = req.params.classification;
    const vehicles = await invModel.getVehiclesByClassification(classificationName);
    res.render('classification', { 
      title: `${classificationName} Vehicles`,
      vehicles: vehicles,
      classification: classificationName
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error');
  }
}

async function addClassification(req, res) {
    try {
        const { classification_name } = req.body;
        const regex = /^[A-Za-z]+$/;
        if (!regex.test(classification_name)) {
            return res.render('inventory/add-classification', {
                title: 'Add New Classification',
                error: 'Classification name must contain only letters'
            });
        }
        const result = await invModel.addClassification(classification_name);
        if (result) {
            res.redirect('/inv');
        } else {
            res.render('inventory/add-classification', {
                title: 'Add New Classification',
                error: 'Failed to add classification'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
}

// Adding full Add Vehicle Functions
async function showAddVehicle(req, res) {
    try {
        const classificationList = await utilities.buildClassificationList();
        res.render('inventory/add-vehicle', {
            title: 'Add New Vehicle',
            classificationList: classificationList,
            error: null,
            vehicle: {}
        });
    } catch (error) {
        console.error('showAddVehicle error:', error);
        res.status(500).render('error');
    }
}

async function addVehicle(req, res) {
    try {
        const { inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color, classification_id, inv_description } = req.body;
        
        const errors = [];
        if (!inv_make) errors.push('Make is required');
        if (!inv_model) errors.push('Model is required');
        if (!inv_year || !/^\d{4}$/.test(inv_year)) errors.push('Year must be 4 digits');
        if (!inv_price || isNaN(inv_price)) errors.push('Price must be a number');
        if (!inv_miles || isNaN(inv_miles)) errors.push('Miles must be a number');
        if (!inv_color) errors.push('Color is required');
        if (!classification_id) errors.push('Classification is required');
        
        if (errors.length > 0) {
            const classificationList = await utilities.buildClassificationList(classification_id);
            return res.render('inventory/add-vehicle', {
                title: 'Add New Vehicle',
                classificationList: classificationList,
                error: errors.join(', '),
                vehicle: req.body
            });
        }
        
        const result = await invModel.addVehicle(req.body);
        
        if (result) {
            res.redirect('/inv');
        } else {
            const classificationList = await utilities.buildClassificationList(classification_id);
            res.render('inventory/add-vehicle', {
                title: 'Add New Vehicle',
                classificationList: classificationList,
                error: 'Failed to add vehicle',
                vehicle: req.body
            });
        }
    } catch (error) {
        console.error('addVehicle error:', error);
        res.status(500).render('error');
    }
}

// ============================================
// REVIEW FUNCTIONS - Final Enhancement
// ============================================

// Submit a review
async function submitReview(req, res) {
    try {
        const inv_id = req.params.id;
        const { rating, comment } = req.body;
        const account_id = res.locals.user.account_id;
        
        // Server-side validation
        const errors = [];
        if (!rating || rating < 1 || rating > 5) errors.push('Rating must be between 1 and 5');
        if (!comment || comment.length < 5) errors.push('Comment must be at least 5 characters');
        
        if (errors.length > 0) {
            // Re-render with errors
            const vehicleData = await invModel.getVehicleById(inv_id);
            const reviews = await invModel.getReviewsByVehicleId(inv_id);
            const ratingData = await invModel.getAverageRating(inv_id);
            let userReviewed = await invModel.hasUserReviewed(account_id, inv_id);
            
            return res.render('inventory/detail', {
                title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
                vehicle: vehicleData,
                reviews: reviews,
                averageRating: parseFloat(ratingData.average).toFixed(1),
                totalReviews: ratingData.total,
                userReviewed: userReviewed,
                user: res.locals.user,
                loggedIn: true,
                reviewError: errors.join(', ')
            });
        }
        
        // Add the review
        await invModel.addReview(account_id, inv_id, rating, comment);
        
        res.redirect(`/inv/detail/${inv_id}`);
        
    } catch (error) {
        console.error('submitReview error:', error);
        res.status(500).render('error');
    }
}

module.exports = { getVehicleDetail, getVehiclesByClassification, addClassification, showAddVehicle, addVehicle, submitReview };