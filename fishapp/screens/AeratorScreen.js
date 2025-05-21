import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import CardCircular from "../components/CardCircular";
import CardBar from "../components/CardBar";
import LogCard from "../components/LogCard";
import { db, ref, onValue } from "../firebase";

const AeratorScreen = () => {
    const [logData, setLogData] = useState([]);
    const [doValue, setDoValue] = useState(0);
    const [tempValue, setTempValue] = useState(0);
    const [rpmValue, setRpmValue] = useState(0);

    useEffect(() => {
        const dataSensor = ref(db, "sensor");
        const dataRpm = ref(db, "aerator");

        // Listener untuk data sensor
        onValue(dataSensor, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setDoValue(data.oksigen || 0);
                setTempValue(data.suhu || 0);
            }
        });

        // Listener untuk data aerator
        onValue(dataRpm, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRpmValue(data.rpm || 0);
                const newLog = {
                    timestamp: new Date().toLocaleTimeString(),
                    rpm: data.rpm || 0,
                };
            }
        });

        // Tambahkan log setiap 5 detik untuk simulasi data masuk
        const interval = setInterval(() => {
            const newLog = {
                timestamp: new Date().toISOString(), // Format ISO
                rpm: Math.floor(Math.random() * 400) + 500, // Berat pakan (gram)
                status: Math.random() > 0.2 ? "success" : "failed", // 80% sukses, 20% gagal
                do: Math.floor(Math.random() * 400) + 500, // Berat pakan (gram)
                suhu: Math.floor(Math.random() * 400) + 500, // Berat pakan (gram)
            };

            // Perbarui log dengan hanya menyimpan 10 log terakhir
            setLogData((prevLogs) => [newLog, ...prevLogs.slice(0, 10)]);
        }, 5000);

        return () => clearInterval(interval); // Bersihkan interval saat unmount


    }, [db]);

    const content = [
        {
            key: "rowCards",
            render: () => (
                <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                    <CardCircular style={{ flex: 1 }} value={doValue} maxValue={9} label="DO Sensor" />
                    <CardCircular style={{ flex: 2 }} value={tempValue} maxValue={36} label="Temperatur" />
                </View>
            )
        },
        { key: "rpmBar", render: () => (<CardBar value={rpmValue} maxValue={4000} label="RPM Aerator" title="Kecepatan Aerator" />) },
        { key: "rpmLog", render: () => <LogCard logs={logData} title="Log RPM Aerator" /> },
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




// import React, { useState, useEffect } from "react";
// import { View, ScrollView } from "react-native";
// import CardCircular from "../components/CardCircular";
// import CardBar from "../components/CardBar";
// import LogCard from "../components/LogCards";
// import { db, ref, onValue } from "../firebase";

// const AeratorScreen = () => {
//   const [sensorValue, setSensorValue] = useState(5.5); // Dummy data sensor
//   const [logData, setLogData] = useState([]); // State untuk menyimpan log RPM

//   const [doValue, setDoValue] = useState(0);
//   const [tempValue, setTempValue] = useState(0);
//   const [rpmValue, setRpmValue] = useState(0);

//   useEffect(() => {

//       // Buat data log baru
//       const newLog = {
//         timestamp: new Date().toLocaleTimeString(),
//         rpm: Math.floor(Math.random() * 3000) + 500, // RPM acak antara 500-3500
//       };

//       // Simpan log baru, hanya menyimpan max 5 log terakhir
//       setLogData((prevLogs) => [newLog, ...prevLogs.slice(0, 10)]);

//       const dataSensor = ref(db, "sensor");
//       const dataRpm = ref(db, "aerator");

//       onValue(dataSensor, (snapshot) => {
//         setDoValue(snapshot.val().oksigen);
//         setTempValue(snapshot.val().suhu);
//       });

//       // Ambil data aerator
//       onValue(dataRpm, (snapshot) => {
//         setRpmValue(snapshot.val().rpm);
//       });

//   }, [db]);

//   return (
//     <View>
//       <ScrollView>
//         <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
//           <CardCircular style={{ flex: 1 }} value={doValue} maxValue={9} label="DO Sensor" />
//           <CardCircular style={{ flex: 2 }} value={tempValue} maxValue={36} label="Temperatur" />
//         </View>
//         <CardBar value={rpmValue} maxValue={4000} label="RPM Aerator" title={"Kecepatan Aerator"} />
//         <LogCard logs={logData} title={"Log RPM Aerator"} />
//       </ScrollView>
//     </View>

//   );
// };

// export default AeratorScreen;
