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

| Path              | Component                      | Permissions                | Behavior                                                      |
| ----------------- | ------------------------------ | -------------------------- | ------------------------------------------------------------- |
| `/`               | HomePage                       | public `<Route>`           | Home page                                                     |
| `/signup`         | SignupPage                     | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup              |
| `/login`          | LoginPage                      | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login  |
| `/logout`         | n/a                            | user only `<PrivateRoute>` | Navigate to homepage after logout, expire session             |
| `/backlog/series` | NavBar, ElementList, FooterBar | user only `<PrivateRoute>` | Shows all tv series on backlog                         |
| `/backlog/films`  | NavBar, ElementList, FooterBar | user only `<PrivateRoute>` | Shows all films on backlog                                    |
| `/backlog/games`  | NavBar, ElementList, FooterBar | user only `<PrivateRoute>` | Shows all games on backlog                                    |
| `/search/series`  | SearchForm, SearchResults      | user only `<PrivateRoute>` | Search a tv series to be added                                |
| `/search/films`   | SearchForm, SearchResults      | user only `<PrivateRoute>` | Search a film to be added                                     |
| `/search/games`   | SearchForm, SearchResults      | user only `<PrivateRoute>` | Search a game to be added                                     |
| `/add/:id`        | ElementInfo                    | user only `<PrivateRoute>` | Add an element to the backlog                                 |
| `/profile`        | Profile, Stats                 | user only `<PrivateRoute>` | Check profile with stat information                           |
| `/done/series`    | Done list for Series           | user only `<PrivateRoute>` | Shows all tv series finished                                  |
| `/done/films`     | Done list for films            | user only `<PrivateRoute>` | Shows all films finished                                      |
| `/done/games`     | Done list for games            | user only `<PrivateRoute>` | Shows all videogames finished                                 |

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

}
| HTTP Method | URL                       | Request Body               | Success status | Error Status | Description            |
| GET         | `/ `                      |                            | 200            | 404          | HomePage               |
| POST        | `/auth/signup`            | {username, password}       | 200            | 500          | Signup a new 
user, check if user already exists (500)                                                                                        |
| POST        | `/auth/login`             | {username, password}       | 200            | 500          | Login a user           |
| POST        | `/auth/logout`            |                            | 200            | 500          | Login a user out       |
| GET         | `/auth/verify `           |                            | 200            | 404          | Check user token       |
authentication                                                                                                                  |
| POST        | `/decisions/create`       | {name,description, options,| 200            | 500          | Creates a new decision 
 from a user                                 criteria, result, author}                                                          | 
| GET         | `/decisions`              |                            | 200            | 500          | Renders all decisions  |
| GET         | `/decisions/:id`          |                            | 200            | 500          | Renders a decision     |
| PUT         | `/decisions/:id`          |                            | 200            | 500          | Edits a decision       |
| DELETE      | `/decisions/:id`          |                            | 200            | 500          | Deletes a decision     |
| GET         | `/decisions/user/:userId` |                            | 200            | 500          | Renders users decisions|  
| POST        | `/comments/create`        | {comment, decisionId}      | 201            | 500          | Add new backlog element|
 and add to user                                                                                                                |
| DELETE      | `/comments/:id`           |                            | 200            | 400          | Delete specific element| 
<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/iloDccrZ/backlog-quest)
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/EricCompanyV/oracle-app-client)

[Server repository Link](https://github.com/EricCompanyV/oracle-app-server)

[Deployed App Link](https://incredible-alpaca-0cf5e6.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1zndKZ8DC-_i391alptPKsAKanCSXTrLVL39L3xtEjz8/edit?usp=sharing)

```

```
