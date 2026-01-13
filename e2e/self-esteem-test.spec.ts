import { test, expect } from '@playwright/test';

test.describe('Self-Esteem Test - Full Workflow', () => {
  test('should complete full test workflow and show results', async ({ page }) => {
    // Step 1: Navigate to the Self-Esteem Test page
    await page.goto('/test/self-esteem-test');

    // Verify landing page elements
    await expect(page.getByRole('heading', { name: 'Self-Esteem Test' })).toBeVisible();
    await expect(page.getByText('Measure your self-esteem and self-confidence level')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start Test' })).toBeVisible();

    // Step 2: Click Start Test button
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Verify test has started (first question visible)
    await expect(page.getByText('Q1')).toBeVisible();
    await expect(page.getByText('1/25')).toBeVisible();

    // Step 3: Answer all 25 questions
    const totalQuestions = 25;

    for (let i = 0; i < totalQuestions; i++) {
      // Verify current question number
      await expect(page.getByText(`Q${i + 1}`)).toBeVisible();

      // Click answer button (value "3" - Agree)
      // Wait for the button to be stable before clicking
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
    await page.waitForURL('**/test/self-esteem-test/result/**');

    // Step 6: Verify result page elements
    // Check for result heading/score display
    await expect(page.getByText(/Self-Esteem/i).first()).toBeVisible();

    // Check for score or percentage display
    const scoreElement = page.locator('text=/\\d+/').first();
    await expect(scoreElement).toBeVisible();

    // Verify result sections are present
    await expect(page.getByText(/What This/i).or(page.getByText(/Typically Means/i)).first()).toBeVisible({ timeout: 5000 });

    // Verify localStorage was used correctly
    const storedAnswers = await page.evaluate(() => {
      return localStorage.getItem('selfEsteemAnswers');
    });
    expect(storedAnswers).not.toBeNull();

    const parsedAnswers = JSON.parse(storedAnswers!);
    expect(Object.keys(parsedAnswers).length).toBe(totalQuestions);
  });
});
