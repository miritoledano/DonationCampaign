
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Donations from "./Donations";
import "./Nav.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, colors } from "@mui/material";
import { useContext } from "react";
import { RateContext } from "./App";
import { blue } from "@mui/material/colors";
export const fromXToShekel = (sumInX, doolarRate, fromCoin) => {
  if (fromCoin === "shekel") {
    // אם המטבע המבוקש הוא שקל, החזר את הסכום כפי שהוא
    return sumInX;
  } else if (fromCoin === "dollar") {
    // אם המטבע המבוקש הוא דולר, החזר את הסכום מומר לדולרים
    return Math.floor(sumInX * doolarRate);
  }
}
const Form = ({ setArr }) =>{
  const navigate = useNavigate();
  let rate = useContext(RateContext);
// כדי שיציג את הכיתוב מדינת ישראל מודה לך
const [formSubmitted, setFormSubmitted]=useState(false);//הוספת מישתנה שיבדוק האם הטופס נישלח בהצלחה
const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
  });
// בדיקת השגיאות
  const [formData, setFormData] = useState({});
// לקיחת הנתונים
  const onSubmit = (data) => {
    const newFormData = {
      id: data.id,
      name: data.name,
      dedication: data.dedication,
      sum: fromXToShekel(parseFloat(data.sum), rate.dollar, rate.currentCoin) || 0,
      DateOfDonation: new Date(),
    };

    // עדכון המערך בסטייט של App
    setArr((prevArr) => [...prevArr, newFormData]);
    setFormSubmitted(true);//אם הטופס נישמר בהצלחה תעדכן לי אותו להיות tru


    // איפוס הטופס למצב ההתחלתי
    setValue("id", ""); // איפוס של הערכים בטופס
    setValue("name", "");
    setValue("dedication", "");
    setValue("sum", "");


  };
  setTimeout(() => {
    setFormSubmitted(false);

  }, 3000); // 3000 מילישניות = 3 שניות


  return (


    formSubmitted ? (//שואל האם נישלחתה??
      <section id="thank-you-section">
        <div className="">
          <h2>מדינת ישראל מודה לך </h2>
          <h2>מדינת ישראל מודה לך </h2>
        </div>
      </section>

    ) :
      <>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2>your Donations</h2>



          <TextField
            margin="dense"
            id="id"
            type="text"
            label="תז"
            {...register("id", {
              required: { value: true, message: "שדה זה חובה" },
              pattern: {
                className: "error",
                value: /^[0-9]{9}$/, // תעודת זהות בעלת 9 ספרות
                message: "ת.ז לא תקין",
              },
            })}
          />
          {errors.id && <Alert severity="info" style={{
            maxWidth: '200px',
            margin: 'auto',
            borderRadius: '8px',
            padding: '10px',
            // backgroundColor: '#2196f3',
            // color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 10px rgba(33, 150, 243, 0.2)',
            animation: 'fadeIn 0.5s ease-out',
          }}>{errors.id.message}</Alert>}


          <TextField
            margin="dense"
            id="name"
            type="text"
            label="שם תורם"
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            {...register("name", {
              required: { className: "error", value: true, message: "שדה זה חובה" },
              minLength: { className: "error", value: 3, message: "שם קצר מידי" },
              maxLength: { className: "error", value: 30, message: "שם ארוך מידי" },
            })}
          />
          {errors.name && <Alert severity="info" style={{
            maxWidth: '200px',
            margin: 'auto',
            borderRadius: '8px',
            padding: '10px',
            // backgroundColor: '#2196f3',
            // color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 10px rgba(33, 150, 243, 0.2)',
            animation: 'fadeIn 0.5s ease-out',
          }}>{errors.name.message}</Alert>}


          <TextField margin="dense" id="dedication" type="text" label="הקדשה" value={formData.dedication} onChange={(e) => setFormData({ ...formData, dedication: e.target.value })}{...register("dedication", {
            required: { value: true, message: "שדה זה חובה" },
          })} />
          {errors.dedication && <Alert severity="info" style={{
            maxWidth: '200px',
            margin: 'auto',
            borderRadius: '8px',
            padding: '10px',
            // backgroundColor: ,
            // color: blue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 10px rgba(33, 150, 243, 0.2)',
            animation: 'fadeIn 0.5s ease-out',
          }}>{errors.sum.message} </Alert>}


          <TextField 
            margin="dense"
            id="sum"
            type="number"
            label="סכום תרומה"
            onChange={(e) => setFormData({ ...formData, sum: parseFloat(e.target.value) || 0 })}

            {...register("sum", {
              required: { value: true, message: "שדה זה חובה" },
            })}
          />
          {errors.sum && <Alert severity="info" style={{
            maxWidth: '200px',
            margin: 'auto',
            borderRadius: '8px',
            padding: '10px',
            // backgroundColor: '#2196f3',
            // color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 10px rgba(33, 150, 243, 0.2)',
            animation: 'fadeIn 0.5s ease-out',
          }}>{errors.sum.message} </Alert>}

          <p> </p>
          <Button type="submit" variant="contained" style={{ marginBottom: 4 }}>
            שלח
          </Button>
        </form>
      </>
  );
};

export default Form;
