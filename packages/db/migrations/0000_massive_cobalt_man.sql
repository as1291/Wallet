CREATE TYPE "public"."auth_type" AS ENUM('Google', 'Github');--> statement-breakpoint
CREATE TYPE "public"."on_ramp_status" AS ENUM('Success', 'Failure', 'Processing');--> statement-breakpoint
CREATE TABLE "balances" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"locked" integer NOT NULL,
	CONSTRAINT "balances_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "merchants" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"auth_type" "auth_type" NOT NULL,
	CONSTRAINT "merchants_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "on_ramp_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "on_ramp_status" NOT NULL,
	"token" text NOT NULL,
	"provider" text NOT NULL,
	"amount" integer NOT NULL,
	"start_time" timestamp NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "on_ramp_transactions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "p2p_transfer" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	"from_user_id" integer NOT NULL,
	"to_user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"name" varchar(255),
	"number" varchar(20) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_number_unique" UNIQUE("number")
);
--> statement-breakpoint
ALTER TABLE "balances" ADD CONSTRAINT "balances_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "on_ramp_transactions" ADD CONSTRAINT "on_ramp_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p2p_transfer" ADD CONSTRAINT "p2p_transfer_from_user_id_users_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p2p_transfer" ADD CONSTRAINT "p2p_transfer_to_user_id_users_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;