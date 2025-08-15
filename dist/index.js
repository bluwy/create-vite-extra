#!/usr/bin/env node

// src/index.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import spawn from "cross-spawn";
import mri from "mri";
import * as prompts from "@clack/prompts";
import colors from "picocolors";
var {
  blue,
  blueBright,
  cyan,
  green,
  magenta,
  red,
  redBright,
  yellow,
  magentaBright
} = colors;
var argv = mri(process.argv.slice(2), {
  alias: { h: "help", t: "template" },
  boolean: ["help", "overwrite"],
  string: ["template"]
});
var cwd = process.cwd();
var helpMessage = `Usage: create-vite-extra [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${yellow("ssr-vanilla-ts                ssr-vanilla")}
${green("ssr-vue-ts                     ssr-vue")}
${green("ssr-vue-streaming-ts           ssr-vue-streaming")}
${cyan("ssr-react-ts                  ssr-react")}
${cyan("ssr-react-swc-ts              ssr-react-swc")}
${cyan("ssr-react-streaming-ts        ssr-react-streaming")}
${yellow("ssr-react-swc-streaming-ts    ssr-react-swc-streaming")}
${magenta("ssr-preact-ts                 ssr-preact")}
${red("ssr-svelte-ts                 ssr-svelte")}
${blue("ssr-solid-ts                  ssr-solid")}
${yellow("deno-vanilla-ts                deno-vanilla")}
${green("deno-vue-ts                    deno-vue")}
${cyan("deno-react-ts                 deno-react")}
${yellow("deno-react-swc-ts             deno-react-swc")}
${magenta("deno-preact-ts                deno-preact")}
${redBright("deno-lit-ts                    deno-lit")}
${red("deno-svelte-ts                deno-svelte")}
${blueBright("deno-solid-ts                 deno-solid")}
${magentaBright("library-ts                library")}
${redBright("ssr-transform                      ")}

`;
var FRAMEWORKS = [
  {
    name: "ssr-vanilla",
    display: "ssr-vanilla",
    color: yellow,
    variants: [
      {
        name: "ssr-vanilla-ts",
        display: "TypeScript",
        color: blue
      },
      {
        name: "ssr-vanilla",
        display: "JavaScript",
        color: yellow
      }
    ]
  },
  {
    name: "ssr-vue",
    display: "ssr-vue",
    color: green,
    variants: [
      {
        name: "ssr-vue-streaming",
        display: "Streaming",
        color: green,
        variants: [
          {
            name: "ssr-vue-streaming",
            display: "JavaScript",
            color: yellow
          },
          {
            name: "ssr-vue-streaming-ts",
            display: "TypeScript",
            color: blue
          }
        ]
      },
      {
        name: "ssr-vue",
        display: "Non-streaming",
        color: green,
        variants: [
          {
            name: "ssr-vue",
            display: "JavaScript",
            color: yellow
          },
          {
            name: "ssr-vue-ts",
            display: "TypeScript",
            color: blue
          }
        ]
      }
    ]
  },
  {
    name: "ssr-react",
    display: "ssr-react",
    color: cyan,
    variants: [
      {
        name: "ssr-react-streaming",
        display: "Streaming",
        color: cyan,
        variants: [
          {
            name: "ssr-react-streaming",
            display: "JavaScript",
            color: yellow
          },
          {
            name: "ssr-react-streaming-ts",
            display: "TypeScript",
            color: blue
          },
          {
            name: "ssr-react-swc-streaming",
            display: "JavaScript + SWC",
            color: yellow
          },
          {
            name: "ssr-react-swc-streaming-ts",
            display: "TypeScript + SWC",
            color: blue
          }
        ]
      },
      {
        name: "ssr-react",
        display: "Non-streaming",
        color: cyan,
        variants: [
          {
            name: "ssr-react",
            display: "JavaScript",
            color: yellow
          },
          {
            name: "ssr-react-ts",
            display: "TypeScript",
            color: blue
          },
          {
            name: "ssr-react-swc",
            display: "JavaScript + SWC",
            color: yellow
          },
          {
            name: "ssr-react-swc-ts",
            display: "TypeScript + SWC",
            color: blue
          }
        ]
      }
    ]
  },
  {
    name: "ssr-preact",
    display: "ssr-Preact",
    color: magenta,
    variants: [
      {
        name: "ssr-preact",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "ssr-preact-ts",
        display: "TypeScript",
        color: blue
      }
    ]
  },
  {
    name: "ssr-svelte",
    display: "ssr-Svelte",
    color: red,
    variants: [
      {
        name: "ssr-svelte",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "ssr-svelte-ts",
        display: "TypeScript",
        color: blue
      }
    ]
  },
  {
    name: "ssr-solid",
    display: "ssr-Solid",
    color: blue,
    variants: [
      {
        name: "ssr-solid",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "ssr-solid-ts",
        display: "TypeScript",
        color: blue
      }
    ]
  },
  {
    name: "deno-vanilla",
    display: "deno-vailla",
    color: yellow,
    variants: [
      {
        name: "deno-vanilla",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "deno-vanilla-ts",
        display: "TypeScript",
        color: blue
      }
    ]
  },
  {
    name: "deno-vue",
    display: "deno-vue",
    color: green,
    variants: [
      {
        name: "deno-vue",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "deno-vue-ts",
        display: "TypeScript",
        color: blue
      }
    ]
  },
  {
    name: "deno-react",
    display: "deno-react",
    color: cyan,
    variants: [
      {
        name: "deno-react",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "deno-react-ts",
        display: "TypeScript",
        color: blue
      },
      {
        name: "deno-react-swc",
        display: "JavaScript + SWC",
        color: yellow
      },
      {
        name: "deno-react-swc-ts",
        display: "TypeScript + SWC",
        color: blue
      }
    ]
  },
  {
    name: "deno-preact",
    display: "deno-preact",
    color: magenta,
    variants: [
      {
        name: "deno-preact",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "deno-preact-ts",
        display: "TypeScript",
        color: blue
      }
    ]
  },
  {
    name: "deno-lit",
    display: "deno-lit",
    color: redBright,
    variants: [
      {
        name: "deno-lit",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "deno-lit-ts",
        display: "TypeScript",
        color: blue
      }
    ]
  },
  {
    name: "deno-svelte",
    display: "deno-svelte",
    color: red,
    variants: [
      {
        name: "deno-svelte",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "deno-svelte-ts",
        display: "TypeScript",
        color: blue
      }
    ]
  },
  {
    name: "deno-solid",
    display: "deno-solid",
    color: blueBright,
    variants: [
      {
        name: "deno-solid",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "deno-solid-ts",
        display: "TypeScript",
        color: blue
      }
    ]
  },
  {
    name: "library",
    display: "library",
    color: magentaBright,
    variants: [
      {
        name: "library",
        display: "JavaScript",
        color: yellow
      },
      {
        name: "library-ts",
        display: "TypeScript",
        color: blue
      }
    ]
  },
  {
    name: "ssr-transform",
    display: "ssr-transform",
    color: redBright,
    variants: []
  }
];
var TEMPLATES = FRAMEWORKS.map((f) => f.variants.map((v) => v.name)).reduce(
  (a, b) => a.concat(b),
  []
);
var renameFiles = {
  _gitignore: ".gitignore"
};
var defaultTargetDir = "vite-project";
async function init() {
  const argTargetDir = argv._[0] ? formatTargetDir(String(argv._[0])) : void 0;
  const argTemplate = argv.template;
  const argOverwrite = argv.overwrite;
  const help = argv.help;
  if (help) {
    console.log(helpMessage);
    return;
  }
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const cancel2 = () => prompts.cancel("Operation cancelled");
  let targetDir = argTargetDir;
  if (!targetDir) {
    const projectName = await prompts.text({
      message: "Project name:",
      defaultValue: defaultTargetDir,
      placeholder: defaultTargetDir
    });
    if (prompts.isCancel(projectName)) return cancel2();
    targetDir = formatTargetDir(projectName);
  }
  if (fs.existsSync(targetDir) && !isEmpty(targetDir)) {
    const overwrite = argOverwrite ? "yes" : await prompts.select({
      message: (targetDir === "." ? "Current directory" : `Target directory "${targetDir}"`) + ` is not empty. Please choose how to proceed:`,
      options: [
        {
          label: "Cancel operation",
          value: "no"
        },
        {
          label: "Remove existing files and continue",
          value: "yes"
        },
        {
          label: "Ignore files and continue",
          value: "ignore"
        }
      ]
    });
    if (prompts.isCancel(overwrite)) return cancel2();
    switch (overwrite) {
      case "yes":
        emptyDir(targetDir);
        break;
      case "no":
        cancel2();
        return;
    }
  }
  let packageName = path.basename(path.resolve(targetDir));
  if (!isValidPackageName(packageName)) {
    const packageNameResult = await prompts.text({
      message: "Package name:",
      defaultValue: toValidPackageName(packageName),
      placeholder: toValidPackageName(packageName),
      validate(dir) {
        if (!isValidPackageName(dir)) {
          return "Invalid package.json name";
        }
      }
    });
    if (prompts.isCancel(packageNameResult)) return cancel2();
    packageName = packageNameResult;
  }
  let template = argTemplate;
  let hasInvalidArgTemplate = false;
  if (argTemplate && !TEMPLATES.includes(argTemplate)) {
    template = void 0;
    hasInvalidArgTemplate = true;
  }
  if (!template) {
    const framework = await prompts.select({
      message: hasInvalidArgTemplate ? `"${argTemplate}" isn't a valid template. Please choose from below: ` : "Select a framework:",
      options: FRAMEWORKS.map((framework2) => {
        const frameworkColor = framework2.color;
        return {
          label: frameworkColor(framework2.display || framework2.name),
          value: framework2
        };
      })
    });
    if (prompts.isCancel(framework)) return cancel2();
    const variant = await prompts.select({
      message: "Select a variant:",
      options: framework.variants.map((variant2) => {
        const variantColor = variant2.color;
        const command = variant2.customCommand ? getFullCustomCommand(variant2.customCommand, pkgInfo).replace(
          / TARGET_DIR$/,
          ""
        ) : void 0;
        return {
          label: variantColor(variant2.display || variant2.name),
          value: variant2.name,
          hint: command
        };
      })
    });
    if (prompts.isCancel(variant)) return cancel2();
    template = variant;
  }
  const root = path.join(cwd, targetDir);
  fs.mkdirSync(root, { recursive: true });
  let isReactSwc = false;
  if (template.includes("-swc")) {
    isReactSwc = true;
    template = template.replace("-swc", "");
  }
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";
  const { customCommand } = FRAMEWORKS.flatMap((f) => f.variants).find((v) => v.name === template) ?? {};
  if (customCommand) {
    const fullCustomCommand = getFullCustomCommand(customCommand, pkgInfo);
    const [command, ...args] = fullCustomCommand.split(" ");
    const replacedArgs = args.map(
      (arg) => arg.replace("TARGET_DIR", () => targetDir)
    );
    const { status } = spawn.sync(command, replacedArgs, {
      stdio: "inherit"
    });
    process.exit(status ?? 0);
  }
  prompts.log.step(`Scaffolding project in ${root}...`);
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../..",
    `template-${template}`
  );
  const write = (file, content) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };
  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => f !== "package.json" || "deno.json")) {
    write(file);
  }
  const isDeno = template.startsWith("deno-");
  if (isDeno) {
    if (isReactSwc) {
      setupReactSwc(root, template.endsWith("-ts"));
    }
    console.log(`
Done. Now run:
`);
    if (root !== cwd) {
      console.log(`  cd ${path.relative(cwd, root)}`);
    }
    console.log("  deno task dev");
    console.log();
  } else {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(templateDir, `package.json`), "utf-8")
    );
    pkg.name = packageName;
    write("package.json", JSON.stringify(pkg, null, 2) + "\n");
    if (isReactSwc) {
      setupReactSwc(root, template.endsWith("-ts"));
    }
    let doneMessage = "";
    const cdProjectName = path.relative(cwd, root);
    doneMessage += `Done. Now run:
`;
    if (root !== cwd) {
      doneMessage += `
  cd ${cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName}`;
    }
    switch (pkgManager) {
      case "yarn":
        doneMessage += "\n  yarn";
        doneMessage += "\n  yarn dev";
        break;
      default:
        doneMessage += `
  ${pkgManager} install`;
        doneMessage += `
  ${pkgManager} run dev`;
        break;
    }
    prompts.outro(doneMessage);
  }
}
function formatTargetDir(targetDir) {
  return targetDir.trim().replace(/\/+$/g, "");
}
function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}
function isValidPackageName(projectName) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName
  );
}
function toValidPackageName(projectName) {
  return projectName.trim().toLowerCase().replace(/\s+/g, "-").replace(/^[._]/, "").replace(/[^a-z\d\-~]+/g, "-");
}
function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}
function isEmpty(path2) {
  const files = fs.readdirSync(path2);
  return files.length === 0 || files.length === 1 && files[0] === ".git";
}
function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}
function pkgFromUserAgent(userAgent) {
  if (!userAgent) return void 0;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  };
}
function setupReactSwc(root, isTs) {
  const reactSwcPluginVersion = "3.9.0";
  editFile(path.resolve(root, "package.json"), (content) => {
    return content.replace(
      /"@vitejs\/plugin-react": ".+?"/,
      `"@vitejs/plugin-react-swc": "^${reactSwcPluginVersion}"`
    );
  });
  editFile(
    path.resolve(root, `vite.config.${isTs ? "ts" : "js"}`),
    (content) => {
      return content.replace("@vitejs/plugin-react", "@vitejs/plugin-react-swc");
    }
  );
}
function editFile(file, callback) {
  const content = fs.readFileSync(file, "utf-8");
  fs.writeFileSync(file, callback(content), "utf-8");
}
function getFullCustomCommand(customCommand, pkgInfo) {
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";
  const isYarn1 = pkgManager === "yarn" && pkgInfo?.version.startsWith("1.");
  return customCommand.replace(/^npm create (?:-- )?/, () => {
    if (pkgManager === "bun") {
      return "bun x create-";
    }
    if (pkgManager === "pnpm") {
      return "pnpm create ";
    }
    return customCommand.startsWith("npm create -- ") ? `${pkgManager} create -- ` : `${pkgManager} create `;
  }).replace("@latest", () => isYarn1 ? "" : "@latest").replace(/^npm exec/, () => {
    if (pkgManager === "pnpm") {
      return "pnpm dlx";
    }
    if (pkgManager === "yarn" && !isYarn1) {
      return "yarn dlx";
    }
    if (pkgManager === "bun") {
      return "bun x";
    }
    return "npm exec";
  });
}
init().catch((e) => {
  console.error(e);
});
