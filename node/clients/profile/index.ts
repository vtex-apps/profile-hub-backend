import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { statusToError } from '../../utils'

const FIVE_SECONDS_MS = 5 * 1000

export class ProfileClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdClientAutCookie: context.adminUserAuthToken ?? '',
      },
      timeout: FIVE_SECONDS_MS,
    })
  }

  public getProfileInfo = (key: string, value: string) => {
    console.log(this.context)
    const testToken =
      'eyJhbGciOiJFUzI1NiIsImtpZCI6IkZBMjlDNDA0MTc5MzAzREI4MTIxNUVGMjA2Njc1NkZBRUI4MzUzMEUiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJhbmRyZXMubW9yZW5vQHZ0ZXguY29tLmJyIiwiYWNjb3VudCI6ImNhc2lub2ZycWEiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6Ijk1MDRjOWJjLTZlNmQtNDI1My04NGMwLTYzYjc4YmJhMzk3MiIsImV4cCI6MTY5NTQ3NzY5NywidXNlcklkIjoiMjlkYmM1M2UtNjkwZC00NWNjLWE4ODAtNDFhYTkxMDIyNThiIiwiaWF0IjoxNjk1MzkxMjk3LCJpc3MiOiJ0b2tlbi1lbWl0dGVyIiwianRpIjoiZjBlMTkyNmMtNTY3My00YTc0LWE1Y2ItNDBjZmU3M2FlNGZjIn0.-9tVm-vl1TQ5fZwdFE1zXBRjKVbSaI3bEfKQeGXqwSvWzJNwuzkK6LiPxsEEnq0E0s3pHNU0IQDn1ethEhdFAA'

    // WIP
    const userFromToken = testToken.split('.')[1]
    const finalResult = Buffer.from(userFromToken, 'base64').toString()

    console.log('on behalf***************')
    console.log(finalResult)

    const url = `${this.baseUrl}/${value}/unmask?${
      key !== 'profileId' ? `alternativeKey=${key}&` : ''
    }reason=profileHub-SearchProfiles`

    const response = this.get<Profile>(url, {
      metric: 'profile-system-getProfileInfo',
    })

    return response
  }

  protected get = <T>(url: string, config?: RequestConfig) =>
    this.http.get<T>(url, config).catch<any>(statusToError)

  private baseUrl = 'api/storage/profile-system/profiles'
}
