// styles
import styles from './css/master.scss';

// instances
import WebGLApp from './js/webglapp';

//-------------------------------------------------------------------------------

// init module
var canvas = document.getElementById('app');
var app = new WebGLApp(canvas);