import { $ } from "bun";
import { join } from "node:path";
import { mkdir, exists, cp } from "node:fs/promises";

import ora from "ora";

/**
 * Create a new servlet project
 */
export async function create(name: string, options: Record<string, string>) {
  // Loader
  const loader = ora(`Creating project (${name})...`).start();

  // If no org is provided
  if (!options.org) {
    loader.fail("Organization name is required.");
    process.exit(1);
  }

  // Source directory
  const source = "src";
  // Lib folder
  const lib = join(import.meta.dir, "lib");
  // Template folder
  const template = join(import.meta.dir, "template");
  // Current working directory
  const pwd = (await $`pwd`.text()).trim();
  // Project directory
  const projectDir = `${pwd}/${name}`;
  // Org path
  const orgPath = `${projectDir}/${source}/${options.org.replaceAll(".", "/")}`;

  // Check if project directory already exists
  if (await exists(projectDir)) {
    loader.fail(`Project name directory already exists: ${name}`);
    process.exit(1);
  }

  // Create lib folder for dependencies
  await mkdir(`${projectDir}/lib`, { recursive: true });
  // Create project folders
  await mkdir(orgPath, { recursive: true });
  // Copy lib folder to project directory
  await cp(lib, `${projectDir}/lib`, { recursive: true });

  // Create .vscode folder
  await mkdir(`${projectDir}/.vscode`);
  // Copy .vscode/settings file
  await cp(`${import.meta.dir}/settings.json`, `${projectDir}/.vscode/settings.json`);

  // Get example servlet file
  const servlet = (await Bun.file(`${template}/Example.java`).text()).replace("{package}", options.org);
  // Example file
  const example = Bun.file(`${orgPath}/Example.java`);
  // Write example servlet file
  await Bun.write(example, servlet);
  
  // Show success message
  loader.succeed('Project created');
}