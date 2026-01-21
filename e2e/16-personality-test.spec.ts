import { test, expect } from '@playwright/test';

test.describe('16 Personality Test - Full Workflow', () => {
  // Increase timeout for many questions
  test.setTimeout(120000);

  test('should complete the entire 16 Personality test and show results', async ({ page }) => {
    // 1. Navigate to the test page
    await page.goto('/test/16-personality-test/');

    // 2. Verify landing page elements
    await expect(page.locator('h1')).toContainText('16 Personality');
    await expect(page.getByRole('button', { name: 'Start Test' })).toBeVisible();

    // 3. Start the test
    await page.getByRole('button', { name: 'Start Test' }).click();

    // 4. Verify test started - should show Q1.
    await expect(page.locator('text=Q1.')).toBeVisible();

    // 5. Answer all questions by clicking option A each time
    // First, find total questions from the page
    const progressText = await page.locator('text=/\\d+\\s*\\/\\s*\\d+/').first().textContent();
    const totalMatch = progressText?.match(/\/\s*(\d+)/);
    const totalQuestions = totalMatch ? parseInt(totalMatch[1]) : 60;

    for (let i = 0; i < totalQuestions; i++) {
      // Wait for transition to complete
      await page.waitForTimeout(200);

      // Click on option A
      const optionA = page.locator('button').filter({ hasText: /^A\./ }).first();
      await optionA.waitFor({ state: 'visible' });
      await optionA.click({ force: true });
    }

    // 6. After answering all questions, View Results button should appear
    await page.waitForTimeout(500);
    const viewResultsButton = page.getByRole('button', { name: 'View Results' });
    await viewResultsButton.waitFor({ state: 'visible', timeout: 10000 });
    await viewResultsButton.click();

    // 7. Verify navigation to result page
    await expect(page).toHaveURL(/\/test\/16-personality-test\/result\/?/);

    // 8. Verify result page shows a 4-letter type code (e.g., ESTJ, INFP)
    await expect(page.locator('text=/[EI][SN][TF][JP]/').first()).toBeVisible({ timeout: 10000 });

    // 9. Verify 4 dimensions are shown
    await expect(page.locator('text=/Extraversion|Introversion/i').first()).toBeVisible();
    await expect(page.locator('text=/Sensing|Intuition/i').first()).toBeVisible();
    await expect(page.locator('text=/Thinking|Feeling/i').first()).toBeVisible();
    await expect(page.locator('text=/Judging|Perceiving/i').first()).toBeVisible();

    // 10. Verify share functionality exists
    await expect(page.getByRole('button', { name: /copy|share/i })).toBeVisible();

    // 11. Verify related tests section exists
    await expect(page.locator('text=/People Like You Also Took|Related Tests|You Might Also Like/i')).toBeVisible();
  });

  test('should persist answers in localStorage', async ({ page }) => {
    await page.goto('/test/16-personality-test/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Get total questions
    const progressText = await page.locator('text=/\\d+\\s*\\/\\s*\\d+/').first().textContent();
    const totalMatch = progressText?.match(/\/\s*(\d+)/);
    const totalQuestions = totalMatch ? parseInt(totalMatch[1]) : 60;

    // Complete all questions
    for (let i = 0; i < totalQuestions; i++) {
      await page.waitForTimeout(200);
      const optionA = page.locator('button').filter({ hasText: /^A\./ }).first();
      await optionA.waitFor({ state: 'visible' });
      await optionA.click({ force: true });
    }

    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'View Results' }).click();

    // Verify localStorage has the answers
    const answers = await page.evaluate(() => localStorage.getItem('personalityTypeAnswers'));
    expect(answers).not.toBeNull();
    const parsed = JSON.parse(answers!);
    expect(Object.keys(parsed).length).toBe(totalQuestions);
  });

  test('should navigate between questions using Previous/Next buttons', async ({ page }) => {
    await page.goto('/test/16-personality-test/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Verify at question 1
    await expect(page.locator('text=Q1.')).toBeVisible();

    // Previous should be disabled at first question
    const prevButton = page.getByRole('button', { name: 'Previous' });
    await expect(prevButton).toBeDisabled();

    // Answer and auto-advance to next
    await page.locator('button').filter({ hasText: /^A\./ }).first().click({ force: true });
    await page.waitForTimeout(200);

    // Should auto-advance to question 2
    await expect(page.locator('text=Q2.')).toBeVisible();

    // Now Previous should be enabled
    await expect(prevButton).toBeEnabled();

    // Go back to question 1
    await prevButton.click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=Q1.')).toBeVisible();
  });
});
