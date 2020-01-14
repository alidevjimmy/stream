import React from 'react';
import ReactDOM from 'react-dom';

export default function App() {
    return (
        <React.Fragment>
            <h1>hello Mobile</h1>
        </React.Fragment>
    );
}
// background: linear-gradient(to right, #ff6f00, #ff9100);
if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}

