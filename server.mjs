import express from 'express';
import http from 'http';
import path from 'path';
import url from 'url';

import axios from 'axios';

const API_ROOT = "https://api.deezer.com";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;

let app = express();
let server = http.Server(app);

app.use(express.static('dist'));

app.get('/search/artist', async function(req, res) {
  try {
    const {data} = await axios.get(`${API_ROOT}/search/artist/`, {
      params: {
        q: req.query.q,
        limit: 10
      }
    });
    res.status(200).send(data.data);
  } catch (error) {
    res.status(500).send({message: error});
  }
});

app.get('/albums/:artistId', async function(req, res) {
  try {
    const {data} = await axios.get(`${API_ROOT}/artist/${req.params.artistId}/albums`);
    res.status(200).send(data.data);
  } catch(error) {
    res.status(500).send({message: error});
  }
});

app.get('/tracklist/:albumId', async function(req, res) {
  try {
    const {data} = await axios.get(`${API_ROOT}/album/${req.params.albumId}/tracks`);
    res.status(200).send(data.data);
  } catch(error) {
    res.status(500).send({message: error});
  }
});

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(PORT);
