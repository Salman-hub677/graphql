import { gql } from "@apollo/client";

export const UserInfo = gql`
 query User_Info {
    user {
      id
      login
      email
      lastName
      firstName
    }
  }
`;

export const UserTransactionsDone = gql`
  query User_Transactions_Done {
    transaction_aggregate(where: { type: { _eq: "up" } }) {
      aggregate {
        sum {
          amount
        }
      }
    }
    user {
      auditRatio
    }
  }
`;

export const UserTransactionsRecieved = gql`
  query User_Transactions_Done {
    transaction_aggregate(where: { type: { _eq: "down" } }) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

export const Project_XP = gql`
  query User_Skills {
    transaction(
      where: { type: { _eq: "xp" }, object: { type: { _eq: "project" } } }
    ) {
      amount
      object {
        name
      }
    }
  }
`;

export const Piscine_Info = gql`
query Result {
    result(where: { object: { type: { _eq: "exercise" } } }) {
        grade
        objectId
        object {
            attrs
            name
            type
        }
    }
}

`

  export const Dates_Projects = gql `
  query Progress {
      progress(where: { object: { type: { _eq: "project" } }, isDone: { _eq: true } }) {
        createdAt
        updatedAt
          object {
            attrs
              name
          }
          
      }
  }
  `