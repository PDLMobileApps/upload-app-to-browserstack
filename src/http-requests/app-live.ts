import * as fs from "fs";
import * as core from "@actions/core";
import FormData from "form-data";

import apiAppLive from "../utils/api-app-live";
import { App, InitializeApiAppProps, RemoveAppProps, UploadAppProps, UploadAppResponse } from "./types";

export function initializeApiAppLive({ username, password }: InitializeApiAppProps) {
  apiAppLive.defaults.auth = { username, password };
}

export async function getRecentAppsLive() {
  try {
    const response = await apiAppLive.get<App[]>("/recent_apps");
    return response.data
  } catch (err) {
    throw err as Error;
  }
}

export async function uploadAppLive({ appPath }: UploadAppProps) {
  try {
    if (!appPath)
      throw new Error("appPath is required for upload app");

    const customId = core.getInput('custom-id', { required: false });
    const form_data = new FormData();
    form_data.append("file", fs.createReadStream(appPath));
    if (customId !== '')
      form_data.append("custom_id", customId);
    const response = await apiAppLive.post<UploadAppResponse>("/upload", form_data);
    core.setOutput("browserstack-app-live-url", response.data.app_url);
  } catch (err) {
    throw err as Error;
  }
}

export async function removeAppLive({ appId }: RemoveAppProps) {
  try {
    if (!appId)
      throw new Error("appId is required for remove app");

    await apiAppLive.delete(`/app/delete/${appId}`);
  } catch (err) {
    throw err as Error;
  }
}