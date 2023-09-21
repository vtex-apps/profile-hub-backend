interface Args {
  key: string
  value: string
}

export const profile = async (
  _: unknown,
  args: Args,
  { clients: { profile: profileClient } }: Context
) => {
  const { key, value } = args

  console.log('Si llego acá***************')

  const answer = await profileClient.getProfileInfo(key, value)

  const [{ document, id }] = answer
  const {
    firstName,
    lastName,
    email,
    birthDate,
    document: userDocument,
    documentType,
  } = document

  return {
    id,
    firstName,
    lastName,
    email,
    birthDate,
    document: userDocument,
    documentType,
  }
}
