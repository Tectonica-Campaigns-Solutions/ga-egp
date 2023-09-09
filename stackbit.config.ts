import { defineStackbitConfig } from '@stackbit/types'
import { DatoCMSContentSource } from '@stackbit/cms-datocms'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  contentSources: [
    new DatoCMSContentSource({
      apiToken: process.env.DATOCMS_API_TOKEN!,
      projectId: process.env.DATOCMS_PROJECT_ID!,
    }),
  ],
  modelExtensions: [{ name: 'page', type: 'page', urlPath: '/{slug}' }],
})