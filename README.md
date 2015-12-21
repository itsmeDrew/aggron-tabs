# Aggron Tabs
#####A simple jQuery tab animation
######WIP

###Usage

* Copy aggron-tabs.js and aggron-tabs.css to your project
* Include Aggron CSS `<link rel="stylesheet" href="[yourpath]/aggron-tabs.css">`
* Include Aggron JS `<script src="[yourpath]/aggron-tabs.js"></script>`
* Include script to initialize the tabs plugin `$('.js-tab-selector').aggronTabs();`

###Markup

```
<div class="js-tab-selector tabs">
  <ul>
    <li><a href="#tab-1">Tab One</a></li>
    <li><a href="#tab-2">Tab Two</a></li>
    <li><a href="#tab-3">Tab Three</a></li>
  </ul>
  <div class="tabs-content">
    <div id="tab-1">
      <h2>tab 1</h2>
    </div>
    <div id="tab-2">
      <h2>tab 2</h2>
    </div>
    <div id="tab-3">
      <h2>tab 3</h2>
    </div>
  </div>
</div>
```

###Options
######Defaults to fade

* Fade `$('.js-tab-selector').aggronTabs({effect: 'fade'});`
* Scale `$('.js-tab-selector').aggronTabs({effect: 'scale'});`
