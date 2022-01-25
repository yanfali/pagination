# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

# Pagination in memory

I have an array of items, I want to display pagination for more than page size.

 - display n pages in the pagination element
 - when we exceed n pages display ... for the prefix when we are past the nth index
 - also display a short cut to the first page
 - also display a short cut to the last page when we have more than n pages
 - when we have more than n pages to display display ...

Use cases:

Design a pagination control that has the following inputs:

 - an array
 - the number of items we want to display per page
 - the maximum number of short cuts we want to display, not including the first and last item
 - previous and next controls

Make it work like google search:

 - 1 to 10 items or fewer if there are fewer results

 - Takes you to the next page.

 - Previous does not display if you are on the first page
 
 - Navigating to the 10th item changes the pagination display start to 5. Navigating to previous does not go back to 1, but backs the navigation start to 4, and keeps backing off until the visible pagination is 1 and then previous disappears again

 Quite elegant.

 Pagination data structure: {
     visibleItems: [
         {
             offsetPage: number,
         }
     ]
     previous: number | null
     next: number | null
 }

 Test Cases:

1. page size = 1, max values = 3, array = [], offsetPage = 0

pagination: <1>
list: []

2. page size = 1, max values = 3, array = [ 1, 2 ], offsetPage = 0

pagination: <1> 2 Next
list: [ 1 ]

3. page size = 1, max values = 3, array = [ 1, 2, 3 ], offsetPage = 0

pagination: <1> 2 3 Next
list: [ 1 ]

4. page size = 1, max values = 3, array [ 1, 2, 3, 4 ], offsetPage = 0

pagination: <1> 2 3 Next
list: [ 1 ]

5. page size = 1, max values = 3, array [ 1, 2, 3, 4 ], offsetPage = 1

pagination: Previous <2> 3 4 Next
list: [ 2 ]

5. page size = 1, max values = 3, array [ 1, 2, 3, 4 ], offsetPage = 2

pagination: Previous 2 <3> 4 
list: [ 3 ]

5. page size = 1, max values = 3, array [ 1, 2, 3, 4 ], offsetPage = 2

pagination: Previous 2 <3> 4 
list: [ 3 ]

executing previous should return:

pagination: Previous 1 <2> 3 Next
list: [ 2 ]

executing previous again should return:

pagination: <1> 2 3 Next
list: [ 1 ]