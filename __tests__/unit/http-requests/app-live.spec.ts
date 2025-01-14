import { getRecentAppsLive, removeAppLive, uploadAppLive } from "../../../src/http-requests/app-live";

describe("call http request", () => {
  it("uploadApp with appPath", async () => {
    try {
      await uploadAppLive({ appPath: "./__tests__/mocks/release-files-android/release.aab" });
    } catch (err) {
      expect((err as Error).message).toBe("Request failed with status code 401");
    }
  });

  it("uploadApp without appPath", async () => {
    try {
      await uploadAppLive({ appPath: "" });
    } catch (err) {
      expect((err as Error).message).toBe("appPath is required for upload app");
    }
  });

  it("getRecentApps", async () => {
    try {
      await getRecentAppsLive();
    } catch (err) {
      expect((err as Error).message).toBe("Request failed with status code 401");
    }
  });

  it("removeApp with appId", async () => {
    try {
      await removeAppLive({ appId: "appId" });
    } catch (err) {
      expect((err as Error).message).toBe("Request failed with status code 401");
    }
  });

  it("removeApp without appId", async () => {
    try {
      await removeAppLive({ appId: "" });
    } catch (err) {
      expect((err as Error).message).toBe("appId is required for remove app");
    }
  });
})