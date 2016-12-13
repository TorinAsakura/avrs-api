const schema = `
  enum SessionStatus {
    OPENED
    CLOSED
    CALCULATED
  }

  input PasswordType {
    value: String!,
    confirmation: String!
  }

  type AuthTokenType {
    id: ID!,
    email: String!,
    token: String!
  }

  type ValidationErrorType {
    key: [String],
    message: String!,
  }

  type ServicePlanCpuType {
    from: Int!,
    to: Int!
  }

  type ServicePlanType {
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
    cpu: ServicePlanCpuType!,
    expireAt: String
  }

  type UserSchedule {
    mon: [String]!,
    tue: [String]!,
    wed: [String]!,
    thu: [String]!,
    fri: [String]!,
    sat: [String],
    sun: [String]!
  }

  type ActivationType {
    id: ID!,
    status: String!,
    startAt: String,
    leftTime: Int!,
    createdAt: String!,
    servicePlan: ServicePlanType!
  }

  type Sponsor {
    id: ID!,
    firstName: String!,
    lastName: String!
  }

  type UserType {
    id: ID!,
    status: String!,
    email: String!,
    firstName: String!,
    lastName: String!,
    schedule: UserSchedule!,
    balance: Float!,
    inviteCode: String,
    activations: [ActivationType]!,
    plan: ServicePlanType,
    salesBalance: Float!,
    referals: Int!,
    createdAt: String!,
    sponsor: Sponsor
  }

  type NetworkUserType {
    id: ID!,
    email: String!,
    firstName: String!,
    lastName: String!,
    salesBalance: Float!,
    createdAt: String!
  }

  type NetworkHierarchyUserType {
    id: ID!,
    firstName: String!,
    lastName: String!,
    children: [NetworkHierarchyUserType]
  }

  type SessionType {
    id: ID!,
    time: Int!,
    leftTime: Int!,
    status: SessionStatus!
  }

  type RentalOperationType {
    id: ID!,
    date: String!,
    amount: Float!,
    package: String!,
    time: Int!
  }

  type ReferalOperationType {
    id: ID!,
    date: String!,
    amount: Float!,
    percent: Float!,
    package: String!,
    userId: ID!,
    participantId: ID!
  }

  type ExternalSupportRequest {
    id: ID!,
    status: String!,
    email: String!,
    subject: String!,
    message: String!
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

  type TokenResponseType {
    errors: [ValidationErrorType]!,
    token: AuthTokenType
  }

  type ResetUserPasswordResponseType {
    errors: [ValidationErrorType]!
  }

  type ExternalSupportRequestResponse {
    errors: [ValidationErrorType]!,
    request: ExternalSupportRequest
  }

  type SupportRequestResponse {
    errors: [ValidationErrorType]!,
    request: SupportRequest
  }

  type SupportRequestMessageResponse {
    errors: [ValidationErrorType]!,
    message: SupportRequestMessage
  }

  type RootQuery {
    user: UserType,
    servicePlans: [ServicePlanType]!,
    rentalOperations: [RentalOperationType]!,
    referalOperations: [ReferalOperationType]!,
    network: [NetworkUserType]!,
    activations: [ActivationType]!,
    members: [NetworkUserType]!,
    networkTopReferals: [NetworkUserType]!,
    networkDirectReferals: [NetworkUserType]!
    networkHierarchy: [NetworkHierarchyUserType]!,
    networkReferalStat (id: ID!) : NetworkUserType,
    supportRequest (id: ID!) : SupportRequest,
    supportRequests : [SupportRequest]!
  }

  type RootMutation {
    createUser (
      email: String!,
      firstName: String!,
      lastName: String!,
      password: PasswordType!,
      inviteCode: String,
      activateUrl: String!
    ) : TokenResponseType,

    activateUser (token: String!) : TokenResponseType,
    loginUser (email: String!, password: String!) : TokenResponseType,
    resetUserPassword (email: String!, resetUrl: String!) : ResetUserPasswordResponseType,
    updateUserPassword (password: PasswordType!, token: String!) : TokenResponseType,
    storeStat (sessionId: ID!, value: String!) : Boolean,
    buyServicePlan (id: ID!) : ServicePlanType!,
    createExternalSupportRequest (email: String!, subject: String!, message: String!) : ExternalSupportRequestResponse,
    createSupportRequest (subject: String!, message: String!) : SupportRequestResponse,
    sendSupportRequestMessage (requestId: ID!, message: String!) : SupportRequestMessageResponse,
    startActivation (id: ID!) : ActivationType!,
    stopActivation (id: ID!) : ActivationType!,
  }

  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`

export default schema
