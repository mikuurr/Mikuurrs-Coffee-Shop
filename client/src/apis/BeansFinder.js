import axios from "axios";
import MockAdapter from 'axios-mock-adapter';

let apiInstance = axios.create({
    baseURL: "https://mikuurrscoffeeshop.onrender.com"
});

let mock = null;

if(process.env.NODE_ENV === 'test') {
    mock = new MockAdapter(apiInstance);
    mock.onGet('/').reply(200, {beans: [] });
} 

const exportedObject = { apiInstance };
if (mock) {
    exportedObject.mock = mock;
}

export default exportedObject;