import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given('que el jugador entra al modo {string}', async ({ page }, modo: string) => {
  await page.goto('/');
  await page.getByRole('button', { name: modo }).click();
});

When('el jugador ingresa la palabra secreta {string}', async ({ page }, palabra: string) => {
  const input = page.locator('input[type="password"]');
  await expect(input).toBeVisible();
  await input.fill(palabra);
});

When('opcionalmente ingresa la pista {string}', async ({ page }, pista: string) => {
  const input = page.getByLabel(/pista/i);
  await expect(input).toBeVisible();
  await input.fill(pista);
});

When('inicia la partida', async ({ page }) => {
  await page.getByRole('button', { name: /iniciar/i }).click();
});

Then('la pantalla de juego se muestra correctamente', async ({ page }) => {
  await expect(page.getByTestId('word')).toBeVisible();
});

Then('la palabra enmascarada contiene {int} letras ocultas', async ({ page }, cantidad: number) => {
  const texto = await page.getByTestId('word').innerText();
  const ocultas = texto.split('').filter((caracter) => caracter === '_').length;
  expect(ocultas).toBe(cantidad);
});
