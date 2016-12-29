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
    type: String!,
    period: Int!,
    time: Int!,
    price: Int!,
    profitabilityPerDay: Float!,
    profitabilityPerHour: Float!,
    amount: Float!,
    memory: Int!,
    cpu: Int!
  }

  type Activation {
    id: ID!,
    status: String!,
    startAt: String,
    leftTime: Int!,
    createdAt: String!,
    servicePlan: ServicePlan!
  }

  type Sponsor {
    id: ID!,
    firstName: String!,
    lastName: String!
  }

  type User {
    id: ID!,
    email: String!,
    firstName: String!,
    lastName: String!,
    status: String!,
    phone: String,
    country: String,
    sex: String,
    birthday: String,
    balance: Float!,
    salesBalance: Float!,
    inviteCode: String,
    isAdmin: Boolean!,
    referals: Int!,
    activations: [Activation]!,
    createdAt: String!,
    children: [User],
    sponsor: Sponsor
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

  type StatValue {
    date: String!,
    amount: Float!
  }

  type PaymentsStat {
    rental: [StatValue]!,
    referal: [StatValue]!
  }

  type NetworkStat {
    connections: [StatValue]!,
    activations: [StatValue]!
  }

  type RentalOperation {
    id: ID!,
    date: String!,
    amount: Float!,
    package: String!,
    time: Int!
  }

  type ReferalOperation {
    id: ID!,
    date: String!,
    amount: Float!,
    percent: Float!,
    package: String!,
    userId: ID!,
    participant: User!
  }

  type Operation {
    id: ID!,
    date: String!,
    amount: Float!,
    status: String!,
    direction: String!
  }

  type RootQuery {
    externalSupportRequests: [ExternalSupportRequest]!,
    users: [User]!,
    user (id: ID!) : User,
    networkTopReferals (id: ID!) : [User]!,
    networkDirectReferals (id: ID!) : [User]!
    networkHierarchy (id: ID!) : [User]!,
    networkReferalStat (id: ID!) : User,
    supportRequests: [SupportRequest]!,
    paymentsStat (id: ID!) : PaymentsStat!,
    networkStat (id: ID!) : NetworkStat!,
    rentalOperations (id: ID!) : [RentalOperation]!,
    referalOperations (id: ID!) : [ReferalOperation]!,
    operations (id: ID!) : [Operation]!
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
