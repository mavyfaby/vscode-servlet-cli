import { $ } from "bun";
import { mkdir, exists, cp } from "node:fs/promises";
import ora from "ora";

/**
 * Deploy servlet project
 */
export async function deploy() {
  // Current working directory
  const pwd = (await $`pwd`.text()).trim();
  // Project directory
  const project = pwd.split("/").pop();
  // WEB-INF folder
  const webInf = `${pwd}/WEB-INF`;
  
  // Loader
  const loader = ora(`Deploying project (${project})...`).start();

  // Check if both project directory exists
  if (!await exists(`${pwd}/lib`) || !await exists(`${pwd}/src`)) {
    loader.fail("Not a servlet project directory");
    process.exit(1);
  }

  // Check if WEB-INF folder exists
  if (!await exists(webInf)) {
    loader.fail("WEB-INF folder not found");
    process.exit(1);
  }

  // If TOMCAT_HOME is not set
  if (!Bun.env.TOMCAT_HOME) {
    loader.fail("TOMCAT_HOME not set");
    process.exit(1);
  }

  try {
    // Copy project to TOMCAT_HOME/webapps
    await cp(pwd, `${Bun.env.TOMCAT_HOME}/webapps/${project}`, { recursive: true });
    // Show success message
    loader.succeed("Project deployed!");
  } catch (error) {
    loader.fail("Failed to deploy project: " + error);
    process.exit(1);
  }
}