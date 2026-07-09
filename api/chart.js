export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { date, time, lat, lon } = req.body;

  const response = await fetch('https://json.astrologyapi.com/v1/planets', {
    method: 'POST',
    headers: {
      'authorization': 'Basic ' + Buffer.from(
        process.env.ASTRO_USER_ID + ':' + process.env.ASTRO_API_KEY
      ).toString('base64'),
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      year: parseInt(date.split('-')[0]),
      month: parseInt(date.split('-')[1]),
      date: parseInt(date.split('-')[2]),
      hours: parseInt(time.split(':')[0]),
      minutes: parseInt(time.split(':')[1]),
      seconds: 0,
      latitude: lat,
      longitude: lon,
      timezone: 3.0,
      config: { observation_point: 'topocentric', ayanamsha: 'LAHIRI' }
    })
  });

  const data = await response.json();
  res.json(data);
}
