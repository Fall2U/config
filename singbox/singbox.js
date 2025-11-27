let { type, name, includeUnsupportedProxy, url } = $arguments

type = /^1$|col|组合/i.test(type) ? 'collection' : 'subscription'

const parser = ProxyUtils.JSON5 || JSON
const config = parser.parse($content ?? $files[0])

let proxies
if (url) {
  proxies = await produceArtifact({
    name,
    type,
    platform: 'sing-box',
    produceType: 'internal',
    produceOpts: {
      'include-unsupported-proxy': includeUnsupportedProxy,
    },
    subscription: {
      name,
      url,
      source: 'remote',
    },
  })
} else {
  proxies = await produceArtifact({
    name,
    type,
    platform: 'sing-box',
    produceType: 'internal',
    produceOpts: {
      'include-unsupported-proxy': includeUnsupportedProxy,
    },
  })
}

const tags = proxies.map(p => p.tag)

config.outbounds.forEach(outbound => {
  if (outbound.tag === 'Proxy') {
    if (!Array.isArray(outbound.outbounds)) {
      outbound.outbounds = []
    }
    outbound.outbounds.push(...tags)
  }
})

config.outbounds.push(...proxies)

$content = JSON.stringify(config, null, 2)
