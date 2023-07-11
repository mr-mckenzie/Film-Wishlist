import { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';

function App() {

  // const [searchQuery, setSearchQuery] = useState("")
  // const [searchCategory, setSearchCategory] = useState()

  return (
    <div className="App">
      
      <SearchForm/>
      <p>App level para</p>
    
    </div>
  );
}

export default App;
