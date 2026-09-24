const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Courts data file path
const courtsFilePath = path.join(__dirname, '..', 'courts.json');

// Helper function to read courts
const readCourts = () => {
  try {
    if (fs.existsSync(courtsFilePath)) {
      const data = fs.readFileSync(courtsFilePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading courts file:', error);
    return [];
  }
};

// Helper function to write courts
const writeCourts = (courts) => {
  try {
    fs.writeFileSync(courtsFilePath, JSON.stringify(courts, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing courts file:', error);
    return false;
  }
};

// Validate court data
const validateCourt = (court) => {
  const required = ['name', 'type', 'state', 'district', 'address', 'latitude', 'longitude'];
  const missing = required.filter(field => !court[field]);
  
  if (missing.length > 0) {
    return { valid: false, message: `Missing required fields: ${missing.join(', ')}` };
  }
  
  // Validate latitude and longitude
  const lat = parseFloat(court.latitude);
  const lng = parseFloat(court.longitude);
  
  if (isNaN(lat) || lat < -90 || lat > 90) {
    return { valid: false, message: 'Invalid latitude (must be between -90 and 90)' };
  }
  
  if (isNaN(lng) || lng < -180 || lng > 180) {
    return { valid: false, message: 'Invalid longitude (must be between -180 and 180)' };
  }
  
  // Validate court type
  const validTypes = [
    'High Court', 'District Court', 'Civil Court', 'Family Court',
    'Sessions Court', 'Magistrate Court', 'Consumer Court', 'Labour Court',
    'Supreme Court', 'Tribunal', 'Other'
  ];
  
  if (!validTypes.includes(court.type)) {
    return { valid: false, message: `Invalid court type. Must be one of: ${validTypes.join(', ')}` };
  }
  
  return { valid: true };
};

// GET /api/courts - Get all courts with optional filtering
router.get('/', (req, res) => {
  try {
    let courts = readCourts();
    
    // Filter by state
    if (req.query.state) {
      courts = courts.filter(c => c.state.toLowerCase() === req.query.state.toLowerCase());
    }
    
    // Filter by district
    if (req.query.district) {
      courts = courts.filter(c => c.district.toLowerCase() === req.query.district.toLowerCase());
    }
    
    // Filter by type
    if (req.query.type) {
      courts = courts.filter(c => c.type.toLowerCase() === req.query.type.toLowerCase());
    }
    
    // Filter by active status
    if (req.query.active) {
      const isActive = req.query.active === 'true';
      courts = courts.filter(c => c.isActive === isActive);
    }
    
    // Search by name
    if (req.query.search) {
      const searchLower = req.query.search.toLowerCase();
      courts = courts.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.address.toLowerCase().includes(searchLower)
      );
    }
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    
    const total = courts.length;
    courts = courts.slice(offset, offset + limit);
    
    res.json({
      success: true,
      data: courts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch courts' });
  }
});

// GET /api/courts/:id - Get court by ID
router.get('/:id', (req, res) => {
  try {
    const courts = readCourts();
    const court = courts.find(c => c.id === req.params.id);
    
    if (!court) {
      return res.status(404).json({ success: false, error: 'Court not found' });
    }
    
    res.json({ success: true, data: court });
  } catch (error) {
    console.error('Error fetching court:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch court' });
  }
});

// POST /api/courts - Create new court (Admin only)
router.post('/', (req, res) => {
  try {
    const validation = validateCourt(req.body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, error: validation.message });
    }
    
    const courts = readCourts();
    
    // Check for duplicate
    const duplicate = courts.find(c => 
      c.name.toLowerCase() === req.body.name.toLowerCase() &&
      c.state.toLowerCase() === req.body.state.toLowerCase()
    );
    
    if (duplicate) {
      return res.status(409).json({ success: false, error: 'Court with same name already exists in this state' });
    }
    
    const newCourt = {
      id: `court-${Date.now()}`,
      name: req.body.name,
      type: req.body.type,
      state: req.body.state,
      district: req.body.district,
      localArea: req.body.localArea || '',
      address: req.body.address,
      phone: req.body.phone || '',
      email: req.body.email || '',
      timings: req.body.timings || '10:00 AM - 5:00 PM',
      latitude: parseFloat(req.body.latitude),
      longitude: parseFloat(req.body.longitude),
      jurisdiction: req.body.jurisdiction || '',
      established: req.body.established || '',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    courts.push(newCourt);
    
    if (!writeCourts(courts)) {
      return res.status(500).json({ success: false, error: 'Failed to save court' });
    }
    
    res.status(201).json({ success: true, data: newCourt, message: 'Court created successfully' });
  } catch (error) {
    console.error('Error creating court:', error);
    res.status(500).json({ success: false, error: 'Failed to create court' });
  }
});

// PUT /api/courts/:id - Update court (Admin only)
router.put('/:id', (req, res) => {
  try {
    const courts = readCourts();
    const index = courts.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Court not found' });
    }
    
    // Merge existing data with updates
    const updatedCourt = {
      ...courts[index],
      ...req.body,
      id: courts[index].id, // Prevent ID change
      createdAt: courts[index].createdAt, // Preserve creation date
      updatedAt: new Date().toISOString()
    };
    
    // Validate merged data
    const validation = validateCourt(updatedCourt);
    if (!validation.valid) {
      return res.status(400).json({ success: false, error: validation.message });
    }
    
    courts[index] = updatedCourt;
    
    if (!writeCourts(courts)) {
      return res.status(500).json({ success: false, error: 'Failed to update court' });
    }
    
    res.json({ success: true, data: updatedCourt, message: 'Court updated successfully' });
  } catch (error) {
    console.error('Error updating court:', error);
    res.status(500).json({ success: false, error: 'Failed to update court' });
  }
});

// DELETE /api/courts/:id - Delete court (Admin only)
router.delete('/:id', (req, res) => {
  try {
    const courts = readCourts();
    const index = courts.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Court not found' });
    }
    
    const deletedCourt = courts.splice(index, 1)[0];
    
    if (!writeCourts(courts)) {
      return res.status(500).json({ success: false, error: 'Failed to delete court' });
    }
    
    res.json({ success: true, data: deletedCourt, message: 'Court deleted successfully' });
  } catch (error) {
    console.error('Error deleting court:', error);
    res.status(500).json({ success: false, error: 'Failed to delete court' });
  }
});

// GET /api/courts/stats/summary - Get court statistics
router.get('/stats/summary', (req, res) => {
  try {
    const courts = readCourts();
    
    const stats = {
      total: courts.length,
      active: courts.filter(c => c.isActive).length,
      byType: {},
      byState: {}
    };
    
    courts.forEach(court => {
      // Count by type
      stats.byType[court.type] = (stats.byType[court.type] || 0) + 1;
      // Count by state
      stats.byState[court.state] = (stats.byState[court.state] || 0) + 1;
    });
    
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching court stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch statistics' });
  }
});

// POST /api/courts/bulk - Bulk create courts (Admin only)
router.post('/bulk', (req, res) => {
  try {
    if (!Array.isArray(req.body.courts)) {
      return res.status(400).json({ success: false, error: 'Expected array of courts' });
    }
    
    const courts = readCourts();
    const created = [];
    const errors = [];
    
    req.body.courts.forEach((courtData, index) => {
      const validation = validateCourt(courtData);
      if (!validation.valid) {
        errors.push({ index, error: validation.message });
        return;
      }
      
      const newCourt = {
        id: `court-${Date.now()}-${index}`,
        ...courtData,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      courts.push(newCourt);
      created.push(newCourt);
    });
    
    if (created.length > 0) {
      writeCourts(courts);
    }
    
    res.status(201).json({
      success: true,
      data: {
        created: created.length,
        failed: errors.length,
        courts: created,
        errors
      }
    });
  } catch (error) {
    console.error('Error bulk creating courts:', error);
    res.status(500).json({ success: false, error: 'Failed to bulk create courts' });
  }
});

module.exports = router;
