import { json } from '@remix-run/node';

export async function loader({ request }) {
  const url = new URL(request.url);
  const countryCode = url.searchParams.get('countryCode');

  if (!countryCode) {
    return json({ cities: [] });
  }

  const API_KEY = process.env.GEODB_KEY;

  try {
    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions`, {
      headers: {
        'x-rapidapi-key': `${API_KEY}`,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cities', response.error);
    }

    const data = await response.json();
    console.log("cities data", data)
    const cities = data.data.map(city => ({
      name: city.name,
      code: city.isoCode,
    }));

    return json({ cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return json({ cities: [] });
  }
}