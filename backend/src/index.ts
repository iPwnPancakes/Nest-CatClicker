import { App } from './App';

async function bootstrap() {
    const app = await App.create();

    app.initializeHttpAsync();
}

bootstrap();
