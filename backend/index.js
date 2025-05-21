const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// contoh route
app.get('/', (req, res) => {
  res.json({ message: 'Backend berjalan dengan baik' });
});

// contoh API untuk simpan atau baca data sensor
app.post('/sensor-data', (req, res) => {
  const sensorData = req.body;
  console.log('Data sensor diterima:', sensorData);
  // Simpan ke database atau log sesuai kebutuhan
  res.status(201).json({ status: 'success', data: sensorData });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
