import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given(
  'que el jugador entra a la app con la palabra {string}',
  async ({ page }, palabra: string) => {
    await page.goto(`/?word=${palabra}`);
  },
);

Given(
  'que el jugador entra a la app con la palabra {string} y pista {string}',
  async ({ page }, palabra: string, pista: string) => {
    await page.goto(`/?word=${palabra}&hint=${pista}`);
  },
);

Given(
  'una partida con la palabra {string}',
  async ({ page }, palabra: string) => {
    await page.goto(`/?word=${palabra}`);
    await page.getByRole('button', { name: 'Jugar' }).click();
  },
);

When(
  'el jugador elige la dificultad {string}',
  async ({ page }, nivel: string) => {
    await page.getByRole('button', { name: nivel, exact: true }).click();
  },
);

When('el jugador inicia la partida', async ({ page }) => {
  await page.getByRole('button', { name: 'Jugar' }).click();
});

When(
  'el jugador adivina la letra {string}',
  async ({ page }, letra: string) => {
    const input = page.getByRole('textbox');
    await input.fill(letra);
    await input.press('Enter');
  },
);

Then('se ve la palabra {string}', async ({ page }, esperada: string) => {
  await expect(page.getByTestId('word')).toHaveText(esperada);
});

Then('se ve la pantalla de inicio', async ({ page }) => {
  await expect(page.getByTestId('start-screen')).toBeVisible();
});

Then('se ve el botón {string}', async ({ page }, nombre: string) => {
  await expect(page.getByRole('button', { name: nombre })).toBeVisible();
});

Then('se ven {int} vidas', async ({ page }, vidas: number) => {
  await expect(page.getByTestId('lives')).toHaveText(String(vidas));
});

Then('se ve el mensaje {string}', async ({ page }, mensaje: string) => {
  await expect(page.getByTestId('message')).toHaveText(mensaje);
});

When('el jugador pide una pista', async ({ page }) => {
  await page.locator('.hint-btn').click();
});

When('el jugador presiona {string}', async ({ page }, boton: string) => {
  await page.getByRole('button', { name: boton }).click();
});

Given('que el jugador entra sin especificar palabra', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Jugar' }).click();
});

Then(
  'se ve el marcador de la sesión con {int} victoria y {int} derrota',
  async ({ page }, victorias: number, derrotas: number) => {
    await expect(page.getByTestId('session-score')).toHaveText(
      `Victorias: ${victorias} Derrotas: ${derrotas}`,
    );
  },
);

Then('se ven {int} partes del muñeco', async ({ page }, partes: number) => {
  const elementos = await page.getByTestId('hangman-part').count();
  expect(elementos).toBe(partes);
});

Then('la palabra tiene al menos una letra', async ({ page }) => {
  const texto = await page.getByTestId('word').innerText();
  expect(texto.trim().length).toBeGreaterThan(0);
});

Then(
  'la tecla {string} está deshabilitada',
  async ({ page }, tecla: string) => {
    await expect(
      page.getByRole('button', { name: tecla, exact: true }),
    ).toBeDisabled();
  },
);

Then('la tecla {string} está habilitada', async ({ page }, tecla: string) => {
  await expect(
    page.getByRole('button', { name: tecla, exact: true }),
  ).toBeEnabled();
});
