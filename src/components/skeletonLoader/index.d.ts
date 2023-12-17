// import {ViewStyle} from 'react-native';

type SkeletonLoaderProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  highlightColor?: string;
};

type ListLoaderProps = {
  backgroundColor: string;
  highlightColor: string;
  count: number;
  type: 'tasks';
};
interface LoaderProps {
  style?: any;
}

type Item = {
  id: number;
};
