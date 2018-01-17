import Hapi from 'hapi';
import inventory from './inventory';
import recipe from './recipes';
import planRoutes from './plan';

const server = new Hapi.Server();

server.connection({
    port: 3000,
    host: 'localhost'
});

server.register(require('hapi-auth-jwt'), (err) => {
    server.auth.strategy('token', 'jwt', {

        key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',

        verifyOptions: {
            algorithms: ['HS256'],
        }

    });
    //Adding all inventory routes
    inventory.inventoryRoutes.forEach((route) => {
        server.route(route);
    });
    //Adding all recipe routes 
    recipe.recipeRoutes.forEach((route) => {
        server.route(route);
    });
    //Adding all the plan routes 
    planRoutes.planRoutes.forEach((route) => {
        server.route(route);
    });
});

server.start(err => {

    if (err) {
        console.error(err);
    }

    console.log(`Server started at ${server.info.uri}`);

});