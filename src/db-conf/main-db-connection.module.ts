import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const MAIN_DB_CONNECTION = Symbol();

@Module({
  providers: [
    {
      provide: MAIN_DB_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<DataSource> => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
        });
        return await dataSource.initialize();
      },
    },
  ],
  exports: [MAIN_DB_CONNECTION],
})
export class MainDbConnectionModule {}
