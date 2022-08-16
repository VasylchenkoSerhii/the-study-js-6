import axios from 'axios';
import {refs} from './refs';
import { currentPage } from '../index';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '29316725-1ab556a3c68a6bc4eeec3eacb';
export const PAGE_SIZE = 40;




export async function fetchImages() {
    try {
        const response = await axios.get(`${BASE_URL}/?key=${KEY}&q=${refs.input.value}&lang=en&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PAGE_SIZE}&page=${currentPage}`);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};
