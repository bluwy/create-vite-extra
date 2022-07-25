import { createServer } from 'vite'

const entry = '/src/main.js'

const server = await createServer()
server.pluginContainer.buildStart({})

const content = await server.transformRequest(entry)
const transformed = await server.ssrTransform(content.code, content.map, entry)

console.log(transformed.code)

await server.close()
