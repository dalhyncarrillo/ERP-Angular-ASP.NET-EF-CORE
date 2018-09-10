import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  DEFAULT_LANGUAGE = 'en'
  currentLang = this.DEFAULT_LANGUAGE;

  constructor(private translate: TranslateService) { 
    translate.addLangs(['en', 'hu']);
    translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    translate.use(this.DEFAULT_LANGUAGE);
  }

  changeLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
  }
}
