# mock-vue-router
A mock vue-router to aid unit testing

## Install
`npm install mock-vue-router --save-dev`

## Create
```js
import mock from 'mock-vue-router';
const {$router, $route} = mock();
```

## Create with routes
```js
import mock from 'mock-vue-router';
const {$router, $route} = mock(['/', '/users', '/users/:userId']);
```

mock-vue-router mimics all standard behaviour of vue-router, such as `$router.push`, `$router.replace`, and navigation variants. The corresponding `$route` object will update to reflect the current path, params, query, and hash.

Full Documentation:  
https://jackmellis.gitbooks.io/vuenit/content/router/introduction.html
