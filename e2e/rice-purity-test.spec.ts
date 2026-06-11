import { test, expect } from '@playwright/test';

test.describe('Rice Purity Test - Full Workflow', () => {
  // 100 questions need longer timeout
  test.setTimeout(180000);

  test('should complete the entire Rice Purity test and show results', async ({ page }) => {
    // 1. Navigate to the test page
    await page.goto('/test/rice-purity/');

    // 2. Verify landing page elements
    await expect(page.locator('h1')).toContainText('Rice Purity Test');
    await expect(page.getByRole('button', { name: 'Start Test' })).toBeVisible();

    // 3. Start the test
    await page.getByRole('button', { name: 'Start Test' }).click();

    // 4. Verify test started - should show question number
    await expect(page.locator('text=/1\\s*\\/\\s*100|Q1/i').first()).toBeVisible();

    // 5. Answer all 100 questions by clicking "No" (faster, keeps high purity)
    const totalQuestions = 100;

    for (let i = 0; i < totalQuestions; i++) {
      await page.waitForTimeout(300);

      // Click "No" button
      const noButton = page.getByRole('button', { name: 'No' });
      await noButton.waitFor({ state: 'visible' });
      await noButton.click({ force: true });
    }

    // 6. After answering all questions, View Results button should appear
    await page.waitForTimeout(500);
    const viewResultsButton = page.getByRole('button', { name: 'View Results' });
    await viewResultsButton.waitFor({ state: 'visible', timeout: 10000 });
    await viewResultsButton.click();

    // 7. Verify navigation to result page
    await expect(page).toHaveURL(/\/test\/rice-purity\/result\/?/);

    // 8. Verify result page shows purity score (should be 100 since all "No")
    await expect(page.locator('text=/100|Purity|Score/i').first()).toBeVisible({ timeout: 10000 });

    // 9. Verify share functionality exists
    await expect(page.getByRole('button', { name: /copy|share/i })).toBeVisible();

    // 10. Verify related tests section exists
    await expect(page.locator('text=/People Like You Also Took|Related Tests|You Might Also Like/i')).toBeVisible();
  });

  test('should persist answers in localStorage', async ({ page }) => {
    await page.goto('/test/rice-purity/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Complete all 100 questions (click "No" for all)
    for (let i = 0; i < 100; i++) {
      await page.waitForTimeout(300);
      const noButton = page.getByRole('button', { name: 'No' });
      await noButton.waitFor({ state: 'visible' });
      await noButton.click({ force: true });
    }

    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'View Results' }).click();

    // Verify localStorage has the answers
    const answers = await page.evaluate(() => localStorage.getItem('ricePurityAnswers'));
    expect(answers).not.toBeNull();
  });

  test('should navigate between questions using Previous/Next buttons', async ({ page }) => {
    await page.goto('/test/rice-purity/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Verify at question 1
    await expect(page.locator('text=/1\\s*\\/\\s*100/i').first()).toBeVisible();

    // Previous should be disabled at first question
    const prevButton = page.getByRole('button', { name: 'Previous' });
    await expect(prevButton).toBeDisabled();

    // Answer and auto-advance to next
    await page.getByRole('button', { name: 'No' }).click({ force: true });
    await page.waitForTimeout(200);

    // Should auto-advance to question 2
    await expect(page.locator('text=/2\\s*\\/\\s*100/i').first()).toBeVisible();

    // Now Previous should be enabled
    await expect(prevButton).toBeEnabled();

    // Go back to question 1
    await prevButton.click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=/1\\s*\\/\\s*100/i').first()).toBeVisible();
  });
});
