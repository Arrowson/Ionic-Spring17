# Chapter 4

### Problems
    1. Add a new state
    2. Improve Design
    3. Implement Direction Filter
    4. Cache Weather Data (local storage)
    5. Create/Use a service
    
### Overview of app

This app contains Chapter 4 from Wilken's book, Ionic in Action. It 
creates a simple app that emulates what a travel application may look like.
The design elements are partly Wilken's design with some input of my own.

#### Issues with the application
I had trouble with
```return $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'});```
rather than
```return $http.get```
I put a more in depth explanation in the notes section of the dropbox
