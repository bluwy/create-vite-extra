import fs from 'node:fs/promises'
import express from 'express'

const app = express()

let vite
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })
  app.use(vite.middlewares)
} else {
  const { default: compression } = await import('compression')
  const { default: sirv } = await import('sirv')
  app.use(compression())
  app.use(sirv('./dist/client', { extensions: [] }))
}

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl

    let template
    let render
    if (process.env.NODE_ENV !== 'production') {
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.js')).render
    } else {
      template = await fs.readFile('./dist/client/index.html', 'utf-8')
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

app.listen(5173, () => {
  console.log('Server started at http://localhost:5173')
})
