#### Redux Best Practices

[Redux](https://github.com/reactjs/redux) holds your App’s state. It is predictable and has great tooling, but might be a bit slower than something like [MobX](https://github.com/mobxjs/mobx) ([Dan Abramov’s tweet](https://twitter.com/dan_abramov/status/733705049902329856)).

React makes your UI reactive (hence its name) by treating data from your store as a **fact**. So you don’t have to tell your view ‘how to update the UI.’ In the same way, I also believe Redux/Flux makes your data model reactive, by treating actions as a fact, so you don’t have to tell your data model how to update themselves. — [from @dtinth](https://github.com/reactjs/redux/issues/1171#issuecomment-167714850)

### Rules

Your **reducers** must be pure (**deterministic**).

Any logic with side effects (**non-deterministic**) (external services, async code) belong in an action (via something like [redux-thunk](https://github.com/gaearon/redux-thunk) and/or [redux-saga](https://github.com/yelouafi/redux-saga))

- For more about the deterministic vs non-deterministic, see [this](https://github.com/reactjs/redux/issues/1171#issuecomment-205888533) Github Issue response.

<span class="markup--quote markup--p-quote is-other" name="anon_307776fc9979" data-creator-ids="anon">Containers read a store’s data through selectors. Selectors are your “reading API” and should be **co-located** with their reducers.</span>

- See [So you’ve screwed up your Redux store — or, why Redux makes refactoring easy](https://blog.boldlisting.com/so-youve-screwed-up-your-redux-store-or-why-redux-makes-refactoring-easy-400e19606c71#.rho2ned2d)
- [Computing Derived Data | Redux](http://redux.js.org/docs/recipes/ComputingDerivedData.html)
- [video][colocating selectors with reducers](https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers)

**Use selectors everywhere**. Even for the most trivial ones.

Redux should store the minimal possible state, allowing Selectors to compute derived data.

Use [Reselect](https://github.com/reactjs/reselect) for selectors that need to be memoized (like derived data).

Selectors can be composed of other selectors

Normalize your data for better reducer composition

- See the output of [normalizr](https://github.com/paularmstrong/normalizr) for an example

### Reducer composition

Redux houses your models and **collections** (of normalized models). It is better to think of it this way, instead of just one big blob of app state.

Just like Selectors and Components are composable, so too are Reducers!

Think of Redux as a tree of your reducers (like react’s render tree of components). Both are just compositions of functions.

Totally OK to have many, many reducers.

Dan’s videos:

- [Redux: Reducer Composition with Arrays](https://egghead.io/lessons/javascript-redux-reducer-composition-with-arrays)
- [Redux: Reducer Composition with Objects](https://egghead.io/lessons/javascript-redux-reducer-composition-with-objects?series=getting-started-with-redux)
- [Redux: Reducer Composition with combineReducers()](https://egghead.io/lessons/javascript-redux-reducer-composition-with-combinereducers?series=getting-started-with-redux)
- Explains the point of combineReducers: to create the root reducer which branches off into all of your other reducers (which might branch off into children reducers of their own, and so on).

### Structure and Naming

Use [Ducks](https://github.com/erikras/ducks-modular-redux)

- Note: Dan does not endorse ducks because it may confuse beginners into thinking actions map 1:1 to reducers. [tweet](https://twitter.com/dan_abramov/status/738405796770353152)

Use [redux-actions](https://github.com/acdlite/redux-actions)

action name: **_\<NOUN\>_\<VERB\>\_**

action creator name: **_\<verb\>\<Noun\>_**

selector name: **_get\<Noun\>_**

### Actions

- **DO** name each action (constant) as **_\<NOUN\>_\<VERB\>\_** with the present tense
- **Why?** For namespacing and sorting your reducers

```
TODO_ADD
```

- **DO** build your action creators using [redux-actions](https://github.com/acdlite/redux-actions)’s **_createAction()_**
- **Why?** To reduce boilerplate and enforce [FSA](https://github.com/acdlite/flux-standard-action)-compliant actions

```
createAction( ‘TODO_ADD’ )
```

- **DO** name each action creator as **_\<verb\>\<Noun\>_**
- **Why?** As a convention to clearly identify what type of function it is

```
const addTodo = createAction( ‘TODO_ADD’ )
```

### Selectors

- **DO** name each selector as **_get\<Noun\>_**
- **Why?** As a convention to clearly identify what type of function it is

```
const getTodo = (state) => state
```

### Reducers

- **DO** build your reducers using [redux-actions](https://github.com/acdlite/redux-actions)’ **_handleActions()_**

```
export default handleActions({

  TODO_ADD: (state, action) => ([
    ...state,
    action.payload,
  ]),

  // Other reducers
  // ...
  //

}, initialState )
```

- **Why** this instead of the documented switch statement? Primarily because it keeps a clean switch-like syntax, while adding block scoping to the cases. This means you can reuse variable of the names in each “case”. With switch, your cases are scoped to the switch, so you are forced to use var or unique names.

### Files

- **DO** structure your Redux files with the [Ducks](https://github.com/erikras/ducks-modular-redux) pattern in a single folder (often called **_flux/_**, **_ducks/_**, or **_stores/_**). Here’s another helpful [link](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c#.iw6yey65h).
- Example reducer:

```import { createAction, handleActions } from 'redux-actions';
//- Actions
export const addTodo = createAction( 'TODO_ADD' )

//- State
const initialState = []

//- Reducers
export default handleActions({

  TODO_ADD: (state, action) => ([
    ...state,
    action.payload,
  ]),

  // Other reducers
  // ...
  //

}, initialState )

//- Selectors
export const getTodos = (state) => state
```

### Types

- If you are typing your code with Flow or Typescript, be sure to type your redux code as well!
- Flow: [Using Redux with Flow](http://frantic.im/using-redux-with-flow) is a nice write-up

### Resources

- [Recommendations for best practices regarding action-creators, reducers, and selectors](https://github.com/reactjs/redux/issues/1171) — Really good thread for aligning on fat vs skinny actions
- [Neos CMS Goes for a Full UI Rewrite with React and Redux](http://dimaip.github.io/2016/03/13/neos-react-redux-rewrite/)
- [Redux reducers.. Am I missing something? : javascript](https://www.reddit.com/r/javascript/comments/40n5u3/redux_reducers_am_i_missing_something/) — Discussion on what gets its own reducer

#### Follow the [React Playbook](https://github.com/kylpo/react-playbook/blob/master/best-practices/redux.md) for future updates on this topic!
