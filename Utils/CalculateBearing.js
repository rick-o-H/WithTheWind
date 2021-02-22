const CalculateBearingAngle = (sLat, sLon, eLat, eLon) => {
  var radian_constant = 0.01745329;
  var sLAT = sLat * radian_constant;
  var sLON = sLon * radian_constant;
  var eLAT = eLat * radian_constant;
  var eLON = eLon * radian_constant;
  var segment_angle = angleFromCoordinate(sLAT,sLON,eLAT,eLON);

  function angleFromCoordinate(sLAT,sLON,eLAT,eLON) {
    var p1 = {
      x: sLAT,
      y: sLON
    };
    var p2 = {
      x: eLAT,
      y: eLON
    };
    // angle in radians
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    // angle in degrees
    var angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI) + 180;
    return angleDeg;
  }

  return segment_angle;
}

module.exports = {
  CalculateBearingAngle
}