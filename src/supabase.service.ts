import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import consola from "consola";

export class SupabaseService {
	private static anonClient: SupabaseClient;

	public static init = (): void => {
		this.anonClient = createClient(
			process.env.SUPABASE_URL,
			process.env.SUPABASE_SERVICE_KEY
		);
		consola.info("Supabase Service initiated successfully!");
	};

	public static getSupabase = (access_token?: string): SupabaseClient => {
		if (access_token) {
			return createClient(
				process.env.SUPABASE_URL,
				process.env.SUPABASE_ANON_KEY,
				{
					global: {
						headers: {
							authorization: `Bearer ${access_token}`,
						},
					},
				}
			);
		}

		if (!this.anonClient) {
			this.init();
		}

		return this.anonClient;
	};
}
