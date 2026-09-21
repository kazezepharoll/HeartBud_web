import { useCallback, useEffect, useRef, useState } from 'react';

const HEART_RATE_SERVICE = 'heart_rate';
const HEART_RATE_MEASUREMENT = 'heart_rate_measurement';
const BATTERY_SERVICE = 'battery_service';

// Parses the Heart Rate Measurement characteristic per the Bluetooth SIG GATT
// spec: byte 0 is a flags bitmask, bit 0 says whether the value is 8-bit or
// 16-bit, and the value itself follows immediately after.
function parseHeartRateValue(dataView) {
  const flags = dataView.getUint8(0);
  const is16Bit = flags & 0x1;
  return is16Bit ? dataView.getUint16(1, true) : dataView.getUint8(1);
}

// Connects to a real BLE wearable (fitness band, chest strap, or any device
// exposing the standard Bluetooth Heart Rate GATT service) using the Web
// Bluetooth API. Only supported in Chromium-based browsers over HTTPS/localhost;
// most smartwatches only expose this profile through their own companion app,
// so this works best with dedicated heart-rate straps/bands.
export function useBluetoothHeartRate() {
  const [supported] = useState(() => typeof navigator !== 'undefined' && !!navigator.bluetooth);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [deviceName, setDeviceName] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [error, setError] = useState(null);
  const deviceRef = useRef(null);
  const characteristicRef = useRef(null);

  const handleValueChange = useCallback((event) => {
    setHeartRate(parseHeartRateValue(event.target.value));
  }, []);

  const disconnect = useCallback(() => {
    const characteristic = characteristicRef.current;
    if (characteristic) {
      characteristic.removeEventListener('characteristicvaluechanged', handleValueChange);
      characteristic.stopNotifications().catch(() => {});
    }
    const device = deviceRef.current;
    if (device?.gatt?.connected) device.gatt.disconnect();
    deviceRef.current = null;
    characteristicRef.current = null;
    setConnected(false);
    setDeviceName(null);
    setHeartRate(null);
  }, [handleValueChange]);

  const connect = useCallback(async () => {
    if (!supported) {
      setError('This browser does not support Web Bluetooth. Try Chrome or Edge on desktop/Android.');
      return;
    }
    setError(null);
    setConnecting(true);
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [HEART_RATE_SERVICE] }],
        optionalServices: [BATTERY_SERVICE],
      });
      deviceRef.current = device;
      device.addEventListener('gattserverdisconnected', () => {
        setConnected(false);
        setDeviceName(null);
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(HEART_RATE_SERVICE);
      const characteristic = await service.getCharacteristic(HEART_RATE_MEASUREMENT);
      characteristicRef.current = characteristic;

      characteristic.addEventListener('characteristicvaluechanged', handleValueChange);
      await characteristic.startNotifications();

      setDeviceName(device.name || 'Bluetooth heart rate device');
      setConnected(true);
    } catch (err) {
      if (err?.name !== 'NotFoundError') {
        // NotFoundError happens when the user cancels the device picker; anything else is a real failure.
        setError(err?.message || 'Could not connect to the Bluetooth device.');
      }
    } finally {
      setConnecting(false);
    }
  }, [supported, handleValueChange]);

  useEffect(() => () => disconnect(), [disconnect]);

  return { supported, connecting, connected, deviceName, heartRate, error, connect, disconnect };
}
