import * as core from "@actions/core";
import * as github from "@actions/github";

import { getRecentAppsLive, initializeApiAppLive, removeAppLive, uploadAppLive } from "./http-requests/app-live";
import { getRecentAppsAutomate, initializeApiAppAutomate, removeAppAutomate, uploadAppAutomate } from "./http-requests/app-automate";

export async function run() {
  try {
    const appPath = core.getInput('app-path', { required: true });
    if (!hasValue(appPath))
      core.setFailed('app-path is required');

    const bsUserName = core.getInput('browserstack-username', { required: true });
    if (!hasValue(bsUserName))
      core.setFailed('browserstack-username is required');

    const bsAccessKey = core.getInput('browserstack-accesskey', { required: true });
    if (!hasValue(bsAccessKey))
      core.setFailed('browserstack-accesskey is required');

    if (hasValue(appPath) && hasValue(bsUserName) && hasValue(bsAccessKey)) {
      console.log(`appPath: ${appPath}`);
      console.log(`bsUserName: ${bsUserName}`);
      console.log(`bsAccessKey: ${bsAccessKey}`);

      initializeApiAppLive({ username: bsUserName, password: bsAccessKey });
      initializeApiAppAutomate({ username: bsUserName, password: bsAccessKey });
      
      const appToReplace = core.getInput("app-to-replace", { required: false });
      if (hasValue(appToReplace)) {
        console.log(`appToReplace: ${appToReplace}`);

        // App Live
        const appsLive = await getRecentAppsLive();
        if (appsLive && appsLive.length > 0) {
          // console.log(`appsLive: ${appsLive}`);

          const app = appsLive.find(app => app.app_name === appToReplace);
          if (app)
            await removeAppLive({ appId: app.app_id });
          else
            console.log("App Live - Reported app-to-replace not found for the user");
        }

        // App Automate
        const appsAutomate = await getRecentAppsAutomate();
        if (appsAutomate && appsAutomate.length > 0) {
          // console.log(`appsAutomate: ${appsAutomate}`);

          const app = appsAutomate.find(app => app.app_name === appToReplace);
          if (app)
            await removeAppAutomate({ appId: app.app_id });
          else
            console.log("App Automate - Reported app-to-replace not found for the user");
        }
      }

      await uploadAppLive({ appPath });
      await uploadAppAutomate({ appPath });
    }

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('Unknown error occurred.')
    }
  }
}

function hasValue(variable): boolean {
  return variable !== 'undefined' && variable !== ''
}

void run();