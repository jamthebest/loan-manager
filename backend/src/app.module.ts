import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { LoansModule } from './loans/loans.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL || (process.env.MONGODB_HOST && `mongodb://${process.env.MONGODB_HOST}:27017/loanapp`) || 'mongodb://127.0.0.1:27017/loanapp'),
    UsersModule,
    ContactsModule,
    LoansModule,
    PaymentsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule { }
