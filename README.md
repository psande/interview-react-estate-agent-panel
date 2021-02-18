## Test by Pablo Sande

Screening for React skills for an online estate agent.

`Status: Completed`

### Instructions
First run:

`npm install`

Once completed, open two tabs with the following commands:

`npm run api`

`npm start`

To test the app:

`npm testing`

### Notes
To time frame this test, I've made some compromises, which allowed me to focus on more important bits.

* There is a loading screen, which won't be visible, this being a local demo. It can be observed by adding delay to the connection in the Chrome dev tools.
* I've used a single breakpoint for this test, and it is hardcoded to a resolution that makes sense for this design.
* I'm making the assumption that data from the server is always correct. No validations are being made.
* Same with API call error catching, only made in the first api call.
* I've only added aria-attributes to the loading screen (for testing purposes). It could be an easy win to add some to comply with the test, but they usually require careful consideration.
