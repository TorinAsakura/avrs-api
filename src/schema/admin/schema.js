const schema = `
  type ValidationError {
    key: [String],
    message: String!,
  }

  type ExternalSupportRequest {
    id: ID!,
    status: String!,
    email: String!,
    subject: String!,
    message: String!,
    createdAt: String!
  }

  type ServicePlanCpu {
    from: Int!,
    to: Int!
  }

  type ServicePlan {
    id: ID!,
    type: String!,
    name: String!,
    time: Int!,
    price: Int!,
    period: Int!,
    profitability: Int!,
    profitabilityPerDay: Float!,
    profitabilityPerHour: Float!,
    profit: Int!,
    amount: Int!,
    memory: Int!,
    cpu: ServicePlanCpu!,
    expireAt: String
  }

  type Activation {
    id: ID!,
    status: String!,
    startAt: String,
    leftTime: Int!,
    createdAt: String!,
    servicePlan: ServicePlan!
  }

  type User {
    id: ID!,
    email: String!,
    firstName: String!,
    lastName: String!,
    status: String!,
    balance: Float!,
    salesBalance: Float!,
    inviteCode: String,
    isAdmin: Boolean!,
    referals: Int!,
    activations: [Activation]!,
    createdAt: String!,
    children: [User]
  }

  type SupportRequestMessage {
    id: ID!,
    type: String,
    read: Boolean!,
    body: String!,
    createdAt: String!
  }

  type SupportRequest {
    id: ID!,
    status: String!,
    subject: String!,
    createdAt: String!,
    messages: [SupportRequestMessage]!
  }

  type SupportRequestMessageResponse {
    errors: [ValidationError]!,
    message: SupportRequestMessage
  }

  type RootQuery {
    externalSupportRequests: [ExternalSupportRequest]!,
    users: [User]!,
    user (id: ID!) : User,
    networkTopReferals (id: ID!) : [User]!,
    networkDirectReferals (id: ID!) : [User]!
    networkHierarchy (id: ID!) : [User]!,
    networkReferalStat (id: ID!) : User,
    supportRequests: [SupportRequest]!
  }

  type RootMutation {
    markAsReadExternalSupportRequest (id: ID!) : ExternalSupportRequest
    addAdminPermission (id: ID!): User,
    removeAdminPermission (id: ID!): User,
    sendSupportRequestMessage (requestId: ID!, message: String!) : SupportRequestMessageResponse,
  }

  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`

export default schema
