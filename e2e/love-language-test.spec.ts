import { test, expect } from '@playwright/test';

test.describe('Love Language Test - Full Workflow', () => {
  test('should complete full test workflow and show results', async ({ page }) => {
    // Step 1: Navigate to the Love Language Test page
    await page.goto('/test/love-language-test');

    // Verify landing page elements
    await expect(page.getByRole('heading', { name: 'Love Language Test' })).toBeVisible();
    await expect(page.getByText('Discover how you prefer to give and receive love')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start Test' })).toBeVisible();

    // Step 2: Click Start Test button
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Verify test has started
    await expect(page.getByText('Which do you prefer?')).toBeVisible();

    // Step 3: Answer all 30 questions (A/B choice format)
    const totalQuestions = 30;

    for (let i = 0; i < totalQuestions; i++) {
      // Wait for question text to be stable
      await page.waitForTimeout(200);

      // Click option A for each question
      const optionA = page.locator('button').filter({ hasText: /^A\./ }).first();
      await optionA.waitFor({ state: 'visible' });
      await optionA.click();
    }

    // Wait for the View Results button to appear after last question
    await page.waitForTimeout(500);

    // Step 4: Click View Results button (appears after answering last question)
    const viewResultsButton = page.getByRole('button', { name: /View Results/i });
    await expect(viewResultsButton).toBeVisible({ timeout: 10000 });
    await viewResultsButton.click();

    // Step 5: Verify navigation to result page
    await page.waitForURL('**/test/love-language-test/result/**');

    // Step 6: Verify result page elements
    await expect(page.getByText('Your Love Language Results')).toBeVisible();
    await expect(page.getByText('Primary Love Language')).toBeVisible();
    await expect(page.getByText('Secondary Love Language', { exact: true })).toBeVisible();

    // Verify one of the love languages is shown
    await expect(
      page.getByText(/Words of Affirmation|Acts of Service|Receiving Gifts|Quality Time|Physical Touch/).first()
    ).toBeVisible({ timeout: 5000 });

    // Verify localStorage was used correctly
    const storedAnswers = await page.evaluate(() => {
      return localStorage.getItem('loveLanguageAnswers');
    });
    expect(storedAnswers).not.toBeNull();

    const parsedAnswers = JSON.parse(storedAnswers!);
    expect(Object.keys(parsedAnswers).length).toBe(totalQuestions);
  });
});
