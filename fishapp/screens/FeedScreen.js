import { useEffect, useState } from "react";
import { View, FlatList} from "react-native";
import { db, ref, onValue } from "../firebase";
import CardBar from "../components/CardBar";
import LogCard from "../components/LogCard";
import AddJadwal from "../components/AddJadwal";
import ListJadwal from "../components/ListJadwal";

const FeedScreen = () => {
    const [pakanValue, setPakanValue] = useState();
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        const dataSensor = ref(db, "sensor");

        onValue(dataSensor, (snapshot) => {
            setPakanValue(snapshot.val().pakan);
        });

        // Tambahkan log setiap 5 detik untuk simulasi data masuk
        const interval = setInterval(() => {
            const newLog = {
                timestamp: new Date().toISOString(), // Format ISO
                weight: Math.floor(Math.random() * 400) + 500, // Berat pakan (gram)
                status: Math.random() > 0.2 ? "success" : "failed", // 80% sukses, 20% gagal
            };

            // Perbarui log dengan hanya menyimpan 10 log terakhir
            setLogData((prevLogs) => [newLog, ...prevLogs.slice(0, 10)]);
        }, 5000);

        return () => clearInterval(interval); // Bersihkan interval saat unmount

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
