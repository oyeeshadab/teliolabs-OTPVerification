// QrScanner.js

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { openUpiIntent } from 'react-native-upi-launcher';

import {
  Camera,
  useCameraDevices,
  useCodeScanner,
} from 'react-native-vision-camera';

import { useFocusEffect } from '@react-navigation/native';
// import { authStack } from '../../config/navigator';
// import { useDispatch } from 'react-redux';
// import { getEventsByQR } from '../../redux/slices/QRCodeSlice';

import { launchImageLibrary } from 'react-native-image-picker';

// For gallery QR decode
import jpeg from 'jpeg-js';
import jsQR from 'jsqr';
import { Buffer } from 'buffer';
if (global.Buffer == null) {
  global.Buffer = Buffer;
}
const PNG = require('pngjs/browser').PNG;

const QrScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [qrValue, setQrValue] = useState('');
  const [isTorchOn, setIsTorchOn] = useState(false);

  const devices = useCameraDevices();
  const device = devices[0];

  // const dispatch = useDispatch();
  const scanLock = useRef(false);

  useEffect(() => {
    const sub = Linking.addEventListener('url', handleResponse);

    return () => sub.remove();
  }, []);

  useEffect(() => {
    getUPI();
  }, []);

  const getUPI = async () => {
    // openUpiIntent({
    //   amount: '10.00',
    //   to: 'example@upi',
    //   title: 'Test Payment',
    //   // apps: ['com.phonepe.app', 'net.one97.paytm'], // optionally specify
    // })
    openUpiIntent(
      'upi://pay?pa=shadabhussain007khan@oksbi&pn=Shadab%20Hussain&am=349&cu=INR',
    )
      .then(response => console.log('Payment Response:', response))
      .catch(error => console.log('Payment Error:', error));
  };

  const handleResponse = event => {
    console.log('Response URL:', event.url);
  };

  // Ask for camera permission when screen focused
  useFocusEffect(
    useCallback(() => {
      requestCameraPermission();

      const check = async () => {
        const status = await Camera.getCameraPermissionStatus();
        if (status === 'granted') setHasPermission(true);
      };
      check();
    }, []),
  );

  // Request camera permission
  const requestCameraPermission = async () => {
    const res = await Camera.requestCameraPermission();
    if (res === 'granted') {
      setHasPermission(true);
      setScanning(true);
      scanLock.current = false;
    } else {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to scan QR codes.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    }
  };

  // Live camera QR scanning
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async codes => {
      if (scanLock.current) return;
      if (codes?.[0]?.value) {
        scanLock.current = true;

        const value = codes[0].value;
        setQrValue(value);
        setScanning(false);
        console.log('🚀 ~ QrScanner ~ value:', value);
        Linking.openURL(
          'upi://pay?pa=shadabhussain007khan@oksbi&pn=Shadab%20Hussain&am=349&cu=INR',
        );

        // const response = await dispatch(getEventsByQR(value));

        // if (response.payload?.video_available) {
        //   // navigation.replace(authStack.videoPlayer, { data: response.payload });
        // } else {
        //   Alert.alert('Error', 'Video not available for this event', [
        //     {
        //       text: 'OK',
        //       onPress: () => {
        //         scanLock.current = false;
        //         // navigation.goBack();
        //       },
        //     },
        //   ]);
        // }
      }
    },
  });

  const toggleTorch = () => setIsTorchOn(prev => !prev);

  // --------------------------
  //     GALLERY QR SCAN
  // --------------------------
  const pickImageFromGallery = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
        selectionLimit: 1,
      });

      if (res.didCancel || !res.assets?.[0]) return;

      const asset = res.assets[0];
      const { base64, type } = asset;

      if (!base64) {
        Alert.alert('Error', 'Could not read image.');
        return;
      }

      const buffer = Buffer.from(base64, 'base64');

      let imageData;
      let width;
      let height;

      // PNG
      if (type === 'image/png') {
        const png = PNG.sync.read(buffer);
        imageData = new Uint8ClampedArray(png.data);
        width = png.width;
        height = png.height;
      }
      // JPEG
      else if (type === 'image/jpeg' || type === 'image/jpg') {
        const decoded = jpeg.decode(buffer, true);
        imageData = new Uint8ClampedArray(decoded.data);
        width = decoded.width;
        height = decoded.height;
      } else {
        Alert.alert('Error', 'Unsupported image format.');
        return;
      }

      // Decode QR Code
      const qr = jsQR(imageData, width, height);

      if (qr?.data) {
        setQrValue(qr.data);
        scanLock.current = true;
        Linking.openURL(
          'upi://pay?pa=shadabhussain007khan@oksbi&pn=Shadab%20Hussain&am=349&cu=INR',
        );

        // const response = await dispatch(getEventsByQR(qr.data));

        // if (response.payload?.video_available) {
        //   // navigation.replace(authStack.videoPlayer, { data: response.payload });
        // } else {
        //   Alert.alert('Error', 'Video not available for this event', [
        //     {
        //       text: 'OK',
        //       onPress: () => {
        //         scanLock.current = false;
        //         navigation.goBack();
        //       },
        //     },
        //   ]);
        // }
      } else {
        Alert.alert('Error', 'No QR code found in selected image.');
      }
    } catch (error) {
      console.log('Gallery Scan Error:', error);
      Alert.alert('Error', 'Failed to scan QR from gallery.');
    }
  };

  // Loading camera
  if (!device && hasPermission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.text}>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {scanning && device ? (
        <>
          {/* CAMERA */}
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={scanning}
            codeScanner={codeScanner}
            torch={isTorchOn ? 'on' : 'off'}
          />

          {/* TOP BAR */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={toggleTorch}>
              <Text style={styles.iconText}>{isTorchOn ? '🔦 ON' : '🔦'}</Text>
            </TouchableOpacity>
          </View>

          {/* SCAN AREA */}
          <View style={styles.overlay}>
            <View style={styles.scanArea}>
              <View style={[styles.corner, styles.tl]} />
              <View style={[styles.corner, styles.tr]} />
              <View style={[styles.corner, styles.bl]} />
              <View style={[styles.corner, styles.br]} />
            </View>

            {/* GALLERY BUTTON */}
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={
                getUPI
                // pickImageFromGallery
              }
            >
              <Text style={styles.galleryText}>Upload from Gallery</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // AFTER SCAN
        <View style={styles.center}>
          <Text style={styles.text}>Scanned: {qrValue}</Text>

          <TouchableOpacity
            style={styles.galleryButton}
            onPress={requestCameraPermission}
          >
            <Text style={styles.galleryText}>Restart Scanner</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default QrScanner;

// ----------------------
//       STYLES
// ----------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  topBar: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 20,
  },

  closeIcon: { color: '#fff', fontSize: 28 },
  iconButton: { padding: 10 },
  iconText: { fontSize: 22, color: '#fff' },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanArea: {
    width: 260,
    height: 260,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 5,
    borderColor: '#fff',
  },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },

  galleryButton: {
    marginTop: 30,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 40,
  },
  galleryText: { fontSize: 14, fontWeight: '500', color: '#000' },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 20, color: '#fff', fontSize: 18 },
});
