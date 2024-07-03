import { $ } from "bun";
import { mkdir, exists, cp } from "node:fs/promises";
import ora from "ora";

/**
 * Build servlet project
 */
export async function build() {
  // Current working directory
  const pwd = (await $`pwd`.text()).trim();
  // Project directory
  const project = pwd.split("/").pop();
  
  // Loader
  const loader = ora(`Building project (${project})...`).start();

  // Check if both project directory exists
  if (!await exists(`${pwd}/lib`) || !await exists(`${pwd}/src`)) {
    loader.fail("Not a servlet project directory");
    process.exit(1);
  }

  try {
    // Check if has java installed
    await $`which javac`.quiet()
    
    // Create WEB-INF/classes folder
    await mkdir(`${pwd}/WEB-INF/classes`, { recursive: true });
    // Move lib folder to WEB-INF
    await cp(`${pwd}/lib`, `${pwd}/WEB-INF/lib`, { recursive: true });
    // Compile servlet files
    await $`javac -cp lib/* -d WEB-INF/classes src/**/*.java`;
    
    // Show success message
    loader.succeed("Project servlets built!");
  } catch (error) {
    loader.fail("Java is required to build servlet projects.");
  }
}