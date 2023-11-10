import * as fs from "fs";
import * as core from "@actions/core";
import FormData from "form-data";

import apiAppAutomate from "../utils/api-app-automate";
import { App, InitializeApiAppProps, RemoveAppProps, UploadAppProps, UploadAppResponse } from "./types";

export function initializeApiAppAutomate({ username, password }: InitializeApiAppProps) {
  apiAppAutomate.defaults.auth = { username, password };
}

export async function getRecentAppsAutomate() {
  try {
    const response = await apiAppAutomate.get<App[]>("/recent_apps");
    return response.data
  } catch (err) {
    throw err as Error;
  }
}

export async function uploadAppAutomate({ appPath }: UploadAppProps) {
  try {
    if (!appPath)
      throw new Error("appPath is required for upload app");

    const customId = core.getInput('custom-id', { required: false });
    const form_data = new FormData();
    form_data.append("file", fs.createReadStream(appPath));
    form_data.append("custom_id", customId);
    const response = await apiAppAutomate.post<UploadAppResponse>("/upload", form_data);
    core.setOutput("browserstack-app-automate-url", response.data.app_url);
  } catch (err) {
    throw err as Error;
  }
}

export async function removeAppAutomate({ appId }: RemoveAppProps) {
  try {
    if (!appId)
      throw new Error("appId is required for remove app");

    await apiAppAutomate.delete(`/app/delete/${appId}`);
  } catch (err) {
    throw err as Error;
  }
}