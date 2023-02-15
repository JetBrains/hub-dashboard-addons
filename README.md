# hub-dashboard-addons ![JetBrains Official](https://camo.githubusercontent.com/50846ec406bb3478f0eb9a94d78bc6f042f4de44c4830385f8e5d462edf01abe/68747470733a2f2f6a622e67672f6261646765732f6f6666696369616c2d666c61742d7371756172652e737667)
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

