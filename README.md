# Walk Away

## Description

This application is called Walk Away. A mobile app for trekking lovers with a gamification twist.

Its target is people who want to do trekking but have no experience about what would be the appropriate routes for them, and what items would be required for those routes. For this reason, any user that signs up to the app will always start off having 0 points of experience (xp), being a level 1 user, and with an empty backpack (Inventary).

Walk Away has a collection of routes with multiple levels of difficulty, each route having a sugested backpack for it, that suggests what items are necessary.

Every time a route is completed, the user gains xp and when the user reaches certain amount of pre-defined xps, he will level up, unlocking new routes.

In this app we can find two types of users: admin or non-admin. The first have some extra options in the app such as being able to add new routes to the db, edit those routes, delete them, as well as seeing all users profiles.

## Important!

Use mobile format.

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 3000**.

Then, run:

```bash
npm install
```

To start the project run:

```bash
npm run start
```

You can use this default user

```bash
email: prueba@gmail.com
password: Usuario1234!
```

## Enjoy it!

## User stories

### MVP

- User can sign up and create a new account.
- User can login.
- User can log out.
- User can see his profile.
- User can edit his profile.
- User can see all Routes.
- User can delete his profile.

### Backlog - finished

- User can filter routes by name, distance or level.
- User can see information about specific route.
- User can compare his user inventary with the route inventary.
- User can edit his user inventary.
- User can see his saved routes.
- User can save routes.
- User can unsave routes.
- User can start the saved route.
- User can cancel the saved route.
- User can finish the saved route.
- User start again a route that has been previously finished.
- User admin can create a new route.
- User Admin can edit every route.
- User Admin can see all users profiles.
- User Admin can delete one route.
- User can see the weather forecast for the route's location.

### Backlog - pending

- User can see one global ranking.
- User can see his specific position on the ranking.
- User can see other saved routes from users
- User can rate the route.
- User can put some comment on the route.
- User write a secret code to confirm he finished the route.
- User can see weather specific info (temp, wind, description...)

---

## Useful links

- [Presentation slides](https://slides.com/albertovalenzuelamunoz/deck-25b4ad)
- [Backend repository](github.com/avalen28/backend-template-m3)
- [Frontend deploy](https://walk-away.netlify.app)
- [Deployed REST API](walkaway.fly.dev)
