import { test, expect } from '@playwright/test';

test.describe('Introvert/Extrovert Test - Full Workflow', () => {
  test('should complete full test workflow and show results', async ({ page }) => {
    // Step 1: Navigate to the Introvert/Extrovert Test page
    await page.goto('/test/introvert-extrovert-test');

    // Verify landing page elements
    await expect(page.getByRole('heading', { name: 'Introvert/Extrovert Test' })).toBeVisible();
    await expect(page.getByText('Discover where you fall on the introvert-extrovert spectrum')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start Test' })).toBeVisible();

    // Step 2: Click Start Test button
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Verify test has started (first question indicator visible)
    await expect(page.getByText('1/20')).toBeVisible();

    // Step 3: Answer all 20 questions
    const totalQuestions = 20;

    for (let i = 0; i < totalQuestions; i++) {
      // Verify current question number in header
      await expect(page.getByText(`${i + 1}/${totalQuestions}`)).toBeVisible();

      // Click answer button (value "3" - Neutral)
      const answerButton = page.locator('button').filter({ hasText: '3' }).first();
      await answerButton.waitFor({ state: 'visible' });
      await answerButton.click();

      // For the last question, wait a bit for the "View Results" button
      if (i === totalQuestions - 1) {
        await page.waitForTimeout(200);
      } else {
        // Wait for transition to next question
        await page.waitForTimeout(150);
      }
    }

    // Step 4: Click View Results button
    const viewResultsButton = page.getByRole('button', { name: /View Results/i });
    await expect(viewResultsButton).toBeVisible();
    await viewResultsButton.click();

    // Step 5: Verify navigation to result page
    await page.waitForURL('**/test/introvert-extrovert-test/result/**');

    // Step 6: Verify result page elements
    await expect(page.getByText('Your Personality Type')).toBeVisible();

    // Check for extroversion score display
    await expect(page.getByText('Extroversion Score')).toBeVisible();

    // Verify result type is shown (Introvert, Ambivert, Extrovert, etc.)
    await expect(
      page.getByText(/Strong Introvert|Introvert|Ambivert|Extrovert|Strong Extrovert/).first()
    ).toBeVisible({ timeout: 5000 });

    // Verify localStorage was used correctly
    const storedAnswers = await page.evaluate(() => {
      return localStorage.getItem('introvertExtrovertAnswers');
    });
    expect(storedAnswers).not.toBeNull();

    const parsedAnswers = JSON.parse(storedAnswers!);
    expect(Object.keys(parsedAnswers).length).toBe(totalQuestions);
  });
});
