import logo from './logo.svg';
import './App.css';
import List, { sumArray } from './List';
import axios from 'axios';
import OneDonation from './OneDonation';
import Donations from './Donations';
import Form from './Form';
import { Route, Routes } from 'react-router-dom';
import React, { createContext, useEffect, useState } from "react";
import NavBar from './NavBar';
export const RateContext = createContext();
function App() {

// התחול מערך התרומות כ"ו שאנשים כבר תרמו

  const [arr, setArr] =
    useState([
      { id: 1, name: 'chim', dedication: 'for my father', sum: 50000, DateOfDonation: new Date(2023, 10, 7) },
      { id: 2, name: 'rachel', dedication: 'for myian', sum: 10152, DateOfDonation: new Date(2018, 10, 9) },
      { id: 3, name: 'shira', dedication: 'for myian', sum: 100, DateOfDonation: new Date(2018, 10, 9) },
      { id: 4, name: 'sari', dedication: 'for myian', sum: 10000, DateOfDonation: new Date(2018, 10, 9) },
      { id: 5, name: 'brachi', dedication: 'to arm', sum: 800000000, DateOfDonation: new Date(2018, 10, 9) },
      { id: 6, name: 'shifra', dedication: 'my brother', sum: 400000000, DateOfDonation: new Date(2018, 10, 9) },
      { id: 7, name: 'daid', dedication: 'my sister', sum: 1000045000, DateOfDonation: new Date(2018, 10, 9) },
      { id: 8, name: 'david', dedication: 'for my mother', sum: 1010000, DateOfDonation: new Date(2022, 8, 1) },
      { id: 9, name: 'miri', dedication: 'to poor', sum: 100000000, DateOfDonation: new Date(2018, 10, 9) }
    ]);
  let [rate, setRate] = useState({ dollar: undefined, currentCoin: "shekel" })
  //  פונקצית שינוי משקל לדולר
  const changeCoin = () => {
    setRate({ ...rate, currentCoin: rate.currentCoin == "dollar" ? "shekel" : "dollar" })
  }
  useEffect(() => {
   
    axios.get('https://v6.exchangerate-api.com/v6/46828ba661dec8e8231606a5/latest/USD').then(res => {
      setRate({ ...rate, dollar: res.data.conversion_rates.ILS });
    }).catch(err => {
      //הודעה מתאימה אא להביא מהשרת...
    })
  }, [])


  return (
    <RateContext.Provider value={rate}>
      <NavBar onCoinChange={changeCoin} />
      <Routes>

        <Route path="" element={<List arr={arr} />} />
        <Route path="Form" element={<Form setArr={setArr} />} />
        <Route path="Donations" element={<Donations arr={arr} />} />
      </Routes>
    </RateContext.Provider>

  );

}

export default App;

