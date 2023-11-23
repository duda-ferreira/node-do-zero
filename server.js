// import { createServer } from 'node:http'

// const server = createServer((req, res) => {
//     res.write('hello darling')

//     res.end()
// })


// server.listen(3333, () => {
//     console.log('server está rodando na porta http://localhost:3333')
// })

import { fastify } from "fastify";
//import { DatabaseMemory } from "./database-memory.js";

import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()

//const database = new DatabaseMemory()

const database = new DatabasePostgres()

server.get('/videos', async () => {
    const videos = await database.list()

    return videos
})

// Request Body

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
       title,
       description,
       duration
    })

    

    return reply.status(201).send()
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id 
    const { title, description, duration } = request.body

    await database.update({
        title,
        description,
        duration
    })

    return reply.status(204).send()
    
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id 


    await database.delete(videoId)     

    return reply.status(204).send()

})


server.listen({
    port: process.env.PORT ?? 3333
})
