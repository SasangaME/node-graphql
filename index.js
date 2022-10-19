import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema'

config();

const data = {
    warriors: [
        { id: '001', name: 'Jaime' },
        { id: '002', name: 'Jorah' },
    ],
};

// Schema
const typeDefs = `
type Warrior {
    id: ID!
    name: String!
}

type Query {
    warriors: [Warrior]
}
`;

// Resolver for warriors
const resolvers = {
    Query: {
        warriors: (obj, args, context) => context.warriors,
    },
};

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.json({ message: "server is running" });
});

// Entrypoint
app.use(
    '/graphql',
    graphqlHTTP({
        schema: executableSchema,
        context: data,
        graphiql: true,
    })
)



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express app listening on port: ${port}`);
});