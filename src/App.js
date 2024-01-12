import './App.css';
import {useState, useEffect, useRef} from 'react';

function App() {
  const [clickCt, setClickCt] = useState(0);
  const [requestPermissions, setRequestPermissions] = useState(false);

  useEffect(() => {
    document.addEventListener("updated-clicks", (e) => {
      setClickCt(e.detail.clicks);
    });
    document.addEventListener("request-permissions", (e) => {
      console.log("React: has permissions is " + e.detail.permissions)
      setRequestPermissions(!e.detail.permissions);
    });

    document.dispatchEvent(new CustomEvent("get-clicks"));

    return () => {
      document.removeEventListener("updated-clicks", (e) => {
        setClickCt(e.detail.clicks);
      });

      document.removeEventListener("request-permissions", (e) => {
        setRequestPermissions(!e.detail.permissions);
      });
    }
  }, []);
  
  return (
    <div className="App">
      { requestPermissions ? <span>We see you're using Firefox. Please allow all permissions for this extension to work correctly. <br/><button>Allow Permissions</button> </span>
      : <span> Click Count: {clickCt}</span>
      }
    </div>
  );
}

export default App;
