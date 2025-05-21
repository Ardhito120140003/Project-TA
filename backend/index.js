const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

// Simulasi ambil data dari Firebase Realtime Database atau Firestore
async function getSensorData() {
  // Contoh: ambil dari Firebase REST API
  const firebaseURL = 'https://YOUR_PROJECT.firebaseio.com/data.json'; // ganti sesuai DB kamu
  const response = await axios.get(firebaseURL);
  return response.data;
}

// Fungsi kirim notifikasi pakai FCM
async function sendNotification(title, body) {
  const serverKey = "YOUR_SERVER_KEY"; // ambil dari Firebase > Project Settings > Cloud Messaging

  await axios.post(
    "https://fcm.googleapis.com/fcm/send",
    {
      to: "/topics/all", // atau token tertentu
      notification: {
        title: title,
        body: body,
      },
    },
    {
      headers: {
        Authorization: `key=${serverKey}`,
        "Content-Type": "application/json",
      },
    }
  );
}

app.get('/', (req, res) => {
  res.send("Backend FishApp Aktif!");
});

// Polling setiap X menit (contoh: 1 menit)
setInterval(async () => {
  try {
    const data = await getSensorData();
    // Logika trigger notifikasi
    if (data && data.DO < 3) {
      await sendNotification("Peringatan DO Rendah", `Kadar DO saat ini: ${data.DO}`);
      console.log("Notifikasi dikirim: DO rendah");
    }
  } catch (error) {
    console.error("Gagal polling data atau kirim notifikasi:", error.message);
  }
}, 60000); // 60000 ms = 1 menit

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
