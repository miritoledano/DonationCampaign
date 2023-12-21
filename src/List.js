import OneDonation from "./OneDonation";
import "./Nav.css";
import { useContext } from "react";
import { RateContext } from "./App";
export const fromShekelToX = (number, dollarRate, toCoin) => {
  console.log("dollarRate:", dollarRate);
  console.log("toCoin:", toCoin);
  if (toCoin === "shekel") {
 // אם המטבע המבוקש הוא שקל, החזר את הסכום כפי שהוא
    return "₪" + Math.floor(number)
  } else if (toCoin === "dollar") {
    let x = Math.floor(number / dollarRate);
    // אם המטבע המבוקש הוא דולר, החזר את הסכום מומר לדולרים
    return  "$" + x;
  }
}
const List = (props) => {
  let rate = useContext(RateContext);


  if (!props.arr || !Array.isArray(props.arr)) {
    return <p>אין נתונים להציג</p>;
  }
  console.log(props.arr)

  let SummaryOfContributions = 0;
  let targetAmount = 10105000000;
  let modol = 0;
  let cnt = 0;


  return (<div className="center">{
// עובר על מערך התרומות סוכם לי את כל התרומות את מיספר האנשים שתרמו
    props.arr.map((item => {
      cnt++;
      SummaryOfContributions += item.sum;
      return <div>
        <p key={item.id}>  </p>

      </div>



    }))}


    <div className="sum1">
      <h2>
        {" "}
        <span> :יעד</span>

      </h2>
      <p>
        {" "}
        <span> {fromShekelToX(targetAmount, rate.dollar, rate.currentCoin)}</span>
      </p>
    </div>
    <div className="sum2">
      <h2>
        {" "}
        <span> :אחוז התרומות</span>

      </h2>
      <p>
        {" "}
        <span> {Math.floor((SummaryOfContributions / targetAmount) * 100)} </span>
      </p>
    </div>

    <div className="sum3">
      <h2>
        {" "}
        <span>סך התרומות</span>

      </h2>
      <p>
        {" "}
        <span> {fromShekelToX(SummaryOfContributions, rate.dollar, rate.currentCoin)}</span>
      </p>


    </div>
    <div className="sum4">
      <h2>
        {" "}
        <span> :מספר התורמים</span>

      </h2>
      <p>
        {" "}
        <span> {cnt}</span>
      </p>
    </div>
  </div>
  );
};


export default List;
