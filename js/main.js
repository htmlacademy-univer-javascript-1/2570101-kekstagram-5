import './form.js';
import { setUserFormSubmit } from './form.js';
import { closeBigPhoto } from './rendering-image.js';
import { fetchAndRenderData } from './get-data.js';

fetchAndRenderData();
setUserFormSubmit(closeBigPhoto);
