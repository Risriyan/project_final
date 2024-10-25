import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import Beranda from './pages/beranda/Beranda';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/store';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Profil from './pages/beranda/Profil';
import Favorite from './pages/Favorite';
import MyRatting from './pages/MyRatting';

function App() {
  return (
    <BrowserRouter>
     <Provider store={store}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Beranda/>}/>
        <Route path='/Search' element={<Search/>}/>
        <Route path='/Detail/:id'  element={<Detail/>}/> 
        <Route path='/Profil' element={<Profil/>}/>
        <Route path='/Favorite' element={<Favorite/>}/>
        <Route path='/MyRatting' element={<MyRatting/>}/>
      </Routes>
      <Footer/> 
      </Provider>
    </BrowserRouter>
  );
}

export default App;
