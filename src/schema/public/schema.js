const schema = `
  enum SessionStatus {
    OPENED
    CLOSED
    CALCULATED
  }

  input Password {
    value: String!,
    confirmation: String!
  }

  type AuthToken {
    id: ID!,
    email: String!,
    token: String!
  }

  type ValidationError {
    key: [String],
    message: String!,
  }

  type ServicePlan {
    type: String!,
    period: Int!,
    time: Int!,
    price: Int!,
    profitability: Int!,
    profitabilityPerDay: Float!,
    profitabilityPerHour: Float!,
    profit: Int!,
    amount: Int!,
    memory: Int!,
    cpu: Int!
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
    status: String!,
    email: String!,
    firstName: String!,
    lastName: String!,
    phone: String,
    country: String,
    sex: String,
    birthday: String,
    address: String,
    schedule: UserSchedule!,
    inviteCode: String,
    activations: [Activation]!,
    plan: ServicePlan,
    balance: Float!,
    salesBalance: Float!,
    referalBalance: Float!,
    referals: Int!,
    createdAt: String!,
    sponsor: Sponsor
  }

  type NetworkUser {
    id: ID!,
    email: String!,
    firstName: String!,
    lastName: String!,
    salesBalance: Float!,
    createdAt: String!
  }

  type NetworkHierarchyUser {
    id: ID!,
    firstName: String!,
    lastName: String!,
    children: [NetworkHierarchyUser]
  }

  type Session {
    id: ID!,
    time: Int!,
    leftTime: Int!,
    status: SessionStatus!
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
    participantId: ID!
  }

  type Operation {
    id: ID!,
    date: String!,
    amount: Float!,
    status: String!,
    direction: String!
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

  type ShopProduct {
    url: String!,
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

  type TokenResponse {
    errors: [ValidationError]!,
    token: AuthToken
  }

  type UserResponse {
    errors: [ValidationError]!,
    user: User
  }

  type ResetUserPasswordResponse {
    errors: [ValidationError]!
  }

  type ExternalSupportRequestResponse {
    errors: [ValidationError]!,
    request: ExternalSupportRequest
  }

  type SupportRequestResponse {
    errors: [ValidationError]!,
    request: SupportRequest
  }

  type SupportRequestMessageResponse {
    errors: [ValidationError]!,
    message: SupportRequestMessage
  }

  type ApplyLicenseResponse {
    activation: Activation,
    error: String
  }

  type RootQuery {
    user: User,
    servicePlans: [ServicePlan]!,
    rentalOperations: [RentalOperation]!,
    referalOperations: [ReferalOperation]!,
    operations: [Operation]!,
    network: [NetworkUser]!,
    activations: [Activation]!,
    members: [NetworkUser]!,
    networkTopReferals: [NetworkUser]!,
    networkDirectReferals: [NetworkUser]!
    networkHierarchy: [NetworkHierarchyUser]!,
    networkReferalStat (id: ID!) : NetworkUser,
    supportRequest (id: ID!) : SupportRequest,
    supportRequests : [SupportRequest]!,
    generateShopLink (type: String!, period: String!) : ShopProduct!,
    paymentsStat : PaymentsStat!,
    networkStat : NetworkStat!
  }

  type RootMutation {
    createUser (
      email: String!,
      firstName: String!,
      lastName: String!,
      password: Password!,
      inviteCode: String,
      phone: String!,
      country: String!,
      sex: String!,
      birthday: String!,
      captcha: String!,
      agreement: Boolean!,
      activateUrl: String!
    ) : TokenResponse,

    userGeneralInformation (
      email: String!,
      firstName: String!,
      lastName: String!,
      phone: String,
      sex: String,
      birthday: String,
      address: String,
      country: String,
      receiveEmails: Boolean!,
      receiveAnnouncements: Boolean!
    ) : UserResponse!,

    activateUser (token: String!) : TokenResponse,
    loginUser (email: String!, password: String!) : TokenResponse,
    resetUserPassword (email: String!, resetUrl: String!) : ResetUserPasswordResponse,
    updateUserPassword (password: Password!, token: String!) : TokenResponse,
    storeStat (sessionId: ID!, value: String!) : Boolean,
    buyServicePlan (id: ID!) : ServicePlan!,
    createExternalSupportRequest (email: String!, subject: String!, message: String!) : ExternalSupportRequestResponse,
    createSupportRequest (subject: String!, message: String!) : SupportRequestResponse,
    sendSupportRequestMessage (requestId: ID!, message: String!) : SupportRequestMessageResponse,
    startActivation (id: ID!) : Activation!,
    stopActivation (id: ID!) : Activation!,
    transfer (amount: Float!) : Operation!,
    withdrawToCard (amount: Float!, number: String!) : Operation!,
    applyLicense (license: String!) : ApplyLicenseResponse!,
  }

  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`

export default schema
