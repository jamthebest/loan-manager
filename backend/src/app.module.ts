import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { LoansModule } from './loans/loans.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/loanapp'), UsersModule, ContactsModule, LoansModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
