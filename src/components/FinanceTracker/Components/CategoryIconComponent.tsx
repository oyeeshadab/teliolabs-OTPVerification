import {
  Bills,
  Default,
  Entertainment,
  Grocery,
  Shoppping,
  Transit,
} from '@assets/SVG';
import React, { memo, useMemo } from 'react';

type IconName =
  | 'Grocery'
  | 'Shoppping'
  | 'Transit'
  | 'Entertainment'
  | 'Bills'
  | 'Default';

type Props = {
  icon_name?: string;
  size?: number;
  color?: string;
};

const iconLibraries: Record<IconName, React.FC<any>> = {
  Grocery,
  Shoppping,
  Transit,
  Entertainment,
  Bills,
  Default,
};

const DEFAULT_ICON: IconName = 'Default';

const CategoryIconComponent = ({
  icon_name,
  size = 45,
  color = '#000',
}: Props) => {
  const IconComponent = useMemo(() => {
    if (!icon_name || !iconLibraries[icon_name as IconName]) {
      return iconLibraries[DEFAULT_ICON];
    }

    return iconLibraries[icon_name as IconName];
  }, [icon_name]);

  return <IconComponent height={size} width={size} color={color} />;
};

export const CategoryIcon = memo(CategoryIconComponent);
