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

module.exports = { getVehicleById };