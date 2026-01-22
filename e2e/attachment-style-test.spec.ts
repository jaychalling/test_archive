import { test, expect } from '@playwright/test';

test.describe('Attachment Style Test - Full Workflow', () => {
  test.setTimeout(120000);

  test('should complete the entire Attachment Style test and show results', async ({ page }) => {
    // 1. Navigate to the test page
    await page.goto('/test/attachment-style-test/');

    // 2. Verify landing page elements
    await expect(page.locator('h1')).toContainText('Attachment Style Test');
    await expect(page.getByRole('button', { name: 'Start Test' })).toBeVisible();

    // 3. Start the test
    await page.getByRole('button', { name: 'Start Test' }).click();

    // 4. Verify test started - should show 1/X format
    await expect(page.locator('text=/1\\/\\d+/')).toBeVisible();

    // 5. Get total questions from the page
    const progressText = await page.locator('text=/\\d+\\/\\d+/').first().textContent();
    const totalMatch = progressText?.match(/\/(\d+)/);
    const totalQuestions = totalMatch ? parseInt(totalMatch[1]) : 30;

    // 6. Answer all questions by clicking option 3 (neutral)
    for (let i = 0; i < totalQuestions; i++) {
      await page.waitForTimeout(200);

      // Click on option "3" (neutral/middle option)
      const option3 = page.locator('button').filter({ hasText: /^3$/ });
      await option3.waitFor({ state: 'visible' });
      await option3.click({ force: true });
    }

    // 7. After answering all questions, View Results button should appear
    await page.waitForTimeout(500);
    const viewResultsButton = page.getByRole('button', { name: 'View Results' });
    await viewResultsButton.waitFor({ state: 'visible', timeout: 10000 });
    await viewResultsButton.click();

    // 8. Verify navigation to result page
    await expect(page).toHaveURL(/\/test\/attachment-style-test\/result\/?/);

    // 9. Verify result page shows attachment style type
    await expect(page.locator('text=/Secure|Anxious|Avoidant|Fearful/i').first()).toBeVisible({ timeout: 10000 });

    // 10. Verify share functionality exists
    await expect(page.getByRole('button', { name: /copy|share/i })).toBeVisible();

    // 11. Verify related tests section exists
    await expect(page.locator('text=/People Like You Also Took|Related Tests|You Might Also Like/i')).toBeVisible();
  });

  test('should persist answers in localStorage', async ({ page }) => {
    await page.goto('/test/attachment-style-test/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Get total questions
    const progressText = await page.locator('text=/\\d+\\/\\d+/').first().textContent();
    const totalMatch = progressText?.match(/\/(\d+)/);
    const totalQuestions = totalMatch ? parseInt(totalMatch[1]) : 30;

    // Complete all questions
    for (let i = 0; i < totalQuestions; i++) {
      await page.waitForTimeout(200);
      const option3 = page.locator('button').filter({ hasText: /^3$/ });
      await option3.waitFor({ state: 'visible' });
      await option3.click({ force: true });
    }

    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'View Results' }).click();

    // Verify localStorage has the answers
    const answers = await page.evaluate(() => localStorage.getItem('attachmentStyleAnswers'));
    expect(answers).not.toBeNull();
    const parsed = JSON.parse(answers!);
    expect(Object.keys(parsed).length).toBe(totalQuestions);
  });

  test('should navigate between questions using Previous/Next buttons', async ({ page }) => {
    await page.goto('/test/attachment-style-test/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Verify at question 1
    await expect(page.locator('text=/1\\/\\d+/')).toBeVisible();

    // Previous should be disabled at first question
    const prevButton = page.getByRole('button', { name: 'Previous' });
    await expect(prevButton).toBeDisabled();

    // Answer and auto-advance to next
    await page.locator('button').filter({ hasText: /^3$/ }).click({ force: true });
    await page.waitForTimeout(200);

    // Should auto-advance to question 2
    await expect(page.locator('text=/2\\/\\d+/')).toBeVisible();

    // Now Previous should be enabled
    await expect(prevButton).toBeEnabled();

    // Go back to question 1
    await prevButton.click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=/1\\/\\d+/')).toBeVisible();
  });
});
