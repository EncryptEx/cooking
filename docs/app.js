function recipeApp() {
  return Object.assign({},
    recipeAppState(),
    recipeUtils(),
    recipeI18n(),
    recipeTheme(),
    recipeSearch(),
    recipeData(),
    recipePreferences(),
    recipeRouting(),
    recipePortions(),
    recipeIngredients(),
    recipeVariants(),
    recipeThermomix(),
    recipeOven(),
    recipeInstructions(),
    recipeCookMode(),
    recipeSharing(), {
      async init() {
        try {
          await this.initApp();
        } catch (err) {
          console.error('App initialization failed:', err);
          const msg = document.createElement('pre');
          msg.style.cssText = 'padding:1rem;color:#b91c1c;white-space:pre-wrap';
          msg.textContent = `Failed to start the app: ${err.message}`;
          document.body.prepend(msg)        } finally {
          document.documentElement.classList.remove('app-loading', 'route-pending');
        }
      },

      async initApp() {
        const savedTheme = localStorage.getItem('theme');
        this.darkMode = savedTheme ? savedTheme === 'dark' : false;
        document.documentElement.classList.toggle('dark', this.darkMode);
        this.lang = localStorage.getItem('lang') || 'en';
        this.$watch('lang', v => {
          localStorage.setItem('lang', v);
          this.loadTranslations();
        });

        this.loadHomeFilters();

        await Promise.all([
          this.loadTranslations(),
          this.loadEmojis(),
          this.loadIndex(),
        ]);

        if (this.filterCategory && !this.categories.includes(this.filterCategory)) {
          this.filterCategory = '';
        }

        this.$watch('searchQuery', () => this.saveHomeFilters());
        this.$watch('filterCategory', () => this.saveHomeFilters());

        window.addEventListener('hashchange', () => this.handleRoute());
        await this.handleRoute();
        this.finishRoutePending();
      },
    }
  );
}
