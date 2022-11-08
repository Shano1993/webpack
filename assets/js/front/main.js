import data2, {data1} from "../common/data";
import '../../styles/front-style.css';
import logo from '../../images/mon-image.png';

console.log('Hello webpack');
console.log('Coucou');

data1.describe();

const img = document.createElement('img');
img.src = logo;