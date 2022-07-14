# Calendar Backend

### Elis Antonio Perez
Fallow me [Instagram](https://www.instagram.com/elisperezmusic/)

## Express Router
- We can use express Router as follows:
```
const express = require('express');
const router = express.Router();
```

- Or use destructuring like this:
```
const { Router } = require('express');
const router = Router();
```

## Express Request and Response

- We can activate the intellisense with "express.request" and "express.response":
```
const express = require('express');

const controllerName = (req = express.request, res = express.response) => {
  res.json({
    message: 'Message from controller of route!',
  });
};
```

- Or use destructuring like this:
```
const { request, response } = require('express');

const controllerName = (req = request, res = response) => {
  res.json({
    message: 'Message from controller of route!',
  });
};
```

## CORS - Cross Origin Resource Sharing.
- Is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served. [More on Wikipedia...](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)