
- React router helps us do client side routing. 

- MPA vs SPA
    - MPA (Multi Page app) - in traditional websites, a client requests html page of a site from the server the server will then send an html file as a response and the browser loads the page. When the about link is clicked the same process will be repeated then the browser will replace the old homepage with the new about page. So when we click on anew page the old is entirely discarded then replaced with the new page from the server.
    - SPA (Single Page App) - doesn't mean that you have only one page on your website but that the browser is only loading a single web doc one time and then the app will make incremental updates to that exisitng document through different methods like internal react state changes or fetch requests to an API.
    So when a request is made to the server then its job instead of being to process and build a html file it will send an entire react app so  when you navigate to the about page, portions of that new page are loaded inside the react app without making new requests other requests can be made to maybe get jSON data.

- Components:
    - Browser router is a context provider; provides context for all of its children components.
    - The Routes component is the first child  in the Browser router and in it we have a series of new components called Route (a part of url that specifies where you are e.g /about). Routes can be nested e.g /blog/blog-article-1.

 ```jsx
      <Router> 
        <Routes>
          {/* create route definition */}
        </Routes>
      </Router>
 ```
    