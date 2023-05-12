const getRandCoord = (center, radius) => {
  const y0 = center.latitude;
  const x0 = center.longitude;
  const rd = radius / 111300; // about 111300 meters in one degree

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const newlat = y + y0;
  const newlon = x + x0;

  return { latitude: newlat, longitude: newlon };
};

const getRandomCoordinates = (center, radius, count) => {
  const coords = [];
  for (let i = 0; i < count; i++) {
    coords.push(getRandCoord(center, radius));
  }
  return coords;
};

const getDistance = (coord1, coord2) => {
  const R = 6371e3; // Earth's radius in meters
  const lat1 = (coord1.latitude * Math.PI) / 180;
  const lat2 = (coord2.latitude * Math.PI) / 180;
  const deltaLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const deltaLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const findClosestCoord = (coords, target) => {
  let closestCoord = coords[0];
  let minDistance = getDistance(coords[0], target);

  for (let i = 1; i < coords.length; i++) {
    const distance = getDistance(coords[i], target);
    if (distance < minDistance) {
      closestCoord = coords[i];
      minDistance = distance;
    }
  }

  return closestCoord;
};

const find3kmCoord = (coords, target) => {
  const findCoord = [];
  for (let i = 1; i < coords.length; i++) {
    let distance = getDistance(coords[i], target)/1000;
    if (distance <= 3){
      findCoord.push(coords[i]);
    }
  }
  return findCoord;
};

const find3ClosesCoord = (coords, target) => {
  const findCoord = [];

  for ( let i =0 ; i<3 ; i++){

    let coord = findClosestCoord(coords,target);
    findCoord.push(coord);

    let index = coords.indexOf(coord);
    if (index > -1) { 
      coords.splice(index, 1); 
    }
    
  }

  return findCoord;

};

module.exports = {
  findClosestCoord,
  getRandomCoordinates,
  find3kmCoord,
  find3ClosesCoord
};
