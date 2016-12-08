const schema = `
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
    startAt: String!,
    expireAt: String!,
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

  type RootQuery {
    externalSupportRequests: [ExternalSupportRequest]!,
    users: [User]!,
    user (id: ID!) : User,
    networkTopReferals (id: ID!) : [User]!,
    networkDirectReferals (id: ID!) : [User]!
    networkHierarchy (id: ID!) : [User]!,
    networkReferalStat (id: ID!) : User
  }

  type RootMutation {
    markAsReadExternalSupportRequest (id: ID!) : ExternalSupportRequest
    addAdminPermission (id: ID!): User,
    removeAdminPermission (id: ID!): User
  }

  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`

export default schema
