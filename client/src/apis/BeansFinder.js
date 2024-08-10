import axios from "axios";
import MockAdapter from 'axios-mock-adapter';

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/beans"
});

let mock = null;

if (process.env.NODE_ENV === 'test') {
  mock = new MockAdapter(apiInstance);
  mock.onGet('/beans').reply(200, { beans: [] });
}

const exportedObject = { apiInstance };
if (mock) {
  exportedObject.mock = mock;
}

export default exportedObject;
