// App.js

import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList } from "react-native";
import BluetoothService from "./BluetoothService";

const App = () => {
  const [scannedDevices, setScannedDevices] = useState([]);
  const bluetoothService = BluetoothService();

  useEffect(() => {
    return () => {
      bluetoothService.stopScan();
    };
  }, []);

  const handleDeviceFound = (device) => {
    // Update the scanned devices list
    setScannedDevices((prevDevices) => {
      // Avoid duplicate entries
      if (!prevDevices.find((d) => d.id === device.id)) {
        return [...prevDevices, device];
      }
      return prevDevices;
    });
  };

  const startScan = () => {
    setScannedDevices([]); // Clear previous scan results
    bluetoothService.scanForDevices(handleDeviceFound);
  };

  const stopScan = () => {
    bluetoothService.stopScan();
  };

  return (
    <View>
      <Text>Bluetooth App</Text>
      <Button title="Start Scan" onPress={startScan} />
      <Button title="Stop Scan" onPress={stopScan} />
      <FlatList
        data={scannedDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name || "Unnamed Device"}</Text>
            <Text>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;
