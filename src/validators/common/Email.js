import t from 'tcomb-validation'

const Email = t.subtype(t.String, value => /.+@.+\..+/.test(value), 'Email')

export default Email
