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
  const answer = await profileClient.getProfileInfo(key, value)
  const [{ document }] = answer

  return {
    document
  }
}
