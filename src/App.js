import React from 'react';
import DieceView from './views/DieceView.js';
import SelectUsersView from './views/SelectUsersView.js';
import './scss/main.scss';

import { _started } from './recoil/users.js';
import { useRecoilValue } from 'recoil';

function App() {
  const started = useRecoilValue(_started);
  return (
    <div className="App">
      {started ? <DieceView></DieceView> : <SelectUsersView />}
    </div>
  );
}//a

export default App;
