import { expect, test } from '../../../fixtures';

interface Product {
  id: string;
  [key: string]: unknown; 
}

interface ProductsResponse {
  data: Product[];
  per_page: number;
  total: number;
  [key: string]: unknown; 
}

test('Verify 20 products are displayed (mocked)', async ({ loggedInApplication, page }) => {
  await page.route('https://api.practicesoftwaretesting.com/products*', async route => {
    const response = await route.fetch();
    const json = (await response.json()) as ProductsResponse;

 if (json.data && Array.isArray(json.data) && json.data.length > 0) {
      const items = json.data;
      
      json.data = Array.from({ length: 20 }, (_, i) => ({
        ...items[i % items.length],
        id: `${items[i % items.length].id}-${i}` 
      }));
      
      json.per_page = 20;
      json.total = 20; 
    }
    
    await route.fulfill({ response, json });
  });

  await loggedInApplication.allPages.homePage.navigate();
  await expect(loggedInApplication.allPages.homePage.productNames).toHaveCount(20);
});
