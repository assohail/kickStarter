import routes from 'next-routes';
// let routes = route();
export default routes()
.add('/campaigns/:address', '/campaigns/show')
// .add('/campaigns/:address/', '/campaigns/requests/index'); 

