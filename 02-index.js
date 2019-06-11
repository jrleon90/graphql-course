const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Schema { query: Query }
    type Query { 
        id: ID,
        title: String,
        duration: Int,
        released: Boolean
     }
`);

const resolvers = {
    id: () => '1',
    title: () => 'bar',
    duration: () => 180,
    released: () => true,
};

const query = `
    query myFirstQuery {
        id,
        title,
        duration
    }
`;

graphql(schema, query, resolvers)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));