import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { BarberModule } from './barber/barber.module';
import { ServiceModule } from './service/service.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('USERNAME:', config.get('DB_USERNAME'));
        console.log('PASSWORD:', config.get('DB_PASSWORD'));
        console.log('CONNECT:', config.get('DB_CONNECT_STRING'));

        return {
          type: 'oracle',
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          connectString: config.get<string>('DB_CONNECT_STRING'),

          autoLoadEntities: true,
          synchronize: true, 
          logging: true,
        };
      },
    }),

    AuthModule,
    UsersModule,
    BookingsModule,
    BarberModule,
    ServiceModule,
    NotificationsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}