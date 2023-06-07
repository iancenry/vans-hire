# React Router V6
- Helps in doing client side routing. 

## MPA vs SPA
  - `MPA (Multi Page Application)` - in traditional websites, a client requests for a html page of a site from a server which will then send an html file, with appropriate styles, as a response and the browser loads the page. When another link e.g the *about link* is clicked the same process is repeated then the browser will replace the old homepage with the new page. So when we click on a new page the old is entirely discarded then replaced with the new from the server.
  - `SPA (Single Page Application)` - used in react, it doesn't mean that you have only one page on your website but that the browser is only loading a single web doc one time & then the app will make incremental updates to that exisitng doc through different methods like internal react state changes or fetch requests to an API; e.g., we have a home page with a header, body and footer, when we click another page only the body is updated but the rest of the doc remains the same.
  - So when a request is made to the server then its job instead of being to process and build a html file like in MPA, it will send an entire react application so when you navigate to the about page, portions of that new page are loaded inside the react app without making new requests; other requests can be made to maybe get jSON data from an API.

##  Components provided by react-router-dom:
  - `BrowserRouter` - it is a context provider; provides context for all of its children components.
  - `Routes` - it's the first child  in the Browser router and in it we have a series of new components called Route( a part of url that specifies where you are e.g /about). Routes can be nested e.g /blog/blog-article-1.
  - `Route` - self closing component that specifies the element to be displayed when a particular link is hit.
  - Others: `Link`, `NavLink`.

### Basic Setup
 ```jsx
      <BrowserRouter> 
        <Routes> {/* create route definition */}</Routes>
      </BrowserRouter>
 ```

 ### Creating a route(s)
 ```jsx
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

    const Homepage = () => (
      <h1>Homepage</h1>
    )

    const Aboutpage = () => (
      <h1>About Page</h1>
    )

    function App() {
      return (
          <Router> 
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/about' element={<Aboutpage />} />
            </Routes>
          </Router>
        
      )
    }
 ```

 ### Using Link Component
 - It helps us not have to put the the url path manually in the address bar which will cause a full page reload therefore leading to any stored state state being lost. It is an alternative to the anchor tag which if used in react will lead to the same problem of a full page reload. On inspection the Link component will be shown as an anchor tag but the way it works is that it catches the page before reload to cause an update without reloading therefore preserving any saved state. It takes a url path.

 ```jsx
    import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

    const Homepage = () => (
      <>
        <h1>Homepage</h1>
        <Link to='/about'>About</Link>
      </>
    )

    const Aboutpage = () => (
      <>
        <h1>About Page</h1>
        <Link to='/'>Home</Link>
      </>
    )
 ```

 ### Continous Deployment with netlify
 - the idea behind CD is that as you make changes to your code, you will push those changes to github and when you push to github is should automatically deploy on netlfiy(a webhost).about-hero-image 
 - Steps: 
  1. Push project to Github
  2. Tell Netlify which repo you want to deploy
  3. In site setting; needed since we deploy without building first: 
    - Build command input  - `npm run build`
    - Publish directory input  - `dist`


### Mirage JS
- Mirage JS - npm package to create mock server that will intercept any API requests and will return data from the mock server instead of having to worry about reaching out to the real world.
   - thin of the routes() portion as the server code that would run whenever you make a request to `/vans` or to `/vans/:id`

### Dynamic Route(:/name)
- Route/url parameter - a portion of our route that is a placeholder for what will eventualy be the actual segment in the URL of the page. Help us create dynamic routes. Example of a route parameter called `productId` in a Route path:

```jsx
  <Route path="/products/:productId" element={<ProductDetail />} />
```
- Use `useParams` hook provided by react-router-dom to grab url parameters.

```jsx
  const params = useParams()
  params.urlParamName;  //params.id

  //or - extract param needed
  const {id} = useParams()
```

### Nested Routes 
When talking about nested routes we are talking about:
  - Nested routes means nesting pieces of the url - `/van/van-id-or-name`
  - Prescence of a shared UI or parts of the page that need to remain on the page when we transition from one route to a child route or nested route. The shared UI can be a navigation bar.

    * Add nested UI image

- To nest a route we need to change it from a self closing component to it having an opening and closing tag.
- Use nested routes when you want to keep displaying same UI on the page, but also want to display more. A page changing a small or large portion.

### Layout Routes
- Don't have a path of their own but their purpose is to *lay out* the page; we want all our pages to have a header and a footer.
- Outlet will help us create a hole in our component where the matching route that is a child of the parent route can render. Without it we will only see the Layout component, since it has no path so will match all url paths , instead of the appropriate child.
- **NB** Layout routes are only for shared UI

### relative paths
-  A path that doesnt begin with a `/` , slash is dedicated to the homepage so if you start with slash, react router will treat it like an absolute path. If you dont use a slash it treats it like a relative path, i.e, relative to its parent route. If the parent has no path like in a pathless route it assumes that it is one of the first pages/first section of the url (i.e, about, vans, vans/:id).

```jsx
//nested routes with absolute paths
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/vans" element={<Vans />} />
    <Route path="/vans/:id" element={<VanDetail />} />
          
    <Route path="/host" element={<HostLayout />}>
      <Route path="/host" element={<Dashboard />} />
      <Route path="/host/income" element={<Income />} />
      <Route path="/host/reviews" element={<Reviews />} />
    </Route>
  </Route>

  //nested routes with relative paths
 <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="vans" element={<Vans />} />
    <Route path="vans/:id" element={<VanDetail />} />
          
    <Route path="host" element={<HostLayout />}>
      <Route path="host" element={<Dashboard />} />
      <Route path="income" element={<Income />} />
      <Route path="reviews" element={<Reviews />} />
    </Route>
  </Route>
```

- The difference between a **layout route with a path** and **one without**(<Layout /> vs <HostLayout />) is that the pathless one will apply to everything since everthing is a child of that layout route. That is why we still see a navigation bar no matter how deep in the routes we visit.

### Index routes
- If I have an element that i want to display in the outlet of the layout component but i want it to be at the same route as what the layout compnent is defined at i can replace the path with the prop called index. Can be seen with the HostLayout having the same path as Dashboard component which would force us to write `http://localhost:3000/host/host` which isn't advisable. Using the `index prop` will fix this since it is saying that I want you to put the component with index inside the outlet of the parent route when it matches.

```jsx
  //Example 1
    <Route path="host" element={<HostLayout />}>
      <Route path="host" element={<Dashboard />} />
    </Route>

    // fix
    <Route path="host" element={<HostLayout />}>
      <Route index element={<Dashboard />} />
    </Route>
```

```jsx

    //Example 2
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>

      //alternative with index route
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>      
```

#### To Nest or Not to Nest
- The main reason you should nest is when you want to keep displaying some UI on the page, but also want to display more. 
- **NB** Do not nest when you just want to avoid repetition in your paths such as the `vans` and `vans/:id`. These two paths don't share the same UI so there is no need for nesting `vans/:id` into `vans`.

#### Recap
1. What is the primary reason to use a nested route? Whenever we have some shared UI between routes in our app.
2. What is a "Layout Route"? It's the parent route of some nested routes that contains just the portion of the UI that will be shared whe you move from one nested route to another. It will use an Outlet component.
3. What does the <Outlet /> component do? When do you use it? We use it anytime we have a parent Route that's wrapping children routes. It renders the matching child route's `element` prop given in its route definition
4. What is an "Index Route"? It's the "default route" we want to render when the path of the parent route matches. It gives us a chance to render an element inside the parent's <Outlet /> at the same path
as the parent route.

### NavLink
- Most times we want the user to know the page they are currently in lets say by highlighting the link. React router uses `render props` to do this. 
- NavLink is similar to link but the style props and className prop can both take a function as their value. 
- We can provide a function to the className and whatever it returns will be the actual className that is applied. React router will pass the function an object and the object will already have a property called isActive which we can destructure to access it instead of using Object.isActive. 
- The isActive property is a boolean and describes whether the route is the current active one.
- Instead of className we can use inline style. Example below shows both.

```jsx
  const activeStyle = {fontWeight: "bold", textDecoration: "underline",color: "red"}

  <NavLink to="/about" className={({isActive}) => isActive ? "my-link" : null } style={({isActive}) => isActive ? activeStyle : null }>  About</NavLink>
  <NavLink to="/contact" className={({isActive}) => isActive ? "my-link" : null } style={({isActive}) => isActive ? activeStyle : null }> Contact </NavLink>
```
- Use `end` with NavLink styles/classes and it tells react-router to end the matching of routes 'here'. If a more nested route matches it wont also match the 'ended' NavLink on that route.

## Relative Links
- In our HostLayout.jsx when creating NavLinks we created them as abssolute paths i.e, `/host`, `/host/income` etc. However we dont need to do that because the HostLayout component is getting rendered in `<Route path="host" element={<HostLayout />}>` which is already a child of the `slash(/))` route. Because our element is part of the route for path of host the element can assume the path of host in all of its links. So in our HostLayout change the links as follows:

```jsx
    <NavLink to="/host" end style={({isActive}) => isActive ? activeStyles : null}>Dashboard</NavLink>
    <NavLink to="/host/income" style={({isActive}) => isActive ? activeStyles : null}>Income</NavLink>
    <NavLink to="/host/vans" style={({isActive}) => isActive ? activeStyles : null}>Vans</NavLink>
    <NavLink to="/host/reviews" style={({isActive}) => isActive ? activeStyles : null}>reviews</NavLink>

    //relative links
    //the dot(.) mean is i want the dashboard to link me to the current route where the host layout is being rendered; the host layout is being rendered on the path of 'host' 
    <NavLink to="." end style={({isActive}) => isActive ? activeStyles : null}>Dashboard</NavLink>
    <NavLink to="income" style={({isActive}) => isActive ? activeStyles : null}>Income</NavLink>
    <NavLink to="vans" style={({isActive}) => isActive ? activeStyles : null}>Vans</NavLink>
    <NavLink to="reviews" style={({isActive}) => isActive ? activeStyles : null}>reviews</NavLink>
```

- So if we had links inside the income component `<Route path="income" element={<Income />} />` we wouldn't need to specify the whole path leading upto income.
- The benefit of using relative routes and links is that if for whatever reason we decide to change the path name of the parent route the link wont be broken.


### Going Back
- To go back we can use the `..` relative path, the default in react router isn;t to go back exactly one route up e.g from `vans/:id` to `vans` under the host route but it is to go one level into the parent route i.e `vans/:id` to `host`. 
- To fix this issue since we are going back to a sibling we add a `relative prop` where we can tell it to be relative to the path not the route. So that whwn we say we are going back a route it means we are going back one level back in our path structure not up a level in our routing hierarchy. **NB** The `..` can be thought of as how we use cd in terminal to go back a folder and we use `.` to refer to the current folder

### Outlet Context
- Outlet is just be a context provider which accepts a `context` prop and the values passed into the prop will be receivable by the other components using the `useOutletContext` hook.
- Below I am passing in an object which will have a currentVan property whose value is the currentBan object; also written as `{currentVan: currentVan}`. The `currentVan` is paassed within curly braces more often than just passing the entire object by itself.
```jsx
<Outlet context={{currentVan}} />
//In the 'child' within an outlet we can access the currentVan by destructuing since currentVan is an object which has the currentVan property.
const {currentVan} = useOutletContext()
```

### Search/Query Parameters
- Can represent some kind of change in the UI where you actually see on on the page in the app.
- Common tasks for query parameters - sorting, filtering, pagination
- Think of query parameters as a "single source of truth" for a certain application state.
**NB** Ask yourself: "Should a user be able to revisit or share this page just like it is? If `yes`, then you might consider `raising that state up` to the URL in a query parameter.
- What about state? Since refresh is akin to loading the app for the first time and state is lost, we can't share the current state with a friend using react state since when they load it the state will be new.
- `Query parameters` are part of the URL and represent key/value pairs of information that can live directly in the URL. Create by starting with a `?` => `/vans?type=rugged`.
  - Also you can have multiple and are separated by `&` => `/vans?type=rugged&filterBy=price`
- To handle search parameters we use the `useSearchParams()` hook; has the same syntax as `useState` hook.
  - It has several methods such as `.get("type")` where we can provide a key name and it will return that value. `.toString()` will return the full picture of what the search params contain. etc
- state lives in a component but search params live in the URL.

#### Adding search/query params
- We can use `links` to specify a query parameter. 

```jsx
    <Link to="?type=luxury" className='van-type luxury'>Luxury</Link>
    <Link to="?type=simple" className='van-type simple' >Simple</Link>
    <Link to="?type=rugged" className='van-type rugged'>Rugged</Link>
    <Link to="." className='van-type clear-filters'>Clear filter</Link>
```

- We can also utilize the state setter function that we recived when we initialize our searchParams. We can specify in it what our new search params will be. We create buttos with `onClick` event handler which calls  our setSearchParams setter function.
  - Just like with useState the setter function can either take a new value for the searchParams which will completely replace the old value or it can take a callback function.
  1. Taking in a new value. Can begin with a question mark

```jsx
    <button onClick={() => setSearchParams("?type=luxury")}>Luxury</button>
    <button onClick={() => setSearchParams("type=simple")}>Simple</button>
    <button onClick={() => setSearchParams("type=rugged")}>Rugged</button>
    <button onClick={() => setSearchParams("")}>Clear</button>
```
  1. Using a record/object initialization, more common; there are other methods.

```jsx
    <button onClick={() => setSearchParams({type : "luxury"})}>Luxury</button>
    <button onClick={() => setSearchParams({type : "simple"})}>Simple</button>
    <button onClick={() => setSearchParams({type : "rugged"})}>Rugged</button>
    <button onClick={() => setSearchParams({})}>Clear</button>
```

#### Caveats to setting params 
- The above method can only be used if you know that there won't be any other query params in the project.
- It is common to have more than one query param, each one dealing with a different part of the app or different page. However, the way we have structured it above by hard-coding the values /objects, as soon as we click a different button we lose the context of the query param in that the type will change and the clear will clear out everything not just the ones we care about in that specific component.
- We have several methods to merge new query params with existing ones instead of completely replacing them.
  1. Merging search params with links
    * Using a query string - instead of hard-coding a tring in the `to` prop of a link, we will call a function but since the `to` prop is't an event handler like onClick is, we can run a function as soon as the component loads and that function will generate a string which will get put in its place inside the to prop. The methods below will concatenate the search param using `&` with any existing ones and the clear will only remove the `type` property on our search param.
```jsx
    const [searchParams, setSearchParams] = useSearchParams()

    //the function takes in a key and value
    <Link to={genNewSearchParamString("type", "luxury")} >Luxury</Link>
    <Link to={genNewSearchParamString("type", "simple")} >Simple</Link>
    <Link to={genNewSearchParamString("type", null)} >Clear</Link>

    //Sidenote: can be extracted into a utility folder since it is reusable for different parts
    function genNewSearchParamString(key, value){
      //create a new set of search params using the URLSearchParams(vanilla js) constructor and initialize the new search params with the value of the old search params
      const sp = new URLSearchParams(searchParams)
      //use the search param methods to alter the objet we have created.
      if(value === null){
        sp.delete(key)
      }  else {
        sp.set(key, value)
      }       
      console.log(sp.toString())
      return `?${sp.toString()}`
    }
```

  2. Merging search params with the setSearchParams function
- The useSearchParam isn't only similar to useState in that it returns an array with 2 items that include the value and a function for setting the value but more deeply the setter can take in 2 arguments, a replacement value for the state or a callback funtion that receives the previous state so that you can make changes to it.

```jsx
  const [searchParams, setSearchParams] = useSearchParams()

  //the function takes in a key and value
  <button onClick={() => handleFilterChange("type", "luxury")}>Luxury</button>
  <button onClick={() => handleFilterChange("type", "simple")}>Simple</button>
  <button onClick={() => handleFilterChange("type", "rugged")}>Rugged</button>
  <button onClick={() => handleFilterChange("type", null)}>Clear</button>

  function handleFilterChange(key, value){
    setSearchParams(prevParams => {
      if(value === null){
        prevParams.delete("key")
      } else{
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

```

### Link State
- After filtering and clicking on a van we want to be able to go back but still displaying the previous filters. There is a `history state`, the browser has the ability to save some kind of state between one link/url and the next. React router has made it easy to add things to that `link state`.
- We add a state to the <Link/> and pass a value to it that can be grabbed by the next route so that when we press back it can know what filter we had applied earlier.

#### useLocation
- this is a hook that is similar to useParams in that it  doesnt bring back an array like in useState. It returns an object with the current `pathame`, link `state` passed, `search` which contains any query string of current location/url, `hash` and `key`.
- The limitation is that the state is specific in the browser and cant be copied and shared to another user.

```jsx
  //Vans.jsx - passing current filters(reflected in the search params) to the link state
  <Link to={id} state={{search: `?${searchParams.toString()}`}} >

  </Link>
  //VanDetail.jsx - accessing the link state in the browser through useLocation hook and passing the query params stored in it to the <Link /> so it can send the iser back to the previous page with the searchParams included if they exist.
  const location = useLocation()  

  <Link to={`..${location?.state !== null ?  location?.state?.search : "" }`} className="back-button" relative="path">&larr; <span>Back to all vans</span></Link> 

  //we use optional chaining ie. in the past we had to type `location.state && location.state.search` nowadays with optinal chaining we only need ' location.state?.search '  
```

#### Side quest - conditionally rendering the back button text to show back to luxury/simple/all/rugged
```jsx
  //1. using string manipulation method split at '=' and access the value in VanDetail.jsx
  const backText = location.state?.search.split("=")[1] || "all"

  <Link to={`..${search}`} className="back-button" relative="path">&larr; <span>Back to {backText} vans</span></Link>  


  //2 .In vans I can pass more state through.
  <Link to={id} state={{search: `?${searchParams.toString()}`, type: typeFilter}} > </Link>
  // and in VanDetail I can grab that string with location.state.type
  const type = location.state?.type || "all"

  <Link to={`..${search}`} className="back-button" relative="path">&larr; <span>Back to {type} vans</span></Link>  


  //2.  Because the string is a query string i can create a new instance of url search params and use .get() to access the value of the type param
```

## 404 page
- Helps give useful details if a user tries to access a path that doesn't exist in the site. Might happen due to outdates links or if user gets the link wrong
- We can handle this with a `splat/catchall(*)` route - in the path we use a universal/catchall selector which means that if there are no other routes listed use this route.

## Data Layer APIs
- Without using data layer apis, We would need to set a loading and error state in components that do any sort of fetching, this leads to a lot of repetition and a lot happening just to handle the "sad path (accounting for errors)". A major reason why this is happening is because we are only starting our fetch request after a component loads. 
- If we didn't load a component before we had access to the data we wouldn't have to worry about the above issue of handling errors in each component incase the data doesn't come back.
- Data Layer APIs is a way that we can load our data before it ever transitions us to the route. This allows us to get rid of a lot of repititve code. *Refer to Vans.jsx before is commit*

### Loaders
- The way useEffect worked while fetching data is that: let's say we are on the about route, when I click the link to the vans route, the about oage goes away and gets swapped for the Vans page and because we are fetching our data inside useEffect it immeadiately starts fetching the data. Once the request comes back we get some JSON from an api then react re-renders and takes that json and displays the data the way we specified.
  - But because we are only loading the data after we have already mounted the component that reps our page, we have a lot of extra stuff we need to add: saving state for the fetched data, loading state, error state, useEffect and the error handling within, handling what displays if there is an error/loading etc.
- Using a loader to fetch the data: let's say we are on the about route, when I click the link to the vans route, the first thing that happens is it delays for a moment or two and during that delay it is starting the fetch request to get the data for the vans page. That way, when the data  comes back from the request, it is already a part of the vans page when it gets loaded up.
  - How we'll use loaders:
    1. Export a `loader function` from the page that fetches the data that page will need. Happens in Vans component.
    2. Pass a `loader prop` to the Route that renders that page and pass in the loader function. Happens in App.jsx
    3. Use the `useLoaderData` hook in the component to get the data. Happens in Vans component.
- since a loader is not a component we can not use useParams hook but we have immediate access as one of its parameters an object called `params`. `function loader({params}){}`

### createBrowserRouter
- Before we can take advantage of any of the data layer APIs we need to change the way we create our router. We need to create our BrowserRouter in a different way using createBrowserRouter function.
- Previously we defined our routes based on a series of nested components, what happens under the hood is that the <Routes/> component actually takes every route that we have nested in it and turns it into a plain JS object, expresses them as an array of route objects:
```js
  [
    {
      path: "/",
      element: <Home/>,
      children: [{  /*child routes of <Home />*/ }]
    }
  ]
``` 

- With createBrowserRouter we can go down the path of rewriting all our routes manually into an array of objects like above or a simpler method would be to use the `createRoutesFromElements` utility function. So when we call `createBrowserRouter` we will call inside it `createRoutesFromElements`. That way I can put the Route elements directly inside the create routes from elements since the function will turn the <Route /> component into an object and then pass the object to `createBrowserRouter`. 

```jsx
  // Before
  import {BrowserRouter, Routes, Route} from 'react-router-dom'

  function HomePage(){
    return (<main> <h1> Home Page</h1> </main>)
  }

  function App(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    )
  }

  // After
  import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'

  function HomePage(){
    return (<main> <h1> Home Page</h1> </main>)
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<HomePage />} />
  ))

  function App(){
    return (
      <RouterProvider router={router} />
    )
  }

```
- Using the `useLoaderData` hook:
```jsx
//In HomePage.jsx
import {useLoaderData} from 'react-router-dom'

export function loader(){
  return "The data is here"
}

export default function HomePage(){
    const data = useLoaderData()
    console.log(data)
    return (<main> <h1> Home Page</h1> </main>)
}


// in App.jsx
  import {RouterProvider, createBrowserRouter, createRoutesFromElements, useLoaderData, Route} from 'react-router-dom'
  import HomePage, {loader as homePageLoader} from './Home'
  

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<HomePage />} loader={homePageLoader} />
  ))

  function App(){
    return (
      <RouterProvider router={router} />
    )
  }
```

### errorElement
- This is prop that renders an element if anything goes wrong. It handles more than just errors that happen in the loader, it can also handle if a user trys to access a property or function that doesn't exist; a general error within the component.

```jsx
  <Route path="/" element={<HomePage/>} errorElement={<ErrorPage />}/>
```
- `useRouteError` - This is a special hook that allows us to display info about the error that is catched by the errorElement

- **We can make our error component more generic and put it in a parent route since any error in any child route even the most nested will bubble up to the nearest error element in the route configuration.**


## Protected Routes
- This is not an API in React Router but a paradigm/pattern that can be used to protect certain routes.
- Purpose: Stop data fetching of sensitive information; only allow logged-in users to access their data.
- Different when using old router and when using data router. Remeber when fetching with useEffect we transition to a new page then the fetch kicks off, this means we need a loading & error state; after the fetch is completed JSON is returned to the component then it is rerendered.:
  1. How did we change our route definitions in order to "protect" certain routes from an un-logged-in user? Wrapped the routes we wanted to protect in a Layout route that contains logic to redirect someone if they're not logged in to the login page.   
  2. What component can we use to automatically send someone to a different route in our app? <Navigate to="/login" />
  3. What component can we render if the user IS logged in? <Outlet />
  -  In react router, when you have nested routes that are all displaying on the page at the same time, you can end up wih a `request waterfall` where everything has to wait for the previous route to finish before the next one to start.
    - add request waterfall image
- While using loaders for fetching, the fetching happens before the route transition & the target component actually renders to the page. An advantage of having requests available to the router before the routes even load is that they know how to run your fetch request before even transitioning to that route. So if you have some nested route you're trying to reach, all of those fetch request can happen simultaneously; all of the loaders that are required for your current route to display correctly are run in parallel then whenever the final one of the loader finishes the entire completed page can render to the screen thus leading to faster loading and better UX.
 - add parallel loaders image
 - Because all of the loaders for all routes will run as soon as we start the transition to that route it means that we cant put a layout route to wrap our routes and stop the fetch request from running. Because they all start running even before it transitions into that component we no longer can try to prevent the components from rendering because the fetch requests are happening before the component is rendering anyway.
 - Therefore the approach will be: Use of the `redirect()` function. If user isn't logged in, run redirect() to redirect to Login Page when protected route loaders run, before any route rendering happens. The downside is that it needs to happen in every protected route's loader.

```jsx
// Using Old Routers
  // AuthRequired.jsx
  import { Outlet, Navigate } from "react-router-dom"
  export default function AuthRequired() {
      const isLoggedIn = false
      if (!isLoggedIn) return <Navigate to="/login" state={{message: "You must log in first"}} />
      return <Outlet />
  }
  //Layout.jsx
  import { Outlet, Link } from "react-router-dom"
  export default function Layout() {
    return (
      <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="protected">Protected</Link>
      </nav>
      <main><Outlet /></main> </>
    );
  }

  //App.jsx
  import {BrowserRouter, Routes, Route} from 'react-router-dom'
  import Layout from "./Layout"
  import AuthRequired from "./AuthRequired"

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<h1>Home page</h1>} />

              <Route element={<AuthRequired />}>
                <Route path="protected" element={<h1>Super secret info here</h1>} />
              </Route>
          </Route>        
        </Routes>
      </BrowserRouter>
    )
  }

// Using data routers
  // Layout.jsx
  import { Outlet, Link } from "react-router-dom"
  export default function Layout() {
    return (
      <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="protected">Protected</Link>
        <Link to="login">Login</Link>
      </nav>
      <main><Outlet /></main>
      </>
    );
  }

  //App.jsx
  import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, redirect} from "react-router-dom"
  import Layout from "./Layout"
  import AuthRequired from "./AuthRequired"

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={<h1>Home page</h1>}
        loader={async () => {
          return null
        }}
      />
      <Route
        path="protected" element={<h1>Super secret info here</h1>}
        //loader runs before route transition ever happens
        loader={async () => {
          const isLoggedIn = false
          if(!isLoggedIn){
            throw/return redirect("/login")
            // return redirect("/login") - can return though not common
          }
          return null
        }}
      />
      <Route path="login" element={<h1>Login page goes here</h1>} />

    </Route>
  ))

  function App() {
    return (
      <RouterProvider router={router} />
    )
  }
```

- **Parallel loaders** - when you have nested routes, the loaders of each of those nested routes will run in parallel. If we navigate to a parent with a loader then child with a loader and hit refresh sometimes the nested loader will return faster than the parent loader, it doesn't need to wait for the parent to finish before running. This clarifies why we use a different approach when using loaders to set protect routes since if both routes are making a fetch request to protected data we can see that they are both running at the same time so we can't simply have code inside the parent route that is tryning to stop the rendering of the child route beacuse the loader is happening before the rendering happens.
`Downside: With protected routes, you have to include a loader with in every protected route in order to protoect all the routes because they will always run in parallel`

- Even though in `App.jsx` we have repetition it is good that loaders will run before  route transitions thus giving a more synchronous feel, we no longer need to remember about render cycles and what will cause or not cause a rerender in our componenet then having to set up error and loading state which were just things that are about managing the react render cycle and not about managing our actual data; loaders are better than wrapping everyhting with an Auth component and soon there might be a middleware solution to the repetition of loaders in all protected routes.
- we can include a message prompt using search params i.e,

```jsx
  import { redirect } from "react-router-dom";

  export async function requireAuth(){
      const isLoggedIn = false;

      if(!isLoggedIn) {
          return redirect("/login?message=You must log in first")
      }
  }
```
 - To access the message we can use useSearchParams() but to dive deeper into loaders we can use a loader function in the login page component and destructure the request object it automatically receives (just like the `params`). `Check MDN for ref on the request object since it is from the web and not specific to react router`.
 ```jsx
  function loginLoader({request}){
    return new URL(request.url).searchParam.get("message")
  }
 ```