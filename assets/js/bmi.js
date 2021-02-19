console.log("---------------------------------- BMI CALCULATOR --------------------------------");
console.log("This program asks for weight and height inputs for 2 persons, computes for their respective BMIs, and compares them.")


//---------------------------------- with default values -----------------------------

let bmi = (mass, height) => {
  result = mass/(height*height);
  return round(result, 2);
};

let round = (value, decimals) => {
  return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
};


let victor = {
  mass: 60,
  height: 1.75
};

let john = {
  mass: 65,
  height: 1.65
};

vicBMI = bmi(victor.mass, victor.height);
johnBMI = bmi(john.mass, john.height);

// console.log(`Victor's BMI: ${vicBMI}`);
// console.log(`John's BMI: ${johnBMI}`);
// console.log(`Is Victor's BMI higher than John's? ${(vicBMI > johnBMI)? "Yes" : "No"}`);





//---------------------------------- with dynamic values -----------------------------

let data = {};

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
 
var dataCount = 0;
let promptInput = () => {
  readline.question('\nInput name: ', name => {
    data[name] = {};
    readline.question('Input weight in kg: ', mass => {
      data[name]["mass"] = mass;
      readline.question('Input height in meters: ', height => {
        data[name]["height"] = height;
        result = bmi(data[name]["mass"], data[name]["height"]);
        data[name]["bmi"] = result;
        console.log(`${name}'s BMI: ${result}`);
        dataCount++;

        if (dataCount >= 2) {
          readline.close();

          let person1 = Object.keys(data)[0];
          let person2 = Object.keys(data)[1];
          let person1BMI = data[person1]["bmi"];
          let person2BMI = data[person2]["bmi"];
         
          comparison = (person1BMI > person2BMI) ? "Yes" : "No";
          console.log(`\nIs ${person1}'s BMI higher than ${person2}'s? ${comparison}`);
          return;
        };

        promptInput();
      });
    });
  });
}


promptInput();