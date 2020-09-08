const fs = require('fs');
const path = require('path');

const partnersRaw = fs.readFileSync(
  path.resolve(__dirname, '../data/partners.json')
);
const partners = JSON.parse(partnersRaw);

const distance = require('../utils/distance');

const toLatLong = (coordinates) => {
  const [lat, long] = coordinates.split(',');
  return { lat, long };
};

const filterPartners = (lat, long, radius) => {
  const result = partners.filter((partner) =>
    partner.offices.some((office) => {
      if (distance({ lat, long }, toLatLong(office.coordinates)) < radius) {
        office.inRadius = true;
        return true;
      }
      else return false;
    })
  );
  return result;
};

exports.getPartners = (req, res, next) => {
  const { lat, long, radius } = req.body;
  console.log(lat,long,radius)
  //   console.log(partners);
  const filtered = filterPartners(lat, long, radius);
  filtered.sort((a, b) => (a.organization < b.organization ? -1 : 1));
  //   partners.sort((a, b) => a.organization<b.organization?-1:1);

  res.status(200).json({
    status: 'success',
    data: filtered,
    // data: partners
  });
};
