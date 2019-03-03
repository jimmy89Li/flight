const geolib = require('geolib')
const srtm = require('srtm-reader')

var FeetToMeters = feet => feet / 3.2808
var MetersToFeet = meters => meters * 3.2808
var MilesToMeters = miles => miles * 1852
var MilesToFeet = miles => MetersToFeet(MilesToMeters(miles))

var degrees_to_radians = degrees => {
  var pi = Math.PI
  return degrees * (pi / 180)
}

var position = (lat, long, angle, distance) => {
  let X =
    FeetToMeters(distance) * Math.cos(degrees_to_radians(angle)) * 0.00001 + lat
  let Y =
    FeetToMeters(distance) * Math.sin(degrees_to_radians(angle)) * 0.00001 +
    long
  return { X, Y }
}

var CalcEdges = (lat, long, angle, feet, step = 30) => {
  var arr = new Array()
  arr.push(position(lat, long, angle, feet))
  for (let i = 0; i <= FeetToMeters(feet); i += step) {
    arr.push(position(lat, long, angle - 90, i))
    arr.push(position(lat, long, angle + 90, i))
  }
  return arr
}

var feet600 = 9601 // 2956
var feet4000 = 64001 // 19507

var CalculateAllEdges = (
  maxDistanceInMiles,
  stepInMeters,
  lat,
  long,
  angle
) => {
  let data = new Array()
  let feet = MetersToFeet(stepInMeters)
  let maxDistanceInMeters = MilesToFeet(maxDistanceInMiles)
  for (let i = 0; i <= maxDistanceInMeters; i += feet) {
    if (i * 0.0625 <= 300) {
      data.push(CalcEdges(lat, long, angle, 300, stepInMeters))
    } else if (i * 0.0625 > 300 && i * 0.0625 <= 1000) {
      data.push(CalcEdges(lat, long, angle, i, stepInMeters))
    } else if (i * 0.0625 > 2000) {
      data.push(CalcEdges(lat, long, angle, 1000, stepInMeters))
    }
  }
  return data
}

var GetHighestPoints = p => {
  var ss = new Array()
  p.forEach(item => {
    item.forEach(item => {
      // console.log(item.X)
      // console.log(item.Y)
      // console.log(Object.prototype.toString.call(item))
      ss.push(
        geolib.elevation({
          lat: item.X,
          lng: item.Y,
          elev: 55
        })
      )
    })
  })
  return ss
}

console.log(srtm.Quadrant())

console.log(
  geolib.getDistance(
    { latitude: 51.5103, longitude: 7.49347 },
    { latitude: "51° 31' N", longitude: "7° 28' E" }
  )
)

console.log(
  geolib.isPointInside({ latitude: 51.5125, longitude: 7.485 }, [
    { latitude: 51.5, longitude: 7.4 },
    { latitude: 51.555, longitude: 7.4 },
    { latitude: 51.555, longitude: 7.625 },
    { latitude: 51.5125, longitude: 7.625 }
  ])
)

let lat = 46.2165586970357
let lng = 7.31383640082898
let direction = 253
let miles = 40
let step = 30

let calculatedEdges = CalculateAllEdges(miles, step, lat, lng, direction)

var highestPoints = GetHighestPoints(calculatedEdges)
// console.log(highestPoints)
