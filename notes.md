------ Commands ------

React-native

```start new RN project```
npx react-native init xxxAwesomeTSProjectxxx --template react-native-template-typescript

```start simulator```
npx react-native run-ios --simulator="iPad Pro (11-inch) (2nd generation)"

```Pod install```
npx pod-install ios


Server-side:

1. "yarn init"

2. copy package.json

3. "yarn install"

4. copy tsconfig.json, .env, index.js

5. "yarn ts-jest config:init"

6. copy controllers, services, public, protected etc. folders

7. copy main.ts, routes.ts and other server side files

8. "yarn knex init -x ts"

9. "yarn knex migrate:make --knexfile knexfile.ts -x ts init-db (or filename)"

10. yarn knex migrate:latest


Redux and Thunk

1. yarn add redux react-redux @types/react-redux

2. yarn add redux-thunk @types/redux-thunk

Testing:
3. yarn add --dev fetch-mock redux-mock-store @types/fetch-mock @types/redux-mock-store



------ Steps ------ 


Frontend (react/react native)

1. wireframe () [x]
2. pages and navigation
3. components
4. store.ts template
5. reducers.ts
6. actions.ts
7. thunks.ts (fetch API)
8. other middlewares?
9. 

Backend
1. ERD
2. tables
3. seed data
4. model.ts (interfaces)
5. routes.ts


Local Database on Mobile
1. Realm
2. SQLite

https://realm.io/docs/javascript/latest/


Examples:
https://aboutreact.com/example-of-sqlite-database-in-react-native/


Check network status:
https://github.com/react-native-community/react-native-netinfo


