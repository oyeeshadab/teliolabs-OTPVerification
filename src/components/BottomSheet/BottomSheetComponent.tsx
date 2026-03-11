import React, {
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Portal } from '@gorhom/portal';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import { BlurView } from '@react-native-community/blur';
import { useTheme } from '@theme/ThemeProvider';
import { useStyle } from './styles';

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

// const BottomSheetComponent = forwardRef<BottomSheetRef>((_, ref) => {
const BottomSheetComponent = forwardRef<
  BottomSheetRef,
  { children?: React.ReactNode }
>((props, ref) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['100%'], []);

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.colors.transparent }}
        handleIndicatorStyle={styles.bottomSheetWrapper}
        topInset={-20}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          {props.children}
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
});

export default BottomSheetComponent;
