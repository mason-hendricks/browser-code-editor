import { ResizableBox } from 'react-resizable';
import './resizable.css';
import { ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';

interface ResizeableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Resizeable: React.FC<ResizeableProps> = ({ direction, children }) => {
  let resizeableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(Math.floor(window.innerWidth));

  // listener to manage window dimensions on resize
  useEffect(() => {
    // debouncing with setTimeout
    let timer: any;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        if (window.innerWidth * 0.75 < width) {
          setWidth(Math.floor(window.innerWidth * 0.75));
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizeableProps = {
      className: 'resize-horizontal',
      minConstraints: [Math.floor(innerWidth * 0.2), Infinity],
      maxConstraints: [Math.floor(innerWidth * 0.75), Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizeableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, Math.floor(innerHeight * 0.9)],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizeableProps}>{children}</ResizableBox>;
};

export default Resizeable;
