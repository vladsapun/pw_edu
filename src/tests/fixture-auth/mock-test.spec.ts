import { expect, test } from '../../../fixtures';

test('Verify 20 products are displayed (mocked)', async ({ loggedInApplication, page }) => {
  await page.route('https://api.practicesoftwaretesting.com/products*', async route => {
    const response = await route.fetch();
    const json = await response.json();

 if (json.data && Array.isArray(json.data) && json.data.length > 0) {
      const items = json.data;
      
      // Генерируем массив из 20 элементов на основе json.data
      json.data = Array.from({ length: 20 }, (_, i) => ({
        ...items[i % items.length],
        id: `${items[i % items.length].id}-${i}` // Уникальный ID для Angular
      }));
      
      // Обновляем метаданные пагинации для фронтенда
      json.per_page = 20;
      json.total = 20; 
    }
    
    await route.fulfill({ response, json });
  });

  await loggedInApplication.allPages.homePage.navigate();
  await expect(loggedInApplication.allPages.homePage.productNames).toHaveCount(20);
});
