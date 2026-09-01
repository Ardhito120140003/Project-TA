import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import CardCircular from "../../components/CardCircular";
import CardBar from "../../components/CardBar";
// import LogCard from "../../components/LogCard";
import LogAeratorCard from "../../components/LogAeratorCard";
import { db, ref, onValue, push } from "../../firebase";

const AeratorScreen = () => {
  const [logData, setLogData] = useState([]);
  const [doValue, setDoValue] = useState(0);
  const [tempValue, setTempValue] = useState(0);
  const [frequencyValue, setFrequencyValue] = useState(0);

  // useEffect(() => {
  //     const dataSensor = ref(db, "sensor");
  //     const dataRpm = ref(db, "aerator");

  //     // Listener untuk data sensor
  //     onValue(dataSensor, (snapshot) => {
  //         const data = snapshot.val();
  //         if (data) {
  //             setDoValue(data.oksigen || 0);
  //             setTempValue(data.suhu || 0);
  //         }
  //     });

  //     // Listener untuk data aerator
  //     onValue(dataRpm, (snapshot) => {
  //         const data = snapshot.val();
  //         if (data) {
  //             setRpmValue(data.rpm || 0);
  //             const newLog = {
  //                 timestamp: new Date().toLocaleTimeString(),
  //                 rpm: data.rpm || 0,
  //             };
  //         }
  //     });

  //     // Tambahkan log setiap 5 detik untuk simulasi data masuk
  //     const interval = setInterval(() => {
  //         const newLog = {
  //             timestamp: new Date().toISOString(), // Format ISO
  //             rpm: Math.floor(Math.random() * 4) + 50, // Berat pakan (gram)
  //             // status: Math.random() > 0.2 ? "success" : "failed", // 80% sukses, 20% gagal
  //             do: Math.floor(Math.random() * 5) + 2, // Berat pakan (gram)
  //             suhu: Math.floor(Math.random() * 10) + 23, // Berat pakan (gram)
  //         };

  //         // Perbarui log dengan hanya menyimpan 10 log terakhir
  //         setLogData((prevLogs) => [newLog, ...prevLogs.slice(0, 10)]);
  //     }, 5000);

  //     return () => clearInterval(interval); // Bersihkan interval saat unmount

  // }, [db]);
  useEffect(() => {
    const dataSensor = ref(db, "sensor");
    const dataAerator = ref(db, "aerator");
    const dataLogAerator = ref(db, "logAerator");

    // Listener untuk data sensor
    onValue(dataSensor, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDoValue(data.oksigen || 0);
        setTempValue(data.suhu || 0);
      }
    });

    // Listener untuk data aerator (frekuensi)
    onValue(dataAerator, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFrequencyValue(data.frekuensi || 0); // Ubah dari rpm menjadi frekuensi
      }
    });

    // Listener untuk log aerator
    onValue(dataLogAerator, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Konversi objek menjadi array log
        const logsArray = Object.values(data)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // urutkan dari terbaru
          .slice(0, 50); // ambil 50 log terbaru

        setLogData(logsArray);
      }
    });

    // Tambahkan log dummy ke Firebase setiap 5 detik
    // const interval = setInterval(() => {
    //   const newLog = {
    //     timestamp: new Date().toISOString(),
    //     frekuensi: Math.floor(Math.random() * 20) + 40,
    //     do: Math.floor(Math.random() * 5) + 3,
    //     suhu: Math.floor(Math.random() * 8) + 25,
    //   };

    //   console.log("Sending dummy log to Firebase:", newLog);

    //   const logRef = ref(db, "logAerator");
    //   push(logRef, newLog)
    //     .then(() => {
    //       console.log("Log berhasil ditambahkan");
    //     })
    //     .catch((err) => {
    //       console.error("Gagal push log:", err);
    //     });
    // }, 500000);

    // return () => clearInterval(interval);

    return () =>  {};

  }, [db]);

  
  const content = [
    {
      key: "rowCards",
      render: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardCircular
            style={{ flex: 1 }}
            value={doValue}
            maxValue={8}
            label="DO Sensor"
          />
          <CardCircular
            style={{ flex: 2 }}
            value={tempValue}
            maxValue={40}
            label="Temperatur"
          />
        </View>
      ),
    },
    {
      key: "frequencyBar",
      render: () => (
        <CardBar
          value={frequencyValue}
          maxValue={65}
          label="Frekuensi Aerator"
          title="Kecepatan Aerator"
        />
      ),
    },
    {
      key: "frequencyLog",
      // render: () => <LogCard logs={logData} title="Log Aerator" />,
      render: () => <LogAeratorCard  logs={logData} title="Log Aerator" />,
    },
  ];

  return (
    <FlatList
      data={content}
      renderItem={({ item }) => item.render()}
      keyExtractor={(item) => item.key}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default AeratorScreen;
