import { test, expect } from '@playwright/test';

test.describe('Emotional Intelligence Test - Full Workflow', () => {
  test.setTimeout(120000);

  test('should complete the entire EQ test and show results', async ({ page }) => {
    // 1. Navigate to the test page
    await page.goto('/test/emotional-intelligence-test/');

    // 2. Verify landing page elements
    await expect(page.locator('h1')).toContainText(/Emotional Intelligence|EQ/i);
    await expect(page.getByRole('button', { name: 'Start Test' })).toBeVisible();

    // 3. Start the test
    await page.getByRole('button', { name: 'Start Test' }).click();

    // 4. Verify test started - "Question 1 / 25" format
    await expect(page.locator('text=Question 1 /')).toBeVisible();

    // 5. Get total questions
    const progressText = await page.locator('text=/Question \\d+ \\/ \\d+/').first().textContent();
    const totalMatch = progressText?.match(/\/ (\d+)/);
    const totalQuestions = totalMatch ? parseInt(totalMatch[1]) : 25;

    // 6. Answer all questions by clicking "Neutral" option
    for (let i = 0; i < totalQuestions; i++) {
      await page.waitForTimeout(200);

      const neutralOption = page.locator('button').filter({ hasText: 'Neutral' });
      await neutralOption.waitFor({ state: 'visible' });
      await neutralOption.click({ force: true });
    }

    // 7. View Results button should appear
    await page.waitForTimeout(500);
    const viewResultsButton = page.getByRole('button', { name: 'View Results' });
    await viewResultsButton.waitFor({ state: 'visible', timeout: 10000 });
    await viewResultsButton.click();

    // 8. Verify navigation to result page
    await expect(page).toHaveURL(/\/test\/emotional-intelligence-test\/result\/?/);

    // 9. Verify result page shows EQ categories
    await expect(page.locator('text=/Self-Awareness|Empathy|Social Skills|Emotional/i').first()).toBeVisible({ timeout: 10000 });

    // 10. Verify share functionality exists
    await expect(page.getByRole('button', { name: /copy|share/i })).toBeVisible();

    // 11. Verify related tests section exists
    await expect(page.locator('text=/People Like You Also Took|Related Tests|You Might Also Like/i')).toBeVisible();
  });

  test('should persist answers in localStorage', async ({ page }) => {
    await page.goto('/test/emotional-intelligence-test/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    const progressText = await page.locator('text=/Question \\d+ \\/ \\d+/').first().textContent();
    const totalMatch = progressText?.match(/\/ (\d+)/);
    const totalQuestions = totalMatch ? parseInt(totalMatch[1]) : 25;

    for (let i = 0; i < totalQuestions; i++) {
      await page.waitForTimeout(200);
      const neutralOption = page.locator('button').filter({ hasText: 'Neutral' });
      await neutralOption.waitFor({ state: 'visible' });
      await neutralOption.click({ force: true });
    }

    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'View Results' }).click();

    const answers = await page.evaluate(() => localStorage.getItem('eqTestAnswers'));
    expect(answers).not.toBeNull();
    const parsed = JSON.parse(answers!);
    expect(Object.keys(parsed).length).toBe(totalQuestions);
  });

  test('should navigate between questions using Previous/Next buttons', async ({ page }) => {
    await page.goto('/test/emotional-intelligence-test/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    await expect(page.locator('text=Question 1 /')).toBeVisible();

    const prevButton = page.getByRole('button', { name: 'Previous' });
    await expect(prevButton).toBeDisabled();

    await page.locator('button').filter({ hasText: 'Neutral' }).click({ force: true });
    await page.waitForTimeout(200);

    await expect(page.locator('text=Question 2 /')).toBeVisible();
    await expect(prevButton).toBeEnabled();

    await prevButton.click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=Question 1 /')).toBeVisible();
  });
});
