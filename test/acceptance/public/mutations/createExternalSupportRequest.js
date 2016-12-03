import gql from 'graphql-tag'
import test from 'ava'
import { createClient, formatErrors } from '../../utils'

let client = null

test.before(async () => {
  client = await createClient()
})

test.after(() => {
  client.close()
})

const mutation = gql`
  mutation createExternalSupportRequest($email: String!, $subject: String!, $message: String!) {
    createExternalSupportRequest(email: $email, subject: $subject, message: $message) {
      errors {
        key
        message
      }
      request {
        id
      }
    }
  }
`

test('check validation', async t => {
  t.plan(3)

  const { data } = await client.mutate({
    mutation,
    variables: {
      email: '',
      subject: '',
      message: '',
    },
  })

  const errors = formatErrors(data.createExternalSupportRequest.errors)

  t.truthy(errors.email)
  t.truthy(errors.subject)
  t.truthy(errors.message)
})

test('check create', async t => {
  const { data } = await client.mutate({
    mutation,
    variables: {
      email: 'some@example.com',
      subject: 'Subject',
      message: 'Message',
    },
  })

  t.truthy(data.createExternalSupportRequest.request)
})
