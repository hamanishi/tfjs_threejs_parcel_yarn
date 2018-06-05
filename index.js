// parcl hack hmr js
if (module.hot) {module.hot.accept(() => {window.location.reload();});}

// styles
import styles from './css/master.scss';

// instances
import WebGLApp from './js/app';

//-------------------------------------------------------------------------------

// init module
var canvas = document.getElementById('app');
var app = new WebGLApp();
app.main(canvas);