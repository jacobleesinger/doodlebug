CREATE TABLE IF NOT EXISTS "memories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid,
	"slug" text NOT NULL,
	"caption" text,
	"imageUrl" text NOT NULL,
	"imageAltText" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "memories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memories" ADD CONSTRAINT "memories_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
