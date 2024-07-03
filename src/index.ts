import { program } from "commander";
import { create } from "./new";
import { build } from "./build";
import { deploy } from "./deploy";

program
  .name("servlet")
  .description("A simple CLI for creating and managing Java Servlet projects.")
  .version("1.0.0")

program.command("new")
  .argument("<project-name>", "Name of the project.")
  .description("Create a new Java Servlet project.")
  .option("--org <org-name>", "Organization name for the project. (ex. com.wmdc.example)")
  .action(create)

program.command("build")
  .description("Build Java Servlet project.")
  .action(build)

program.command("deploy")
  .description("Deploy Java Servlet project.")
  .action(deploy)

program.parse();

const options = program.opts();
