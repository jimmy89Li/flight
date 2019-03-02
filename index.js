let lat = 46.2165586970357
let long = 7.31383640082898
let direction = 253
let miles = 40
let step = 30

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

var CalcEdges = (lat, long, angle, feet) => {
  let Mid = position(lat, long, angle, feet)
  let Minus90 = position(lat, long, angle - 90, feet)
  let Plus90 = position(lat, long, angle + 90, feet)
  return { mid: Mid, minus: Minus90, plus: Plus90 }
}

var feet600 = 9601 // 2956
var feet4000 = 64001 // 19507

var CalculateAllEdges = (
  distanceInFeet,
  maxDistanceInFeet,
  stepInMeters,
  lat,
  long,
  angle
) => {
  let data = {
    small: [],
    medium: [],
    large: []
  }
  for (
    let i = distanceInFeet;
    i <= maxDistanceInFeet;
    i + MetersToFeet(stepInMeters)
  ) {
    if (i * 0.0625 < 300) {
      data.small.push(CalcEdges(lat, long, angle, 300))
    } else if (i * 0.0625 > 300 && i * 0.0625 <= 1000) {
      data.medium.push(CalcEdges(lat, long, angle, i))
    } else if (i * 0.0625 > 2000) {
      data.large.push(CalcEdges(lat, long, angle, 1000))
    }
  }
  return data
}

//46.2165586970357 7.31383640082898
console.log(
  CalculateAllEdges(0, MilesToMeters(miles), step, lat, long, direction)
)
