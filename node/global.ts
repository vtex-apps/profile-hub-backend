import { MetricsAccumulator } from '@vtex/api'

if (!global.metrics) {
  console.error('No global.metrics at require time')
  global.metrics = new MetricsAccumulator()
}

declare global {
  interface Document {
    firstName: string
    lastName: string
    email: string
    birthDate: string
    document: string
    documentType: string
  }

  interface Meta {
    version: string
    author: string
    creationDate: string
    lastUpdateDate: string
    expirationDate: string | null
  }

  interface Profile {
    id: string
    document: Document
    meta: Meta
  }
}
