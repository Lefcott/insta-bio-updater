const { IgApiClient } = require("instagram-private-api");
const ig = new IgApiClient();

const USERNAME = process.env.IG_USERNAME;
const PASSWORD = process.env.IG_PASSWORD;

ig.state.generateDevice(USERNAME);

let loggedIn = false;

module.exports = {
  updateBio: async (newBio) => {
    if (!loggedIn) {
      console.log("pre log in");
      await ig.simulate.preLoginFlow();
      console.log("logging in");
      await ig.account.login(USERNAME, PASSWORD);
      console.log("logged in");

      process.nextTick(
        async () => await ig.simulate.postLoginFlow().catch(console.error)
      );
      loggedIn = true;
    }

    try {
      console.log("updating bio");
      await ig.account.setBiography(newBio);
    } catch (error) {
      console.log(error);
    }
  },
};
