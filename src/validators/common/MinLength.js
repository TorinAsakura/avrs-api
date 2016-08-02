import t from 'tcomb-validation'

const MinLength = length => t.subtype(t.String, s => s.length > length, 'MinLength')

export default MinLength
