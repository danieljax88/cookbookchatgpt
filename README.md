# The Jackson Family Cookbook
This project delivers a fully functional Recipe website.
Main Features:
- Authentication - While everybody can view the app, only certain parts of the app are reachable by Authenticated users
- Search - Every Recipe is Searchable using a powerful search engine that uses SearchAsYouType Functionality
- Add/Edit Recipes - Authenticated users have the ability to add / edit recipes (I kept this locked down as this is not a community contribution website)
- Meals for the Week Generator - It will randomly choose 7 recipes from the website, with an option to shuffle
- Filtering - the ability to filter recipes based on their Category
- Multi platform - The app is designed in a way that presents the page differently depending on the resolution size   
You Can view the first non beta iteration here:  
[![View on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/the-jackson-cookbook-c8cgvm)

## The idea behind the example

The project uses [Next.js](https://github.com/vercel/next.js), which is a framework for server-rendered React apps.
It includes `@mui/material` and its peer dependencies, including `emotion`, the default style engine in MUI v5.

The Backend & Authentication is hosted in Google's [Firebase/FireStore Service] (https://firebase.google.com/)
Because Firebase is a NoSQL database, i have used a 3rd party service called [Algolia] (https://www.algolia.com/). This service extracts the NoSQL data and stores it in its own Index'd database & overlays a powerful Search, which is implemented using React Hooks / Widgets.

## The link component

Next.js has [a custom Link component](https://nextjs.org/docs/api-reference/next/link).
The example folder provides adapters for usage with MUI.
More information [in the documentation](https://mui.com/guides/routing/#next-js).

## What's next?

<!-- #default-branch-switch -->
Planned additional work
- Better picture rendering
- optimisation in line with best practice for NextJs Rendering
- Ability to backup documents to a OneDrive Location
