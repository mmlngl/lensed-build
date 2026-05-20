import { env } from "cloudflare:workers";
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

export class WorkerEnv extends Context.Service<WorkerEnv, Cloudflare.Env>()(
	"Web/WorkerEnv",
) {
	static layerFromConfig = (envConfig: Cloudflare.Env) =>
		Layer.succeed(WorkerEnv, envConfig);
	static layerFromEnv = Layer.succeed(WorkerEnv, env);
}
