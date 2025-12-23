# NRLADashboard

## Project summary
NRLADashboard is an Angular application that surfaces key dashboard information and live weather context for its widgets. The project is built with [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4 and uses Angular Material styling to present cards and chips that update in real time.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add the required runtime configuration (see **Weather API configuration** below).
3. Start the development server:
   ```bash
   ng serve
   # or
   npm start
   ```
4. Open `http://localhost:4200/` in your browser. The app auto-reloads when files change.

## Weather API configuration
Weather and temperature chips require an OpenWeather API key. Before running `ng serve` or `npm start`, create a JSON file at `src/configs/appconfig.json` with the following structure:

```json
{
  "openWeatherAccessToken": "API_KEY"
}
```

- Replace `API_KEY` with a valid OpenWeather key. You can obtain a free-tier key by creating an account at https://home.openweathermap.org/users/sign_up.
- The key enables the app to fetch current weather details and keep the related dashboard chips updated. API documentation: https://docs.openweather.co.uk/current.

## Useful Angular CLI commands

- Generate a component:
  ```bash
  ng generate component component-name
  ```
- List available schematics (components, directives, pipes, etc.):
  ```bash
  ng generate --help
  ```

## Building
Build the production bundle into `dist/`:

```bash
ng build
```

Production builds are optimized for performance and speed by default.
