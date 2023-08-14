const express = require('express');
const axios = require('axios');
const app = express();


app.get('/numbers', async (req, res) => {
    const queries = Array.isArray(req.query.url) ? req.query.url : [req.query.url];

    const numbers = await getNumbers(queries);

    res.json({ numbers });
});


async function getNumbers(urls) {
    const fetchResults = urls.map(async (url) => {
        try {
            const response = await axios.get(url, { timeout: 500 });
            return response.data.numbers;

        } catch (error) {
            return error.message;
        }
    });

    const responses = await Promise.allSettled(fetchResults);

    const allNumbers = responses.reduce((request, response) => {
        if (response.status === 'fulfilled') {
            request.push(...response.value);
        }
        return request;
    }, []);

    const result = [...new Set(allNumbers)];

    return result.sort((a, b) => a - b);
}

app.listen(8008, () => {
    console.log(`Server is running on port http://localhost:${8008}`);
});