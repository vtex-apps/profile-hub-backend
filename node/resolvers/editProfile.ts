interface Args {
    value:string,
    newValues: JSON
  }
  
  export const editProfile = async (
    _: unknown,
    args: Args,
    { clients: { profile: profileClient } }: Context
  ) => {
    const { value, newValues } = args
    console.log('editProfile: ',value,' ', newValues)
    console.log(await profileClient.updateProfileInfo(value, newValues))
    const answer = await profileClient.updateProfileInfo(value, newValues)
    console.log('answer editProfile: ',answer)
    const {id} = answer
  
    return {
      id
    }
  }
  