//import => export_name.js
import {a,b,z} from './export_name.js';   
console.log (`export_name.js 가져온 변수 ${ a } ${ b } ${ z }`);

import * as myX from './export_name.js';   
console.log (`export_name.js 가져온 변수 ${ myX.a } ${ myX.b } ${ myX.z }`);
