import { IOClients } from '@vtex/api'

import { BookClient } from './book'
import { MarkdownClient } from './markdown'
import { ProfileClient } from './profile'

export class Clients extends IOClients {
  public get book() {
    return this.getOrSet('book', BookClient)
  }

  public get markdown() {
    return this.getOrSet('markdown', MarkdownClient)
  }

  public get profile() {
    return this.getOrSet('profile', ProfileClient)
  }
}
