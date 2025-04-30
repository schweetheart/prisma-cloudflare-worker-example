/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const connectionString =
			'postgresql://prisma-test_owner:npg_K53dBEAXxCes@ep-flat-mouse-a4t436m4-pooler.us-east-1.aws.neon.tech/prisma-test?sslmode=require';

		const adapter = new PrismaPg({ connectionString });
		const prisma = new PrismaClient({ adapter });

		const posts = await prisma.post.findMany();

		return Response.json(posts);
	},
} satisfies ExportedHandler<Env>;
