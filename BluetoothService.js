import BleManager from "react-native-ble-plx";

const BluetoothService = () => {
  const bleManager = new BleManager();

  const scanForDevices = (onDeviceFound) => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }
      onDeviceFound(device);
    });
  };

  const stopScan = () => {
    bleManager.stopDeviceScan();
  };

  const connectToDevice = (deviceId) => {
    bleManager.connectToDevice(deviceId)
      .then((device) => {
        console.log('Connected to device:', device.name);
        // Perform further actions with the connected device
      })
      .catch((error) => {
        console.error('Connection error:', error);
      });
  };

  const disconnectDevice = (deviceId) => {
    bleManager.cancelDeviceConnection(deviceId)
      .then(() => {
        console.log('Disconnected from device:', deviceId);
      })
      .catch((error) => {
        console.error('Disconnection error:', error);
      });
  };

  return {
    scanForDevices,
    stopScan,
    connectToDevice,
    disconnectDevice,
  };
};

export default BluetoothService;
