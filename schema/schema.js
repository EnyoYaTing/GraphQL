const graphql = require('graphql');
const _ = require('lodash'); // helping to walk through to collection of the data (ex. const users)

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema //takes the RootQuery and return the graphql instances
} = graphql;

const users = [
  { id: '23', firstName: 'Bill', age: 20 },
  { id: '47', firstName: 'Samantha', age: 21 }
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
})

// RootQuery is for jumping to find the specific target
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType, // then it will return you a UserType
      args: { id: {type: GraphQLString} }, // If you give graphql a user id,
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      } // is for accessing to the database to fine our required data
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
