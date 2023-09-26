import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation RegisterUser($username: String!, $password: String!) {
        insert_users(objects: {username: $username, password: $password}) {
            returning {
                username
                id
            }
        }
    }
`;


export const LOGIN_USER = gql`
    query UserByUsernameAndPassword($username: String!, $password: String!) {
        users(where: {username: {_eq: $username}, password: {_eq: $password}}) {
            id
            username
        }
    }
`;

export const GET_TASKS = gql`
    query FindTaskByUserId($user_id: uuid!) {
        tasks(where: {user_id: {_eq: $user_id}}, order_by: {created_at: asc}) {
            description
            title
            id
        }
    }
`;

export const ADD_TASK = gql`
    mutation AddTask($title: String!, $user_id: uuid!) {
        insert_tasks(objects: {title: $title, user_id: $user_id}) {
            returning {
                title
                description
                id
            }
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation UpdateTask($id: uuid!, $title: String!) {
        update_tasks(where: {id: {_eq: $id}}, _set: {title: $title}) {
            returning {
                title
                id
                description
            }
        }
    }
`;

export const DELETE_TASK = gql`
    mutation DeleteTask($id: uuid!) {
        delete_tasks(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }
`;