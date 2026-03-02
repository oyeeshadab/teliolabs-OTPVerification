import ReactNativeBiometrics from 'react-native-biometrics';

const biometrics = new ReactNativeBiometrics();

export const BiometricService = {
  isAvailable: async (): Promise<boolean> => {
    const { available } = await biometrics.isSensorAvailable();
    return available;
  },

  authenticate: async (): Promise<boolean> => {
    const result = await biometrics.simplePrompt({
      promptMessage: 'Authenticate to access the app',
      cancelButtonText: 'Cancel',
    });

    return result.success;
  },
};
