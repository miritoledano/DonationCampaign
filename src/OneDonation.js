
const  OneDonation= (props) => {
    function  CalculateDate(date){
        let x = new Date().getFullYear() - date.getFullYear();
    if (x > 0) {
      if (x == 1) x = "שנה";
      else x = x+"שנים";
    } else {
      x = new Date().getMonth() - date.getMonth();
      if (x>=0) {
        if (x ==0){
         x = "חודש";}
        else {x =  x+"חודשים" ;}
 }
 else {
    x = new Date().getDate() - date.getDate();
    
    if (x >= 0) {
        if (x === 0) {
            x = "יום";
        } else {
            x = x + " ימים";
        }
    }
}     
 
      
    }
return {x};
}
     
// return (<div className="OneDonations">
//         <h2>{props.datails.name+" "+props.datails.dedication}</h2>
//         <h3>{props.datails.sum}</h3>
//         {/* <h3>{CalculateDate(props.datails.DateOfDonation)}</h3> */}
//          <h3>{CalculateDate(props.details.DateOfDonation)}</h3>
//     </div>  );
}
 
export default OneDonation;