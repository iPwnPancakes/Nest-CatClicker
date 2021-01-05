import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export class NestFacade {
    private static instance: INestApplication;

    public static async getApplication(): Promise<INestApplication> {
        if (!NestFacade.instance) {
            NestFacade.instance = await NestFactory.create(AppModule, {
                cors: true,
                
            });
        }

        return NestFacade.instance;
    }
}
