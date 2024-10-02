"use client"
import { useState,ChangeEvent} from "react"

export default function BMIcalculator() {

  interface BmiResult {
    bmi: string;
    category: string;
  }

  const [height,setheight] = useState("")
  const [weight,setweight] = useState("")
  const [result,setresult] = useState<BmiResult|null>(null)
  const [err,seterr] = useState("")

   const handelerHeight = (e:ChangeEvent<HTMLInputElement>) =>{
     setheight(e.target.value)
   }

   const handlerWeight = (e:ChangeEvent<HTMLInputElement>) =>{
   setweight(e.target.value)
   }


   const Bmicalculation = () =>{
    if (!height || !weight) {
      seterr("plz enter both height and weight")
      return
    }
    const  heightInmeters = parseFloat(height)/100
   if (heightInmeters <= 0 ) {
    seterr("height must be in positive numbers")
    return;
   }

   const weightInkg = parseFloat(weight)
   if (weightInkg <= 0 ) {
    seterr("weight must be a positive number")
    return;
   }

   const BmiValue = weightInkg / (heightInmeters * heightInmeters)
   let category = ""

   if (BmiValue < 18.5) {
    category = "Underweight";
   
   } else if( BmiValue >= 18.5 && BmiValue < 25) {
    category = "Normal"
   } else if(BmiValue >= 25  && BmiValue < 30){
   category = "Overweight"
   } else{
    category = "Obese"
   }

   setresult({bmi:BmiValue.toFixed(1),category})
   seterr("")
   } 
    
   



  return (
    <div className="flex justify-center items-center text-center text-white">
       <div className="bg-black h-[500px] w-[500px] mt-[100px] ">
        <h1 className="mt-10 text-2xl font-bold">BMI Calculator</h1>
        <p className="mt-5">Enter your height and weight to calculate your BMI.</p>
        
        <div className="flex flex-col mt-3 items-center text-center">
            <label>Height (cm)</label>
            <input type="number"
            value={height}
            onChange={handelerHeight}
              placeholder="Enter your height"
             className="p-2  w-[300px] rounded-xl mt-1 text-black"/>
        </div>

        <div className="flex flex-col mt-3 items-center text-center">
            <label>Weight (kg)</label>
            <input type="number" 
            value={weight}
            onChange={handlerWeight}
           placeholder="Enter your weight"
           className="p-2  w-[300px] rounded-xl mt-1 text-black"/>
        </div>

           <div className="flex justify-center items-center text-center">
           <button
           onClick={Bmicalculation}
           className="text-center p-2 w-[90px] bg-white text-black rounded-xl mt-5 ">
          calculate
          </button>
           </div>
                 

             {/* display error if any */}
            {err && <div className="text-red-500 text-center">{err}</div>}


            {/* display result bmi */}
            { result && ( <div className="mt-10">
              <h2 className="text-2xl">{result.bmi}</h2>
               <p>{result.category}</p>
              </div> )}
        </div>

    </div>
  )
}
