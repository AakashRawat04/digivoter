import consola from "consola";
import "dotenv/config";
import { ZodError, z } from "zod";

const configSchema = z.object({
	PORT: z
		.string()
		.regex(/^\d{4,5}$/)
		.optional()
		.default("3000"),
	SUPABASE_URL: z.string().url(),
	SUPABASE_SERVICE_KEY: z.string(),
	SUPABASE_ANON_KEY: z.string(),
});

try {
	configSchema.parse(process.env);
} catch (error) {
	if (error instanceof ZodError) {
		consola.error(error.errors);
	}
	process.exit(1);
}

export type Env = z.infer<typeof configSchema>;
