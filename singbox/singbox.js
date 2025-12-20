const { type, name } = $arguments
const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}

let config = JSON.parse($files[0])
let proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})

config.outbounds.push(...proxies)

const proxyGroup = config.outbounds.find(i => i.tag === 'Proxy')

if (proxyGroup) {
  proxyGroup.outbounds.push(...proxies.map(p => p.tag))

  if (proxyGroup.outbounds.length === 0) {
    config.outbounds.push(compatible_outbound)
    proxyGroup.outbounds.push(compatible_outbound.tag)
  }
}

$content = JSON.stringify(config, null, 2)
