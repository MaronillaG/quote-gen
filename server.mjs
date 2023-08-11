import express from 'express';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv-esm';

dotenv.config()
const unsplashedapiKey = process.env.API_KEY;

const app = express();
const port = 8000;

app.use(express.json());

app.get('/proxy', async (req, res) => {
    try {
        const response = await fetch('https://zenquotes.io/api/quotes');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: 'Proxy request failed'});
    }
})

app.get('/background-image', async (req, res) => {
    try {
      const response = await fetch('https://api.unsplash.com/photos/nature', {
        headers: {
          Authorization: `Client-ID ${unsplashedapiKey}`,
        },
      });
  
      const data = await response.json();
      res.json({ backgroundImage: data.urls.regular });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch background image' });
    }
  });

  const currentModuleUrl = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleUrl);
const appRootPath = dirname(currentModulePath);

import path from 'path'; 
app.use(express.static(path.join(appRootPath, 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(appRootPath, 'client', 'build', 'index.html'));
});


app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`)
})