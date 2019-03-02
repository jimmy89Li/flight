//Read files function
let readFil = (filename) => fs.readFileSync(filename);
let fs = require("fs");  // file system

//Airports files
let euAirportsFile = readFil("airports/airports_eu.txt");
let usAirportsFile = readFil("airports/airports_us.txt");

//Airports data
let euAirportsData = euAirportsFile.toString().split("\n").slice(1);
let usAirportsData = usAirportsFile.toString().split("\n").slice(1);

//Parse airports data
let result = [];
let parseAirportData = (data) => {
  data.forEach(element => {
    if(element.split(";")[0])
    {
      result.push('{"Airport":"'+element.split(";")[0]+'","Runway":"'+element.split(";")[1]+'","RunwayHeading":"'+element.split(";")[3]+'","LatLong":"'+element.split(";")[5]+'"}');
    }
  });
  return result;
}

console.log(parseAirportData(euAirportsData));