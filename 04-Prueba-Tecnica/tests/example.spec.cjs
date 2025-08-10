// @ts-check
import { test, expect } from '@playwright/test';
import { log } from 'console';

const LOCAL_HSOT_URL = 'http://localhost:5173'

//TEST END To End

test('has show random facts', async ({ page }) => {
  await page.goto(LOCAL_HSOT_URL);

  const text = await page.getByRole('paragraph')    //Recuperamos el texto de un rol parrafo
  const image = await page.getByRole('img')

  const textContent = await text.textContent()       // Guardamos el texto que tenemos 
  const imageContent = await image.getAttribute('src')    //Guardamos lo que tenemos en src
  
  await expect(textContent).not.toBeNull()    // Indicamos que no sea null
  await expect(imageContent).not.toBeNull()

});


