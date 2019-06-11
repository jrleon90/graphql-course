const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean
 } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 3000;

const server = express();

const videoType = new GraphQLObjectType({
    name: 'VideoType',
    description: 'A video on my domain',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The ID of the video'
        },
        title: {
            type: GraphQLString,
            description: 'The Title of the Video'
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video (in seconds)'
        },
        released: {
            type: GraphQLBoolean,
            description: 'Wheter or not the viewer has released the video'
        }
    }
});


const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
            type: videoType,
            resolve: () => new Promise(resolve => {
                resolve({
                    id: '1',
                    title: 'First Video',
                    duration: 180,
                    released: true
                });
            })
        }
    }
});


const schema = new GraphQLSchema({
    query: queryType,

});

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})