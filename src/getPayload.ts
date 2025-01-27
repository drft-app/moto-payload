import { getPayload } from 'payload'
import config from '@/payload.config'

export const getPayloadClient = async () => {
  const payload = getPayload({
    config,
  })
  return payload
}
