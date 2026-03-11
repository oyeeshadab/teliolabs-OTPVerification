import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

type IconLibrary = 'Feather' | 'Ionicons';

interface IconProps {
  library: IconLibrary | string;
  name: string;
  size?: number;
  color?: string;
}

export const RenderIcon = ({
  library,
  name,
  size = 18,
  color = '#fff',
}: IconProps) => {
  switch (library) {
    case 'Feather':
      return <Feather name={name} size={size} color={color} />;
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} />;
    default:
      return null;
  }
};
