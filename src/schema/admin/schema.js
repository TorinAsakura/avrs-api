const schema = `
  type ExternalSupportRequest {
    id: ID!,
    status: String!,
    email: String!,
    subject: String!,
    message: String!,
    createdAt: String!
  }

  type RootQuery {
    externalSupportRequests: [ExternalSupportRequest]!
  }

  type RootMutation {
    markAsReadExternalSupportRequest (id: ID!) : ExternalSupportRequest
  }

  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`

export default schema
