# The Oracle

<br>

## Description

This is an app that takes life's most difficult decisions for you. You merely have to enter a question, your options and your criteria, the Oracle will then take care of the rest and tell you what to do.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can start creating and managing my decisions
- **Login:** As a user I can login to the platform so that I can start creating and managing my decision
- **Logout:** As a user I can logout from the platform so no one else can modify my information
- **Add elements** As a user I can add decisions
- **Edit elements** As a user I can edit decisions
- **Delete elements** As a user I can delete decisions
- **Check profile** As a user I can check my profile and decisions
- **View all decisions** As a user I can view all decisions in the database
- **Comment decisions** As a user I can create comments on decisions
- **Delete comments** As a user I can delete comments

## Backlog

- Taking other people's decision and adding statistic to decisions ("55% of users would do X")
- Making decisions public/private to decide whether they appear for other users
- Add search bar and filters
- Add user images

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                      | Component                    | Permissions                | Behavior                                                      |
| ------------------------- | ---------------------------- | -------------------------- | ------------------------------------------------------------- |
| `/`                       | Layout, Homepage             | public `<Route>`           | Homepage                                                      |
| `/signup`                 | Layout, SignupPage           | anon only `<AnonRoute>`    | Signup form, link to login, navigate to login after signup    |
| `/login`                  | Layout, LoginPage            | anon only `<AnonRoute>`    | Login form, link to signup, navigate to decisions after login |
| `/logout`                 | n/a                          | user only `<PrivateRoute>` | Navigate to homepage after logout, expire session             |
| `/decisions`              | Layout, AllDecisionsPage     | user only `<PrivateRoute>` | Shows all decisions in db                                     |
| `/decisions/:decisionId`  | Layout, DecisionDetailPage   | user only `<PrivateRoute>` | Shows details on a decision, comments                         |
| `/decisions/user/:userId` | Layout, AllUserDecisionsPage | user only `<PrivateRoute>` | Shows all decisions created by user                           |
| `/decision-form`          | Layout, NewDecisionForm      | user only `<PrivateRoute>` | Create new decision                                           |

## Components

- LoginPage

- SignupPage

- Homepage

- NotFoundPage

- AllDecisionsPage

- AllUserDecisionsPage

- DecisionDetailPage

- Layout

- Anonymous Route

- Decision

- NewDecisionForm

- UpdateDecisionModal

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Decision Service

  - decision.detail(id)
  - decision.add(id)
  - decision.delete(id)
  - decision.update(id)

- External API
  - API for decisions

<br>

# Server / Backend

## Models

User model

    username: String,
    hashedPassword: String,
    timestamps

Decision model

    name: String,
    description: String,
    options: [String],
    criteria: [{ name: String, weight: Number, option: String }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    result: Boolean,
    isPublic: Boolean,

Comment model

    content: String,
    decision: {type: Schema.Types.ObjectId, ref: "Decision"},
    author: { type: Schema.Types.ObjectId, ref: "User" }
    isPublic: Boolean,

}

## API Endpoints (backend routes)


| HTTP Method | URL                       | Request Body               | Success status | Error Status | Description            |
| ----------- | ------------------------- | -------------------------- | -------------- | ------------ | ---------------------- |
| GET         | `/ `                      |                            | 200            | 404          | HomePage               |
| POST        | `/auth/signup`            | {username, password}       | 200            | 500          | Signup a new user, check if user already exists (500)                                                                                        |
| POST        | `/auth/login`             | {username, password}       | 200            | 500          | Login a user           |
| POST        | `/auth/logout`            |                            | 200            | 500          | Login a user out       |
| GET         | `/auth/verify `           |                            | 200            | 404          | Check user token authentication                                                                                                                  |
| POST        | `/decisions/create`       | {name,description, options,criteria, result, author}| 200            | 500          | Creates a new decision from a user                                                                                           | 
| GET         | `/decisions`              |                            | 200            | 500          | Renders all decisions  |
| GET         | `/decisions/:id`          |                            | 200            | 500          | Renders a decision     |
| PUT         | `/decisions/:id`          |                            | 200            | 500          | Edits a decision       |
| DELETE      | `/decisions/:id`          |                            | 200            | 500          | Deletes a decision     |
| GET         | `/decisions/user/:userId` |                            | 200            | 500          | Renders users decisions|  
| POST        | `/comments/create`        | {comment, decisionId}      | 201            | 500          | Add new backlog element and add to user                                                                                                                |
| DELETE      | `/comments/:id`           |                            | 200            | 400          | Delete specific element| 
<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/qU5o16oP/the-oracle)
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/EricCompanyV/oracle-app-client)

[Server repository Link](https://github.com/EricCompanyV/oracle-app-server)

[Deployed App Link](https://incredible-alpaca-0cf5e6.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/16s9MfYlfMru8c4E5U_rlkRhUCbMctfe5weMvgPnU8YA/edit?usp=sharing)

```

```
