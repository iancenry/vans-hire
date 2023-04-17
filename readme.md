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


- Mirage JS - npm package to create mock server that will intercept any API requests and will return data from the mock server instead of having to worry about reaching out to the real world.
   - thin of the routes() portion as the server code that would run whenever you make a request to `/vans` or tp `/vans/:id`

### Nested Routes
- use a colon and a name so that we can use one route definition for several pages eg detail page.
- Use useParams hook to grab url parameters