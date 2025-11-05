import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { db, ref, onValue, push} from "../../firebase";
import CardBar from "../../components/CardBar";
import LogCard from "../../components/LogCard";
import AddJadwal from "../../components/AddJadwal";
import ListJadwal from "../../components/ListJadwal";

const FeedScreen = () => {
    const [pakanValue, setPakanValue] = useState();
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        const dataSensor = ref(db, "sensor");
        const dataLogPakan = ref(db, "logPakan");

        onValue(dataSensor, (snapshot) => {
            setPakanValue(snapshot.val().pakan);
        });

        // Listener untuk log pakan
        onValue(dataLogPakan, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Konversi objek menjadi array log
                const logsArray = Object.values(data)
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // urutkan dari terbaru
                    .slice(0, 10); // ambil 10 log terbaru

                setLogData(logsArray);
            }
        });

        // Tambahkan log dummy ke Firebase setiap 5 detik
        const interval = setInterval(() => {
            const now = new Date();

            const newLog = {
                timestamp: now.toISOString(), // waktu lengkap ISO (opsional, bisa buat sorting)
                berat: Math.floor(Math.random() * 400) + 500, // Berat pakan (gram)
                status: Math.random() > 0.2 ? "success" : "failed" // 80% sukses
            };

            console.log("Sending dummy log to Firebase:", newLog);

            const logRef = ref(db, "logPakan");
            push(logRef, newLog)
                .then(() => {
                    console.log("Log berhasil ditambahkan");
                })
                .catch((err) => {
                    console.error("Gagal push log:", err);
                });
        }, 500000);

        return () => clearInterval(interval);


        // // Tambahkan log setiap 5 detik untuk simulasi data masuk
        // const interval = setInterval(() => {
        //     const newLog = {
        //         timestamp: new Date().toISOString(), // Format ISO
        //         weight: Math.floor(Math.random() * 400) + 500, // Berat pakan (gram)
        //         status: Math.random() > 0.2 ? "success" : "failed", // 80% sukses, 20% gagal
        //     };

        //     // Perbarui log dengan hanya menyimpan 10 log terakhir
        //     setLogData((prevLogs) => [newLog, ...prevLogs.slice(0, 10)]);
        // }, 5000);

        // return () => clearInterval(interval); // Bersihkan interval saat unmount

    }, [db]);

    const content = [
        { key: "cardBar", render: () => <CardBar value={pakanValue} maxValue={100} label="Sisa Pakan" title="Pakan Tersedia" /> },
        { key: "jadwal", render: () => <ListJadwal /> },
        { key: "logCard", render: () => <LogCard title="Log Pakan" logs={logData} /> },
    ];

    return (
        <View>
            <FlatList
                data={content}
                renderItem={({ item }) => item.render()}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            <AddJadwal />
        </View>

    );

};

export default FeedScreen;
