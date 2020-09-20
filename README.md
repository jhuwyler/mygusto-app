# MyGusto - App

An app to cater personalized Migusto recipes to users.

This repo contains the frontend/app of MyGusto. The corresponding backend can be found [here](https://github.com/martyer/mygusto).

| ![MyTaste](https://github.com/jhuwyler/mygusto-app/blob/master/images/MyTaste.PNG?raw=true) | ![MyShoppingList](https://github.com/jhuwyler/mygusto-app/blob/master/images/MyShoppingList.PNG?raw=true) |
|:---:|:---:|

| ![MyRecipes](https://github.com/jhuwyler/mygusto-app/blob/master/images/MyRecipes.PNG?raw=true) | ![Menu](https://github.com/jhuwyler/mygusto-app/blob/master/images/Menu.jpeg?raw=true) | ![MySettings](https://github.com/jhuwyler/mygusto-app/blob/master/images/MySettings.PNG?raw=true) |
|:---:|:---:|:---:|

# Functionalities

## Settings
Before swiping, the user can already set some preferences by marking the allergies and choosing the importance of sustainability and budget. The users preference profil will be updated continuously in the background by swipping recipes.

## Swiping
The app presents one recipe after another which can be swiped left by the user to dislike the recipe or right to like it. To get more information of a presented recipe, one can click on it to see more information. The recommended recipes will be more personalized, the more recipes the user likes or dislikes.

## MyRecipes
In the panel **MyRecipes** the user can see his liked recipes and swpie right if he decides to cook it. He can choose more than one, if he knows he will be cooking those meals in the near future. All the needed ingredients will be added to a shopping list.

## Shopping List
In the shopping list all the ingredients, which need to be bought are visible including a symbol if it is currenlty discounted in Migros.

# Setup

* Clone repo
* Install dependencies: `npm install`
* Change the `baseURL` in `src/config.ts` to point to the backend

## Development Server

Run the following command to start a development server.
```
ionic serve
```

## Deploy on iOS and Android

Follow the guide [here](https://ionicframework.com/docs/developing/ios) to deploy on iOS and [here](https://ionicframework.com/docs/developing/android) to deploy on Android.
