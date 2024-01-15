import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryMultiplierService {
  constructor() { }

  getProductUrlCategory(category: string) : string {
    return this.pluralizeWord(
      category.toLowerCase().replaceAll(' ', '_'));
  }

  pluralizeWord(word: string): string {
    const pluralRules: [RegExp, string][] = [
      [/s$/, 's'],
      [/(ch|sh|ss|x)$/, '$1es'],
      [/(ay|ey|oy|uy)$/, '$1s'],
      [/(y)$/, 'ies'],
    ];

    for (const [rule, replacement] of pluralRules) {
      if (rule.test(word)) {
        return word.replace(rule, replacement);
      }
    }

    return word + 's';
  }
}
