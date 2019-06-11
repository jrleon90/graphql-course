const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLList
 } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const { getVideoById, getVideos, createVideo } = require('./data');

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
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID),
                    description: 'The ID of the video'
                }
            },
            resolve: (_, args) => getVideoById(args.id)
        },
        videos: {
            type: new GraphQLList(videoType),
            resolve: getVideos
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "The root mutation type",
    fields: {
        createVideo: {
            type: videoType,
            args:{
                title:{
                    type: new GraphQLNonNull(GraphQLID),
                    description: "The Title of the Video"
                },
                duration: {
                    type: new GraphQLNonNull(GraphQLInt),
                    description: "The duration of the video (in seconds)"
                },
                released: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                    description: "Whether or not the video has been released"
                }
            },
            resolve: (_, args) => {
                return createVideo(args);
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType

});

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})