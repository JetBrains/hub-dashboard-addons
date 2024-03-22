# hub-dashboard-addons [![official JetBrains project](https://jb.gg/badges/official.svg)](https://confluence.jetbrains.com/display/ALL/JetBrains+on+GitHub)
A library that provides Hub dashboard API for creating custom widgets.

## Installation

### NPM
* `npm install hub-dashboard-addons`

### CDN
```html
    <!-- Optional: default styles of dashboard widgets -->
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/hub-dashboard-addons@latest/dashboard.css">
    <!-- Include dashboard connector from CDN -->
    <script src="https://unpkg.com/hub-dashboard-addons@latest"></script>
```

## USAGE
```js
// Would be just window.DashboardAddons if included from CDN
import DashboardAddons from 'hub-dashboard-addons';
// Optional, if use webpack with css-loader
import 'hub-dashboard-addons/dashboard.css';

DashboardAddons.registerWidget((dashboardApi, registerWidgetApi) => {
  registerWidgetApi({
    onRefresh: () => {
      console.log('refresh');
      dashboardApi.setTitle('Refreshed');
    }
  });
});
```

