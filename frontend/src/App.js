import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

function App() {
    let socket = io('http://localhost:3026', {
        transports: ['websocket'],
    });

    socket.on('getAllCats', (data) => {
        console.log(data);
    });

    socket.on('exception', (err) => {
        console.error(err);
    });

    const test = () => {
        socket.emit('getAllCats');
    };

    const addCat = () => {
        console.log(document.getElementById('id').value);
        socket.emit('incrementCat', {
            id: document.getElementById('id').value
        });
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />

                <input id="id"></input>

                <button type='button' onClick={test}>
                    Connect
                </button>

                <button type='button' onClick={addCat}>
                    IncrementCat
                </button>
            </header>
        </div>
    );
}

export default App;
