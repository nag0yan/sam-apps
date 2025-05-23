import * as esbuild from "esbuild";

const appName = "upload-photo";

esbuild
	.build({
		entryPoints: ["src/app.ts"],
		bundle: true,
		outfile: "dist/app.js",
		minify: true,
		sourcemap: true,
		platform: "node",
		target: "es2022",
	})
	.then(() => {
		console.info(`Build completed: ${appName}`);
	})
	.catch((error) => {
		console.error(`Build failed: ${appName}`);
		console.error(error);
		process.exit(1);
	})
	.finally(() => {
		console.info(`Build process finished: ${appName}`);
	});
