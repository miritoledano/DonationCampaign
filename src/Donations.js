import Button from "@mui/material/Button";
import { useContext } from "react";
import { RateContext } from "./App";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { FixedSizeList } from "react-window";
import List from "./List";


export const fromShekelToX = (number, dollarRate, toCoin) => {
  if (toCoin === "shekel") {
    // אם המטבע המבוקש הוא שקל, החזר את הסכום כפי שהוא

    return "₪" + Math.floor(number);

  } else if (toCoin === "dollar") {
    // אם המטבע המבוקש הוא דולר, החזר את הסכום מומר לדולרים
    let x = Math.floor(number / dollarRate);
    // אם המטבע המבוקש הוא דולר, החזר את הסכום מומר לדולרים
    return  "$" + x;
  }
}

const Donations = (props) => {
  
  const [filteredArr, setFilteredArr] = useState(props.arr);
  const [sortingType, setSortingType] = useState(""); // נוסיף את המשתנה לסוג המיון
  let rate = useContext(RateContext);
  

  const handleSearch = (event) => {
    // toLowerCase()=מביא הכול באותיות קטנות שאם מישהו יקליד באותיות גדולות ידע לזהות 
    // trim()=מסיר לי רווחים שאם יה ידע לקחת
    // filter= כדי שאם יש כמה עם אותו השם אז יעשה זאת וישמור את כולםfilteredArrבונה לי סוג של מערך חדש שאליו יכנסו הנתונים ושומר אותו ב 
    const searchValue = event.target.value.trim().toLowerCase();
    const filteredArr = props.arr.filter((donation) => {
      const nameIncludesSearch = donation.name.toLowerCase().includes(searchValue);
      const dedicationIncludesSearch = donation.dedication.toLowerCase().includes(searchValue);
      return dedicationIncludesSearch || nameIncludesSearch;
    });

    setFilteredArr(filteredArr);
  };
  const sortAmount = () => {
    const sortedData = [...filteredArr];
    sortedData.sort((a, b) => parseFloat(b.sum) - parseFloat(a.sum));
    setFilteredArr(sortedData);
    setSortingType("amount");
  };

  // פונקציה למיון התרומות לפי תאריך
  const sortDate = () => {
    const sortedData = [...filteredArr];
    sortedData.sort((a, b) => a.DateOfDonation - b.DateOfDonation);
    setFilteredArr(sortedData);
    setSortingType("date");
  };
// פונקציה לחישוב כמה זמן עבר מהרגע שתרם לי
  function CalculateDate(date) {
    let x = new Date();
    if (date.toDateString() === x.toDateString()) {
      return "היום";
    }
    x = new Date().getFullYear() - date.getFullYear();
    if (x > 0) {
      if (x === 1) x = "שנה";
      else x = x + "שנים";
    } else if (x === 0) {
      x = new Date().getMonth() - date.getMonth();
      if (x >= 1) {
        if (x === 1) {
          x = "חודש";
        } else {
          x = x + "חודשים";
        }
      } else {
        x = new Date().getDay() - date.getDay();

        if (x >= 0) {
          if (x === 1) {
            x = "יום";
          } else {
            x = x + " ימים";
          }
        }
      }
    }
    return x;
  }
  
   
  
  
// הצגת נתוני התרומות
  function renderRow(props) {
    const { index, style, data } = props;
    const sortedData = [...data.filteredArr];
// ממין לי לפי הסכום מהגבוה לנמוך
// sortedData.sort((a, b) => parseFloat(b.sum) - parseFloat(a.sum));
//  sortedData.sort((a,b)=>parseFloat(b.data)-parseFloat(a.data));
   
   

    const donation =sortedData[index];

    return (
    
      
      
    // ListItem להצגת התרומות ברשימה  לקחנו צורה מסיפרית 
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color=" rgb">
            {fromShekelToX(donation.sum, rate.dollar, rate.currentCoin)}
          </Typography>

          <Typography variant="body2" color="rgb">
            {donation.dedication}
          </Typography>
          <Typography variant="h6" color=" rgb">
            {donation.name}
          </Typography>
          <Typography variant="body2" color="rgb">
            {CalculateDate(donation.DateOfDonation)}
          </Typography>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <>
    <Box>
      <Button
        id="dolarsShekels"
        variant="contained"
        onClick={sortDate}
        style={{ marginRight: "5px" }}
      >
        למיון לפי תאריך
      </Button>
      <Button
        id="dolarsShekels"
        variant="contained"
        onClick={sortAmount}
        style={{ marginRight: "10px" }}
      >
        למיון לפי סכום
      </Button>
      <div className="donations" style={{ textAlign: "center" }}>
        <div className="searchBox">
          <input
            className="searchInput"
            type="text"
            name=""
            placeholder="Search"
            onChange={handleSearch}
          />
          <button className="searchButton" href="#">
            <i className="material-icons">search</i>
          </button>
        </div>
        <Box
          sx={{
            width: "100%",
            maxWidth: 450,
            margin: 5,
            padding: 1,
            borderRadius: 5,
            boxShadow: 20,
            display: "inline-block",
          }}
        >
          <h2>all donations</h2>
          <FixedSizeList
            height={300}
            width={450}
            
            itemSize={50}
            itemCount={filteredArr.length}
            overscanCount={5}
            itemData={{ filteredArr}}
          >
            {renderRow}
          </FixedSizeList>
        </Box>

      </div>
      <List arr={props.arr}/>
      {/* הצגת הריבעוי סיכום */}
      </Box>
    </>
  );
}

export default Donations;