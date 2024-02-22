import { ResizableBox } from 'react-resizable';
import './resizeable.css';

interface ResizeableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Resizeable: React.FC<ResizeableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={300} width={Infinity} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default Resizeable;
