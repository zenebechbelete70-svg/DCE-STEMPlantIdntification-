export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Your API key is pulled from Vercel's Environment Variables (set in Step 4)
    const MY_API_KEY = process.env.PLANT_ID_API_KEY; 

    try {
        const { image } = req.body;

        const response = await fetch("https://api.plant.id/v3/identification", {
            method: 'POST',
            headers: {
                'Api-Key': MY_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "images": [image],
                "latitude": 6.41,
                "longitude": 38.31,
                "similar_images": true
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Server Error: " + error.message });
    }
}