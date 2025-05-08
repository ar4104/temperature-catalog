const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/temperaturedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Temperature schema and model
const temperatureSchema = new mongoose.Schema({
  region: { type: String, required: true },
  avgTemperature: { type: Number, required: true },
  precipitation: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

// Routes

// Add new temperature record
app.post('/api/temperature', async (req, res) => {
  try {
    const temp = new Temperature(req.body);
    await temp.save();
    res.status(201).json(temp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete temperature record by ID
app.delete('/api/temperature/:id', async (req, res) => {
  try {
    const result = await Temperature.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update temperature record by ID
app.put('/api/temperature/:id', async (req, res) => {
  try {
    const updated = await Temperature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Record not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get temperature records by date
app.get('/api/temperature', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'Date query parameter required' });
    const records = await Temperature.find({ date: new Date(date) });
    res.json(records);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get minimum temperature record by date and log region to console
app.get('/api/temperature/min/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const records = await Temperature.find({ date: date });
    if (records.length === 0) return res.status(404).json({ error: 'No records found for this date' });
    let minRecord = records[0];
    records.forEach(r => {
      if (r.avgTemperature < minRecord.avgTemperature) minRecord = r;
    });
    console.log(`Минимальная температура на дату ${req.params.date}: регион ${minRecord.region}`);
    res.json(minRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
