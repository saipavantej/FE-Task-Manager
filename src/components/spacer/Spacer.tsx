import React, {FC} from 'react';
import {View} from 'react-native';

type SpacerProps = {
  direction?: 'vertical' | 'horizontal';
  size?: number;
  hide?: boolean;
};

export const Spacer: FC<SpacerProps> = ({
  direction = 'vertical',
  size = 0,
  hide = false,
}) => {
  const height = direction === 'vertical' ? size : 0;
  const width = direction !== 'vertical' ? size : 0;
  if (hide) {
    return null;
  } else {
    return <View style={{paddingTop: height, paddingLeft: width}} />;
  }
};
