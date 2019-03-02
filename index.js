var feetToMeters = feet => feet / 3.2808
var MetersToFeet = meters => meters * 3.2808
var milesToMeters = miles => miles * 1852

var degrees_to_radians = degrees => {
  var pi = Math.PI
  return degrees * (pi / 180)
}

var position = (lat, long, angle, distance) => {
  let X =
    feetToMeters(distance) * Math.cos(degrees_to_radians(angle)) * 0.00001 + lat
  let Y =
    feetToMeters(distance) * Math.sin(degrees_to_radians(angle)) * 0.00001 +
    long
  return { X, Y }
}

var final = (lat, long, angle, feet) => {
  let Mid = position(lat, long, angle, feet)
  let Minus90 = position(lat, long, angle - 90, feet)
  let Plus90 = position(lat, long, angle + 90, feet)
  return { mid: Mid, minus: Minus90, plus: Plus90 }
}

var feet600 = 9601 // 2956
var feet4000 = 64001 // 19507

var calculate = (distanceInFeet, maxDistanceInFeet, stepInMeters) => {
  let data = {
    small: [],
    medium: [],
    large: []
  }
  for (
    distanceInFeet;
    distanceInFeet <= maxDistanceInFeet;
    distanceInFeet + MetersToFeet(stepInMeters)
  ) {
    if (distanceInFeet * 0.0625 < 600) {
      data.small.push(position(lat, long, angle - 90, feetToMeters(feet)))
    } else if (
      distanceInFeet * 0.0625 > 600 &&
      distanceInFeet * 0.0625 <= 2000
    ) {
    } else {
    }
  }
}

//46.2165586970357 7.31383640082898
console.log(final(46.2165586970357, 7.31383640082898, 253 - 90))
