import {build, type BuildOptions} from "esbuild"
import {readdir} from "node:fs/promises"

export async function collectFolders(filePath: string): Promise<string[]> {
  const dirNames = await readdir(filePath, {withFileTypes: true})

  // Create an object with output names as keys and entry points as values
  return dirNames
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
}

export function hasArg(argv: any[], key: string): boolean {
  return argv.includes(key)
}

async function collectEntryPoints() {
  // Create an object with output names as keys and entry points as values
  return (await collectFolders("./src/components")).reduce(
    (acc: Record<string, string>, name) => {
      acc[`components/${name}/index`] = `./src/components/${name}/index.ts`
      return acc
    },
    {
      index: "./src/index.ts",
    },
  )
}

async function main(argv: string[]) {
  const buildOpts: BuildOptions = {
    bundle: true,
    external: ["react", "react-dom"],
    entryPoints: await collectEntryPoints(),
    minify: true,
    outdir: "dist",
    platform: "node",
    sourcemap: true,
    target: "es2023",
    tsconfig: "tsconfig.json",
  }

  const watch = hasArg(argv, "--watch")

  await Promise.all([
    build({
      ...buildOpts,
      format: "cjs",
      logLevel: "silent",
      outExtension: {".js": ".cjs"},
    }),
    build({
      ...buildOpts,
      format: "esm",
      logLevel: watch ? "error" : "warning",
    }),
  ])
}

main(process.argv)
