import { test, expect } from '@playwright/test';

let token: string;
test('authenticate user with valid credentials', async ({ request }) => {
    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: 'customer2@practicesoftwaretesting.com',
            password: 'welcome01'
        }
    });
    const jsonData = await response.json();
    token = jsonData.access_token;
});