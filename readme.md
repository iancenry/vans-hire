# React Router V6
- It helps in doing client side routing. 

## MPA vs SPA
  - `MPA (Multi Page Application)` - in traditional websites, a client requests for a html page of a site from the server, the server will then send an html file as a response and the browser loads the page. When another link e.g the *about link* is clicked the same process will be repeated then the browser will replace the old homepage with the new about page. So when we click on a new page the old is entirely discarded then replaced with the new page from the server.
  - `SPA (Single Page Application)` - used in react, it doesn't mean that you have only one page on your website but that the browser is only loading a single web document one time and then the app will make incremental updates to that exisitng document through different methods like internal react state changes or fetch requests to an API; for example we have a home page with a header, body and footer, when we click another page only the body us updated but the rest of the document remains the same.
  - So when a request is made to the server then its job instead of being to process and build a html file like  in MPA, it will send an entire react application so when you navigate to the about page, portions of that new page are loaded inside the react app without making new requests other requests can be made to maybe get jSON data.

##  Components provided by react-router-dom:
  - `BrowserRouter` - it is a context provider; provides context for all of its children components.
  - `Routes` - it is the first child  in the Browser router and in it we have a series of new components called Route( a part of url that specifies where you are e.g /about). Routes can be nested e.g /blog/blog-article-1.
  - `Route` - self closing component that specifies the element to be displayed when a particular link is hit.
  - Others: `Link`, 

### Basic Setup

 ```jsx
      <BrowserRouter> 
        <Routes>
          {/* create route definition */}
        </Routes>
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

    export default App

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

 ## Continous Deployment with netlify
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
- Use useParams hook provided by react-router-dom to grab url parameters.

```jsx
  const params = useParams()
  params.urlParamName;
```

### Nested Routes 
When talking about nested routes we are talking about:
  - Nested routes means nesting pieces of the url - /van/van-id-or-name
  - Prescence of a shared UI or parts of the page that need to remain on th epage when we transition from one route to a child route or nested route. The shared UI can be a navigation bar.
    * Add nested UI image

- To nest a route we need to change it from a self closing component to it having an opening and closing tag.
- Use nested routes when you want to keep displaying some UI on the page, but also want to display more. A page changing a small or large portion.

### Layout Routes
- Don't have a path of their own but their purpose is to *lay out* the page; we want all our pages to have a header and a footer.
- Outlet will help us create a hole in our component where the matching route that is a child of the parent route can render. Without it we will only see the Layout component, since it has no path so will match all url paths , instead of the appropriate child.

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
- If I have an element that i want to display in the outlet of the layout component but i want it to be at the same route as what the layout compnent is defined at i can replace the path with the prop called index. Can be seen with the HostLayout having the same path as Dashboard component which would force us to write `http://localhost:3000/host/host` which isn't advisable. Using the prop index will fix this since it is saying that I want you to put the component with index inside the outlet of the parent route when it matches.

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













```jsx

{/* 
          <Route path='/host' element={<Host />} >
            <Route path='/host/income' element={<HostIncome />} />
            <Route path='/host/reviews' element={<HostReviews />} />
            <Route path='/host/vans' element={<HostVans />} />
            <Route path='/host/vans/:id' element={<HostVan />} />
            <Route path='/host/vans/:id/pricing' element={<Pricing />} />
            <Route path='/host/vans/:id/photos' element={<Photos />} />
          </ Route> */}


          {/* <footer>
          <span>&copy; #VANLIFE</span>
        </footer> */}
```