import { test, expect } from '@playwright/test';

test.describe('Big Five Test - Full Workflow', () => {
  // Increase timeout for 50 questions test
  test.setTimeout(120000);

  test('should complete the entire Big Five test and show results', async ({ page }) => {
    // 1. Navigate to the test page
    await page.goto('/test/big-five-test/');

    // 2. Verify landing page elements
    await expect(page.locator('h1')).toContainText('Big Five Personality Test');
    await expect(page.getByRole('button', { name: 'Start Test' })).toBeVisible();

    // 3. Start the test
    await page.getByRole('button', { name: 'Start Test' }).click();

    // 4. Verify test started - should show 1/50
    await expect(page.locator('text=1/50')).toBeVisible();

    // 5. Answer all 50 questions (clicking option 3 - neutral for speed)
    const totalQuestions = 50;

    for (let i = 0; i < totalQuestions; i++) {
      // Wait for transition to complete
      await page.waitForTimeout(200);

      // Click on option "3" (neutral/middle option) with force to bypass transition instability
      const option3 = page.locator('button').filter({ hasText: /^3$/ });
      await option3.waitFor({ state: 'visible' });
      await option3.click({ force: true });
    }

    // 6. After answering all questions, View Results button should appear
    await page.waitForTimeout(300);
    const viewResultsButton = page.getByRole('button', { name: 'View Results' });
    await viewResultsButton.waitFor({ state: 'visible', timeout: 10000 });
    await viewResultsButton.click();

    // 7. Verify navigation to result page
    await expect(page).toHaveURL(/\/test\/big-five-test\/result\/?/);

    // 8. Verify result page elements
    // Should show the 5 OCEAN traits (use first() to avoid strict mode violations)
    await expect(page.getByRole('heading', { name: /Openness/ }).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: /Conscientiousness/ }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Extraversion/ }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Agreeableness/ }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Neuroticism/ }).first()).toBeVisible();

    // 9. Verify share functionality exists
    await expect(page.getByRole('button', { name: /copy|share/i })).toBeVisible();

    // 10. Verify related tests section exists
    await expect(page.locator('text=/People Like You Also Took|Related Tests|You Might Also Like/i')).toBeVisible();
  });

  test('should persist answers in localStorage', async ({ page }) => {
    await page.goto('/test/big-five-test/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Answer first 3 questions
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(200);
      const option4 = page.locator('button').filter({ hasText: /^4$/ });
      await option4.waitFor({ state: 'visible' });
      await option4.click({ force: true });
    }

    // Navigate away and come back - complete all questions
    await page.goto('/test/big-five-test/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Complete all 50 questions
    for (let i = 0; i < 50; i++) {
      await page.waitForTimeout(200);
      const option3 = page.locator('button').filter({ hasText: /^3$/ });
      await option3.waitFor({ state: 'visible' });
      await option3.click({ force: true });
    }

    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'View Results' }).click();

    // Verify localStorage has the answers
    const answers = await page.evaluate(() => localStorage.getItem('bigFiveAnswers'));
    expect(answers).not.toBeNull();
    const parsed = JSON.parse(answers!);
    expect(Object.keys(parsed).length).toBe(50);
  });

  test('should navigate between questions using Previous/Next buttons', async ({ page }) => {
    await page.goto('/test/big-five-test/');
    await page.getByRole('button', { name: 'Start Test' }).click();

    // Verify at question 1
    await expect(page.locator('text=1/50')).toBeVisible();

    // Previous should be disabled at first question
    const prevButton = page.getByRole('button', { name: 'Previous' });
    await expect(prevButton).toBeDisabled();

    // Answer and go to next
    await page.locator('button').filter({ hasText: /^3$/ }).click({ force: true });
    await page.waitForTimeout(200);

    // Should auto-advance to question 2
    await expect(page.locator('text=2/50')).toBeVisible();

    // Now Previous should be enabled
    await expect(prevButton).toBeEnabled();

    // Go back to question 1
    await prevButton.click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=1/50')).toBeVisible();
  });
});
