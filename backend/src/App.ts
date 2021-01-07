import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Container } from 'inversify';
import { AppModule } from './shared/infrastructure/framework/nestjs/app.module';

export class App {
    public readonly container: Container;
    private readonly framework: INestApplication;

    private constructor(container: Container, framework: any) {
        this.container = container;
        this.framework = framework;
    }

    public static async create(): Promise<App> {
        const container = new Container();
        const framework = await NestFactory.create(AppModule, { cors: true });

        return new App(container, framework);
    }

    public async initializeHttpAsync(): Promise<void> {
        this.framework.listen(3000);
    }
}
