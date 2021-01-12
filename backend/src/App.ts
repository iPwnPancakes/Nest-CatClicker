import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/infrastructure/framework/nestjs/app.module';

export class App {
    private readonly framework: INestApplication;

    private constructor(framework: any) {
        this.framework = framework;
    }

    public static async create(): Promise<App> {
        const framework = await NestFactory.create(AppModule, { cors: true });

        return new App(framework);
    }

    public async initializeHttpAsync(): Promise<void> {
        this.framework.listen(3000);
    }

    get instance(): INestApplication {
        return this.framework;
    }
}
