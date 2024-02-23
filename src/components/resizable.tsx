import { ResizableBox } from 'react-resizable';
import './resizable.css';
import { ResizableBoxProps } from 'react-resizable';

interface ResizeableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Resizeable: React.FC<ResizeableProps> = ({ direction, children }) => {
  let resizeableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizeableProps = {
      className: 'resize-horizontal',
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
    };
  } else {
    resizeableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizeableProps}>{children}</ResizableBox>;
};

export default Resizeable;
