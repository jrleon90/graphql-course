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
const videoA = {
    id: '1',
    title: 'First Video',
    duration: 180,
    released: true
};

const videoB = {
    id: '2',
    title: 'Second Video',
    duration: 120,
    released: true
};

const videos = [ videoA, videoB ];

const getVideoById = id => new Promise(resolve => {
        const [video] = videos.filter(video => video.id === id);
        resolve(video);
    });


const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
            type: videoType,
            args: {
                id: {
                    type: GraphQLID,
                    description: 'The ID of the video'
                }
            },
            resolve: (_, args) => getVideoById(args.id)
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