import './App.css';
import {useState, useEffect} from 'react';
import toGameIcon from './to_game.png'
import decal from './decal.png'

function App() {
  const [clickCt, setClickCt] = useState(0);
  const [requestPermissions, setRequestPermissions] = useState(false);
  const [keyCt, setKeyCt] = useState(0);
  const [keysUnlocked, setKeysUnlocked] = useState(false);

  useEffect(() => {
    document.addEventListener("updated-clicks", (e) => {
      setClickCt(e.detail.clicks);
    });
    document.addEventListener("updated-keys", (e) => {
      setKeyCt(e.detail.keys);
      setKeysUnlocked(e.detail.keysUnlocked)
    });


    document.addEventListener("request-permissions", (e) => {
      setRequestPermissions(!e.detail.permissions);
    });

    document.dispatchEvent(new CustomEvent("get-clicks"));
    document.dispatchEvent(new CustomEvent("get-keys"));

    return () => {
      document.removeEventListener("updated-clicks", (e) => {
        setClickCt(e.detail.clicks);
      });

      document.removeEventListener("updated-keys", (e) => {
        setKeyCt(e.detail.keys);
        setKeysUnlocked(e.detail.keysUnlocked)
      });

      document.removeEventListener("request-permissions", (e) => {
        setRequestPermissions(!e.detail.permissions);
      });
    }
  }, []);
  
  return (
    <div className="App">
      { requestPermissions ? <span id="permissions">We see you're using Firefox. Please allow all permissions for this extension to work correctly! <br/><button id='permissions-button'>Allow Permissions</button> </span>
      : <div><div className="border"></div>
      <img id="decal" src={decal}/>
      <a id="to-game-link" href="https://isabellee.me/breadwinner" target="_blank" rel="noreferrer"><img id="to-game" src={toGameIcon}/></a>
      <div id="logo">bw</div>
      <div id="click-ct">{clickCt.toLocaleString()} {clickCt == 1 ? "click" : "clicks"}</div>
      { keysUnlocked ? <div id="key-ct">{keyCt.toLocaleString()} {keyCt == 1 ? "key" : "keys"} </div> : null }</div>
      }
    </div>
  );
}

export default App;
