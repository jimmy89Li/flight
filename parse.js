//Read files function
let readFil = (filename) => fs.readFileSync(filename);
let fs = require("fs");  // file system

//Airport #1 example
let airport1 = 'LSGS;RW25;FRI1U;253;482.1936;46.2165586970357 7.31383640082898;46.2089926074458 7.29245349266874;46.0236527777778 6.89693333333333;46.0204212342341 6.87951985054112;46.0273242688082 6.85735126062993;46.0431278157189 6.84867896343637;46.0585737525945 6.85859625843847;46.0646123043478 6.88129450265634;46.0640024549301 6.88787389152998;46.0556523293444 6.94945066733526;46.2155 7.28877777777778;46.3318055555556 7.27547222222222;46.7775833333333 7.2235';
let airport2 ='LSZC;RW24;WIL2A;244;449.58;46.9701412610885 8.38442417872985;46.8729444444444 8.06794444444444;47.1783055555556 7.90591666666667';


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
