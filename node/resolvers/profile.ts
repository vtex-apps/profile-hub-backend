interface Args {
  key: string
  value: string
}

export const profile = (_: unknown, args: Args) => {
  return {
    firstName: 'Felipe',
    lastName: 'Mejia',
    email: 'andres.moreno3@vtex.com.br',
    birthDate: '23/06/1993',
    document: '2199410596',
    documentType: 'CC',
  }
}
