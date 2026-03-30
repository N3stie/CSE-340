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
    // Convert to match database format
    let dbName;
    if (classificationName.toLowerCase() === 'suv') {
      dbName = 'SUV';
    } else {
      dbName = classificationName.charAt(0).toUpperCase() + classificationName.slice(1).toLowerCase();
    }
    
    console.log('🔍 Looking for:', dbName);
    
    const sql = `SELECT * FROM inventory 
                 JOIN classification ON inventory.classification_id = classification.classification_id 
                 WHERE classification.classification_name = $1`;
    const result = await pool.query(sql, [dbName]);
    
    console.log('🔍 Found:', result.rows.length, 'vehicles');
    return result.rows;
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
}

module.exports = { getVehicleById, getVehiclesByClassification };