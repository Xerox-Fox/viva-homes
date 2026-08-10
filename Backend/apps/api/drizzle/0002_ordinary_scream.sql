ALTER TABLE "properties" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "listingtype" text NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "subcity" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "longitude" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "latitude" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "bedrooms" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "bathrooms" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "area" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "status" text DEFAULT 'available' NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "location";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "price_per_night";