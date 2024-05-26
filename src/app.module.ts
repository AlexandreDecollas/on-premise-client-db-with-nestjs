import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientDbConnectionsModule } from './db-conf/client-db-connections.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientDbConnectionsModule,
  ],
  controllers: [ProductController],
})
export class AppModule {}
