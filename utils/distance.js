const toRadians = (deg) => {
    return deg*Math.PI/180;
}

const distance = (point1,point2) => {
    const lat1 = toRadians(point1.lat);
    const long1 = toRadians(point1.long);

    const lat2 = toRadians(point2.lat);
    const long2 = toRadians(point2.long);

    const longDiff = Math.abs(long2-long1);

    const centralAngle = Math.acos(Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2)*Math.cos(longDiff));
    
    const EARTH_RADIUS = 6371;

    const dist = EARTH_RADIUS * centralAngle;
    return dist;
}


module.exports = distance;