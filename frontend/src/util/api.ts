/**
 * Utilities for intercepting API requests and responses.
 */
import axios from 'axios';
import { API_URL } from '../config'
// import dotenv from 'dotenv';

// console.log(dotenv.config());

/**
 * Subscribe a callback for intercepting requests or responses and changing its configuration properties.
 *
 * @param interceptor Interceptor function, it takes and returns an `InternalAxiosRequestConfig`.
 * @returns An unsubscribe function.
 */
export default axios.create({
    baseURL: API_URL
});