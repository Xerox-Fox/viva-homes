import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthGuard, AuthModule } from '@mguay/nestjs-better-auth';
import { betterAuth } from "better-auth";
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { DATABASE_CONNECTION } from './database/database-connection';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    AuthModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (database) => ({
        auth: betterAuth({
          database: drizzleAdapter(
            database as NodePgDatabase,
            {
              provider: 'pg',
            },
          ),
        }),
      }),
      inject: [DATABASE_CONNECTION],
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
