import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const host = "127.0.0.1";
const port = "4173";
const baseUrl = `http://${host}:${port}`;

let serverStopped = false;
let server;

function runBuild() {
  const command = process.platform === "win32" ? "cmd.exe" : "npm";
  const args =
    process.platform === "win32"
      ? ["/d", "/s", "/c", "npm.cmd", "run", "build"]
      : ["run", "build"];

  return new Promise((resolve) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      windowsHide: true,
    });

    child.on("exit", (code) => {
      resolve(code ?? 1);
    });
  });
}

function startServer() {
  server = spawn(
    process.execPath,
    ["node_modules/vite/bin/vite.js", "preview", "--host", host, "--port", port],
    {
      stdio: "inherit",
      windowsHide: true,
    },
  );

  server.on("exit", (code) => {
    serverStopped = true;

    if (code !== 0 && code !== null) {
      console.error(`Vite preview exited early with code ${code}.`);
    }
  });
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);

      if (response.ok) {
        return;
      }
    } catch {
      await delay(250);
    }
  }

  throw new Error(`Timed out waiting for ${baseUrl}`);
}

function runPlaywright() {
  const command = process.platform === "win32" ? "cmd.exe" : "node_modules/.bin/playwright";
  const args =
    process.platform === "win32"
      ? ["/d", "/s", "/c", "node_modules\\.bin\\playwright.cmd", "test", "--reporter=line"]
      : ["test", "--reporter=line"];

  return new Promise((resolve) => {
    const child = spawn(command, args, {
      env: {
        ...process.env,
        SEA_E2E_EXTERNAL_SERVER: "1",
      },
      stdio: "inherit",
      windowsHide: true,
    });

    child.on("exit", (code) => {
      resolve(code ?? 1);
    });
  });
}

try {
  const buildExitCode = await runBuild();

  if (buildExitCode !== 0) {
    process.exitCode = buildExitCode;
  } else {
    startServer();
    await waitForServer();
    const exitCode = await runPlaywright();
    process.exitCode = exitCode;
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  if (server !== undefined && !serverStopped) {
    server.kill();
  }
}
