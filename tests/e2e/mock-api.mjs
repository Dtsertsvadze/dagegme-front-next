import { createServer } from 'node:http'

const port = 4210
const photographer = {
  id: 7,
  name: {
    en: 'Aperture Studio',
    ka: 'აპერტურა სტუდიო',
  },
  description: {
    en: 'Documentary wedding and event photography.',
    ka: 'ქორწილისა და ღონისძიების დოკუმენტური ფოტოგრაფია.',
  },
  profile_photo_url: null,
  links: ['https://example.com/aperture'],
  photos: [],
  sort_order: 1,
  vip: false,
  vip_order: null,
}

const emptyEndpoints = new Set([
  '/api/bands',
  '/api/djs',
  '/api/presenters',
  '/api/rental-cars',
  '/api/studios',
  '/api/videographers',
  '/api/vips',
])

function sendJson(response, status, value) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
  })
  response.end(JSON.stringify(value))
}

const server = createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname

  if (pathname === '/health') {
    sendJson(response, 200, { ok: true })
    return
  }

  if (pathname === '/api/photographers') {
    sendJson(response, 200, [photographer])
    return
  }

  if (pathname === '/api/photographers/7') {
    sendJson(response, 200, photographer)
    return
  }

  if (emptyEndpoints.has(pathname)) {
    sendJson(response, 200, [])
    return
  }

  sendJson(response, 404, { message: 'Not found' })
})

server.listen(port, '127.0.0.1')

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)))
}
