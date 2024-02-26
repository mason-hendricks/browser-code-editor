import { useRef, useEffect } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  errorMsg: string;
}

// html for iframe sourceDoc
// event listeners for errors and messages
const html = `
<html>
  <head>
    <style>html { background-color: white }</style>
    <body>
      <div id='root'></div>
        <script>
        const handleError = (err) => {
          const root = document.querySelector('#root')
          root.innerHTML = '<div style="color: red;"><h4>RUNTIME ERROR</h4>' + err + '</div>'
          console.error(err);
        }

        window.addEventListener('error', (event) => {
          handleError(event)
        })

          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch (err) {
              handleError(err);
            }
          }, false)
        </script>
    </body>
  </head>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, errorMsg }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        ref={iframe}
        title='preview'
        srcDoc={html}
        sandbox='allow-scripts'
      />
      {errorMsg.length > 0 && <div className='preview-error'>{errorMsg}</div>}
    </div>
  );
};

export default Preview;
