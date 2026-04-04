const pool = require('../database/db');

async function getVehicleById(vehicleId) {
  try {
    const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
    const result = await pool.query(sql, [vehicleId]);
    return result.rows[0];
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
}

// Get vehicles by classification name
async function getVehiclesByClassification(classificationName) {
  try {
    let dbName;
    if (classificationName.toLowerCase() === 'suv') {
      dbName = 'SUV';
    } else {
      dbName = classificationName.charAt(0).toUpperCase() + classificationName.slice(1).toLowerCase();
    }
    
    console.log('Looking for:', dbName);
    
    const sql = `SELECT * FROM inventory 
                 JOIN classification ON inventory.classification_id = classification.classification_id 
                 WHERE classification.classification_name = $1`;
    const result = await pool.query(sql, [dbName]);
    
    console.log('Found:', result.rows.length, 'vehicles');
    return result.rows;
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
}

// Adding new classification
async function addClassification(classificationName) {
    try {
        console.log('Inserting classification:', classificationName);
        const sql = 'INSERT INTO classification (classification_name) VALUES ($1) RETURNING *';
        const result = await pool.query(sql, [classificationName]);
        console.log('Insert successful:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Model error:', error);
        throw error;
    }
}

// Get all classifications (for dropdown)
async function getAllClassifications() {
    try {
        const sql = 'SELECT * FROM classification ORDER BY classification_name';
        const result = await pool.query(sql);
        return result.rows;
    } catch (error) {
        console.error('Model error:', error);
        throw error;
    }
}

// Add new vehicle
async function addVehicle(vehicleData) {
    try {
        const sql = `INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
        
        const values = [
            vehicleData.inv_make,
            vehicleData.inv_model,
            vehicleData.inv_year,
            vehicleData.inv_description || '',
            '/images/no-image.jpg',
            '/images/no-image-tn.jpg',
            vehicleData.inv_price,
            vehicleData.inv_miles,
            vehicleData.inv_color,
            vehicleData.classification_id
        ];
        
        const result = await pool.query(sql, values);
        console.log('Vehicle added successfully:', result.rows[0].inv_id);
        return result.rows[0];
    } catch (error) {
        console.error('Model error adding vehicle:', error);
        throw error;
    }
}

module.exports = { getVehicleById, getVehiclesByClassification, addClassification, getAllClassifications, addVehicle };