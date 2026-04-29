# Trello Mobile Clone (React Native)

A mobile client for the Trello-inspired project management system. 
This application was developed as a transition from Web to Mobile development, 
focusing on React Native, Redux Toolkit, and seamless REST API integration.

## Demo
* **[Launch Live Demo in Browser (Expo Snack)](https://snack.expo.dev/@akoskovtsev/trello-mobile?platform=android)**
Note: Best viewed via the Expo Go app.

## Highlights
* Migrated business logic from Web (React) to Mobile (React Native)
* Solved state synchronization issues between nested entities (boards → lists → cards)
* Handled async flows with error management (Redux Toolkit + Axios)
* Fixed complex React Hooks ordering issues in dynamic UI (modals + conditional data)
* Feature-based project structure with separated UI, state, and API layers
  
## Tech Stack
* React Native (Expo), TypeScript.
* Redux Toolkit.
* React Navigation.
* Axios (REST API, interceptors).

## Key Features
* Create, edit, and delete boards, lists, and cards.
* Real-time sync with REST API.
* Custom board textures.
* Modal-based UX with global UI state.
* Adaptive mobile layout

## Quick Start
```bash
npm install
npm start
```
