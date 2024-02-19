import './App.css';

function App() {
  function sessionTest(valid){
    if(valid === 'start'){
      window.sessionStorage.setItem("session", 'true')
      window.sessionStorage.setItem("lang", 'pt')
      window.location.reload()
    }else{
      window.sessionStorage.clear()
      window.location.reload()
    }
  }
  return (
    <div className="App">
      <header className="App-header">
       <button onClick={()=> sessionTest("start")}>Session test start</button>
       <button onClick={()=> sessionTest('stop')}>Session test stop</button>
      </header>
    </div>
  );
}

export default App;
