import './App.css';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import musicIco from './assets/images/music.ico';

function App() {
  const favicon = document.getElementById('favicon');
  favicon.href = musicIco;
  return (
    <div className='App'>
      <MusicPlayer />
    </div>
  );
}

export default App;
