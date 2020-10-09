require('newrelic');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use('/', expressStaticGzip(path.resolve(__dirname, '..', 'public')));
app.use(bodyParser.json());
/**
 * CHRISTINA - GAME REVIEWS
 */
const gameReviews = express.Router();
app.use('/api/gamereviews', gameReviews);
gameReviews.get('/:gameid', (req, res) => {
  // gameReviews.get('/', (req, res) => {
  let { gameid } = req.params;
  //let { gameid } = req.query;
  // Build url string with filter query support

  //let urlStr = `http://18.220.196.29:3001/api/gamereviews/${gameid}`;

  //nginx address: http://13.58.60.88/
  let urlStr = `http://13.58.60.88:3001/api/gamereviews/${gameid}`;
  console.log('GET ', gameid)
  if (Object.keys(req.query).length) {
    urlStr += '?';
  }
  Object.keys(req.query).forEach((key, idx) => {
    if (idx !== 0) {
      urlStr += '&';
    }
    urlStr += `${key}=${req.query[key]}`
  });

  fetch(urlStr)
    .then(response => response.json())
    .then(results => {
      res.status(200).json(results);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: 'Error fetching reviews' });
    });
});

gameReviews.post('/post/:id_game', (req,res) => {
  let gameid = req.params;
  console.log('POSTING', gameid)
  let body = {
    ...gameid,
    ...req.body
  }
  //let urlStr = `http://18.220.196.29:3001/api/create/${gameid}`;
  let urlStr = `http://13.58.60.88:80/api/create/${gameid}`;

  fetch(urlStr, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type' : 'application/json'}
  }).then(response => res.send(201))
  .catch(err => {
    console.error(err);
    res.send(500);
  });
})

/////////////////////////////////////////////////////////////////

/**
 * CHRISTINA - GAME DESCRIPTION
 */
// const gameDesc = express.Router();
// app.use('/api/description', gameDesc);
// gameDesc.get('/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://ec2-13-59-202-34.us-east-2.compute.amazonaws.com:3001/api/description/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching game description' });
//     });
// });

// /**
//  * DAMIEN - REVIEWS GRAPH
//  */
// const reviewsGraph = express.Router();
// app.use('/api/reviewcount', reviewsGraph);
// reviewsGraph.get('/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://ec2-54-185-79-51.us-west-2.compute.amazonaws.com:3002/api/reviewcount/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching reviews graph info' });
//     });
// });

// reviewsGraph.get('/detail/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://ec2-54-185-79-51.us-west-2.compute.amazonaws.com:3002/api/reviewcount/detail/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching reviews graph info' });
//     });
// });

// reviewsGraph.get('/recent/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://ec2-54-185-79-51.us-west-2.compute.amazonaws.com:3002/api/reviewcount/recent/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching reviews graph info' });
//     });
// });

// reviewsGraph.get('/recent/detail/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://ec2-54-185-79-51.us-west-2.compute.amazonaws.com:3002/api/reviewcount/recent/detail/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching reviews graph info' });
//     });
// });

// /**
//  * DAMIEN - USER TAGS
//  */
// const userTags = express.Router();
// app.use('/api/tags', userTags);
// userTags.get('/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://ec2-54-185-79-51.us-west-2.compute.amazonaws.com:3006/api/tags/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching user tags' });
//     });
// });

// /**
//  * JEREMY - DOWNLOADABLE CONTENT
//  */
// const dlc = express.Router();
// app.use('/api/dlc', dlc);
// dlc.get('/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://ec2-13-56-224-137.us-west-1.compute.amazonaws.com:3003/api/dlc/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching downloadable content' });
//     });
// });

// const gameName = express.Router();
// app.use('/api/name', gameName);
// gameName.get('/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://ec2-13-56-224-137.us-west-1.compute.amazonaws.com:3003/api/name/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching game name' });
//     });
// });

// /**
//  * JEREMY - RELATED GAMES
//  */
// const relatedGames = express.Router();
// app.use('/api/related', relatedGames);
// relatedGames.get('/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://localhost:3007/api/related/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching related games' });
//     });
// });

// /**
//  * WILL - PHOTO CAROUSEL
//  */
// const photoCarousel = express.Router();
// app.use('/api/media', photoCarousel);
// photoCarousel.get('/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://ec2-18-188-192-44.us-east-2.compute.amazonaws.com:3004/api/media/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching game media' });
//     });
// });

// /**
//  * WILL - SYSTEM REQUIREMENTS
//  */
// const sysReqs = express.Router();
// app.use('/api/system', sysReqs);
// sysReqs.get('/:gameid', (req, res) => {
//   let { gameid } = req.params;
//   fetch(`http://localhost:3008/api/system/${gameid}`)
//     .then(response => response.json())
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).json({ error: 'Error fetching system requirements' });
//     });
// });

app.get('/app/:gameid', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Server listening on port ${process.env.PORT || 3000}`)
// });

app.listen(3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`)
});

