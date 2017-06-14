import test from 'ava';
import mock from '../src';

test('has the path of the current route', t => {
  let {$route} = mock('/users/add');
  t.is($route.path, '/users/add');
});
test('path does not contain the query', t => {
  let {$router, $route} = mock('/users/add', '/users/add?foo=1&bah=2');
  t.is($route.path, '/users/add');
});
test('path does not contain the hash', t => {
  let {$router, $route} = mock('/users/add', '/users/add#myid');
  t.is($route.path, '/users/add');
});
test('path contains dynamic values', t => {
  let {$router, $route} = mock('/users/:userId', '/users/4');
  t.is($route.path, '/users/4');
});

test('has a matched array containing the current route definition', t => {
  let {$route} = mock('/users');
  t.is($route.matched.length, 1);
  t.not($route.matched[0], $route);
  t.is($route.matched[0].path, '/users');
});

test('matched contains all parents of a current child route', t => {
  let {$route} = mock([
    {
      path : '/users',
      children : [
        {
          path : 'add',
          children : [':many']
        }
      ]
    }
  ], '/users/add/many');
  t.is($route.matched.length, 3);
  t.is($route.matched[0].path, '/users');
  t.is($route.matched[1].path, 'add');
  t.is($route.matched[2].path, ':many');
});

test('has the query of the current route', t => {
  let {$route} = mock('/users/:userId', '/users/4#myid?foo=1&bah=2');
  t.is($route.query.foo, '1');
  t.is($route.query.bah, '2');
});

test('has the params of the current route', t => {
  let {$route} = mock('/users/:userId', '/users/4#myid?foo=1&bah=2');
  t.is($route.params.userId, '4');
});

test('has the hash of the current route', t => {
  let {$route} = mock('/users/:userId', '/users/4#myid?foo=1&bah=2');
  t.is($route.hash, '#myid');
});

test('has the full path including query has hash', t => {
  let {$route} = mock('/users/:userId', '/users/4#myid?foo=1&bah=2');
  t.is($route.fullPath, '/users/4#myid?foo=1&bah=2');
});

test('updating the route changes the current route without replacing the object reference', t => {
  let {$route, $router} = mock(['/users/add', '/users/edit']);
  t.is($route.path, '/users/add');
  $router.push('/users/edit');
  t.is($route.path, '/users/edit');
});

test('has the name of the route', t => {
  let routes = [
    {
      path : '/users/add',
      name : 'addUser'
    }
  ];
  let {$router, $route} = mock(routes);

  t.is($route.name, 'addUser');
});

test('has the routes meta data', t => {
  let routes = [
    {
      path : '/users/add',
      meta : {
        title : 'some title'
      }
    }
  ];
  let {$router, $route} = mock(routes);

  t.truthy($route.meta);
  t.is($route.meta.title, 'some title');
});
