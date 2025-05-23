import * as esbuild from "esbuild";
function main() {
	const feature = process.argv[2];
	if (feature == null) {
		console.error("Please specify a feature to build.");
		process.exit(1);
	}
	esbuild
		.build({
			entryPoints: [`src/${feature}.ts`],
			bundle: true,
			outfile: `dist/${feature}.js`,
			minify: true,
			sourcemap: true,
			platform: "node",
			target: "es2022",
		})
		.then(() => {
			console.info(`Build completed: ${feature}`);
		})
		.catch((error) => {
			console.error(`Build failed: ${feature}`);
			console.error(error);
			process.exit(1);
		})
		.finally(() => {
			console.info(`Build process finished: ${feature}`);
		});
}

if (require.main === module) {
	main();
}
