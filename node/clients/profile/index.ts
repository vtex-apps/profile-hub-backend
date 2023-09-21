import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { statusToError } from '../../utils'

const FIVE_SECONDS_MS = 5 * 1000

export class ProfileClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    // console.log('Auth token******')
    // console.log(context.authToken)
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        // VtexIdClientAutCookie: context.adminUserAuthToken ?? '',
        VtexIdClientAutCookie:
          'eyJhbGciOiJFUzI1NiIsImtpZCI6IkNEQzc4ODBCQkQxNzUzMDY0Mjc3MThBRTA1RTNBNjNFRUY5QkY5RkQiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJhbmRyZXMubW9yZW5vQHZ0ZXguY29tLmJyIiwiYWNjb3VudCI6ImNhc2lub2ZycWEiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6Ijk1MDRjOWJjLTZlNmQtNDI1My04NGMwLTYzYjc4YmJhMzk3MiIsImV4cCI6MTY5NTM4NjM1NSwidXNlcklkIjoiMjlkYmM1M2UtNjkwZC00NWNjLWE4ODAtNDFhYTkxMDIyNThiIiwiaWF0IjoxNjk1Mjk5OTU1LCJpc3MiOiJ0b2tlbi1lbWl0dGVyIiwianRpIjoiOTk3YWNhNTYtNWRhZC00Y2JhLWFkZDYtZDg2NjlhYTcwNTYwIn0._RhFcMbJoc8uELlUkdm4IC0btQdKQfNrk0M_CK0LKgYm3bfkXUFRA4VQwkxq8f0lFxj_19Sh4C8bTRCPMZHPyg',
      },
      timeout: FIVE_SECONDS_MS,
    })
  }

  public getProfileInfo = (key: string, value: string) => {
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
