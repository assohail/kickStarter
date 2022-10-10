import route from 'next-routes';
let routes = route();

routes.add('/campaigns/:address', '/campaigns/show');

export default routes;
   

