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
    profitabilityPerDay: Float!,
    profitabilityPerHour: Float!,
    amount: Float!,
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
    schedule: UserSchedule!,
    inviteCode: String,
    activations: [Activation]!,
    plan: ServicePlan,
    balance: Float!,
    salesBalance: Float!,
    referalBalance: Float!,
    referals: Int!,
    createdAt: String!,
    sponsor: Sponsor,
    cardNumber: String,
    btcAddress: String
  }

  type NetworkUser {
    id: ID!,
    email: String!,
    firstName: String!,
    lastName: String!,
    salesBalance: Float!,
    country: String!,
    status: String!,
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
    startAt: String!,
    status: SessionStatus!,
    activation: Activation
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
    participant: NetworkUser!
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

  type ActivationResponse {
    success: Boolean!
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
    networkStat : NetworkStat!,
    sessions (from: String, to: String, activations: [ID!]) : [Session]!
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
      country: String,
      receiveEmails: Boolean!,
      receiveAnnouncements: Boolean!
    ) : UserResponse!,

    userWithdrawInformation (cardNumber: String, btcAddress: String) : UserResponse!,

    activateUser (token: String!) : ActivationResponse,
    loginUser (email: String!, password: String!) : TokenResponse,
    resetUserPassword (email: String!, resetUrl: String!) : ResetUserPasswordResponse,
    updateUserPassword (password: Password!, token: String!) : TokenResponse,
    sendActivation (activateUrl: String!) : ActivationResponse,
    storeStat (sessionId: ID!, value: String!) : Boolean,
    buyServicePlan (id: ID!) : ServicePlan!,
    createExternalSupportRequest (email: String!, subject: String!, message: String!) : ExternalSupportRequestResponse,
    createSupportRequest (subject: String!, message: String!) : SupportRequestResponse,
    sendSupportRequestMessage (requestId: ID!, message: String!) : SupportRequestMessageResponse,
    startActivation (id: ID!) : Activation!,
    stopActivation (id: ID!) : Activation!,
    transfer (amount: Float!) : Operation!,
    withdrawToCard (amount: Float!) : Operation!,
    withdrawToBitcoin (amount: Float!) : Operation!,
    applyLicense (license: String!) : ApplyLicenseResponse!,
  }

  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`

export default schema
