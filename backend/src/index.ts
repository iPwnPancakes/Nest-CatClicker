import * as dotenv from 'dotenv';
import { App } from './App';

dotenv.config()

async function bootstrap() {
    const app = await App.create();

    app.initializeHttpAsync();
}

bootstrap();
