import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { PlayerModule } from './player/player.module';
import { InventoryModule } from './inventory/inventory.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
  TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'game_trade',
  password: 'game_trade_pass',
  database: 'game_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}),
  ItemsModule,
  PlayerModule,
  InventoryModule,
  AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


