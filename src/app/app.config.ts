import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TaskGateway } from './core/ports/task.gateway';
import { InMemoryTaskGateway } from './core/adapters/in-memory-task.gateway';
import { TaskBuilder } from './core/models/builders/task.builder';
import { LocalStorageTaskGateway } from './core/adapters/local-storage.gateway';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: TaskGateway,
      useFactory: () => new LocalStorageTaskGateway(),
    },
  ],
};
