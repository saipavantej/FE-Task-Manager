import React, {ReactNode} from 'react';
import Ripple, {RippleProps} from 'react-native-material-ripple';

interface RippleButtonProps extends RippleProps {
  children?: ReactNode;
  onPress: () => void;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onPress,
  ...props
}) => {
  return (
    <Ripple
      rippleColor={'#000000'}
      rippleCentered={true}
      rippleOpacity={0.54}
      onPress={onPress}
      {...props}>
      {children}
    </Ripple>
  );
};

export default RippleButton;
