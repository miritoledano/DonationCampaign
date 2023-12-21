import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import "./Nav.css";
import { blue } from "@mui/material/colors";
import ColorLens from "@mui/icons-material/ColorLens";




const NavBar = ({ onCoinChange }) => {
  // לשינוי ערכת נושא בוחר לי צבע של רקע האתר שהוא רוצה
  const handleColorChange = () => {
    document.body.style.backgroundImage = 'none';
    const colorPicker = document.getElementById("colorPicker");
    const color = colorPicker.value;

    document.body.style.backgroundColor = color;
     const isDarkColor = isColorDark(color);
  document.body.style.color = isDarkColor ? "#fff" : "#000";
 
// אם בחר רקע חשוך יביא לו את הכיתוב בצבע בהיר

}
// פונקציה שמחשבנת האם הצבע חשוך 

const isColorDark = (hexColor) => {
  const threshold = 300;
  const rgb = hexToRgb(hexColor);
  const sum = rgb.r + rgb.g + rgb.b;
// אם קטן מ 300 זה אומר שזה בהיר אחרת זה אומר שזה
  return sum < threshold;
}
const hexToRgb = (hex) => {
  // כאשר מדובר בקוד צבע של HEX, המרת הערך ל-RGB יכולה להתבצע כך
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>




{/* שימוש בסיפריה שמביאה לי את הלינקים הללו והעיצוב שלהם */}

      <Box

      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="לתרומה"
            icon={<RestoreIcon sx={{ fontSize: 30, color: "rgb" }} />}
            component={NavLink}
            to="/Form"
          />
           
          <BottomNavigationAction
            label="התורמים"
            icon={<FavoriteIcon sx={{ fontSize: 30, color: "rgb" }} />}
            component={NavLink}
            to="/Donations"
          />
          <BottomNavigationAction
            id="changeColorButton"
            onClick={handleColorChange}
            icon={<ColorLens sx={{ fontSize: 30, color: "rgba" }} />}
            component={NavLink}
            label="  לשינוי ערכת נושא"
          />
          {/* העתקת ה-input לתוך ה-Box של ה-BottomNavigation */}
          
        </BottomNavigation>
        
       

      </Box>  {" "}
      <div className="footer">
        <span className="spanFooter">
          {" "}
          <img

            className="img1"
            src="//d1qvck26m1aukd.cloudfront.net/assets/packs/3535ab05a83db6a97c222029011a1e44.webp"
            alt="israel flags"
          ></img>{" "}
          ,יחד ננצח
          <br />
          מסייעים לנפגעי המלחמה
        </span>
      </div>
      <Button id="dolarsShekels"
        style={{ marginTop: 20 }}
        variant="contained"

        onClick={onCoinChange}>

        למעבר בין שקל/דולר
      </Button>

      <input
            type="color"
            id="colorPicker"
            name="colorPicker"
            defaultValue="#0000ff"
             style={{ marginRight: 1500 }}
          />
      
     
    </>
  );
};

export default NavBar;