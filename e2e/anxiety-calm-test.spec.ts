import { test, expect } from '@playwright/test';

test.describe('Anxiety vs Calm Test - Full Workflow', () => {
  test('should complete full test workflow and show results', async ({ page }) => {
    // Step 1: Navigate to the Anxiety vs Calm Test page
    await page.goto('/test/anxiety-calm-test');

    // Verify landing page elements
    await expect(page.getByRole('heading', { name: 'Anxiety vs Calm Test' })).toBeVisible();
    await expect(page.getByText('Discover your natural stress response tendencies')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start Test' })).toBeVisible();

    // Step 2: Click Start Test button
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Verify test has started (first question visible)
    await expect(page.getByText('Q1')).toBeVisible();
    await expect(page.getByText('1/30')).toBeVisible();

    // Step 3: Answer all 30 questions
    const totalQuestions = 30;

    for (let i = 0; i < totalQuestions; i++) {
      // Verify current question number
      await expect(page.getByText(`Q${i + 1}`)).toBeVisible();

      // Click answer button (value "3" - Sometimes)
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
    await page.waitForURL('**/test/anxiety-calm-test/result/**');

    // Step 6: Verify result page elements
    await expect(page.getByRole('heading', { name: 'Your Stress Response Style' })).toBeVisible();

    // Check for tendency score display
    await expect(page.getByText(/Tendency Score:/i)).toBeVisible();

    // Verify result type is shown (Very Calm, Calm, Balanced, Anxious, or Very Anxious)
    await expect(
      page.getByText(/Very Calm|Calm|Balanced|Very Anxious|Anxious/).first()
    ).toBeVisible({ timeout: 5000 });

    // Verify localStorage was used correctly
    const storedAnswers = await page.evaluate(() => {
      return localStorage.getItem('anxietyCalmAnswers');
    });
    expect(storedAnswers).not.toBeNull();

    const parsedAnswers = JSON.parse(storedAnswers!);
    expect(Object.keys(parsedAnswers).length).toBe(totalQuestions);
  });
});
