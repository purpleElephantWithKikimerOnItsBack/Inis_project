class FilterArea {
  constructor() {
    this._optionsArea = document.getElementById('options');
    [
      this._dateSelector,
      this._textInput,
    ] = this._optionsArea.getElementsByTagName('input');

    this._filterArea = document.getElementById('filter-area');
    this._filterList = this._filterArea.querySelector('ul');
    this._filterItemTemplate = this._filterArea.querySelector('template');

    this._filterOptions = this._filterArea.querySelector('select');
    [
      this._filterOkButton,
      this._filterAddButton,
    ] = this._filterArea.getElementsByTagName('button');
    this._filterOkButton.addEventListener('click', event => this.onOkFilterButtonClick(event));
    this._filterAddButton.addEventListener('click', event => this.onAddFilterButtonClick(event));

    this._addOptionsListener();

    this._filterAreaTitle = this._filterArea.querySelector('div');

    this._filter = JSON.parse(localStorage.getItem('filter'));
    this._restoreFilters();
  }

  _addOptionsListener() {
    this._filterOptions.addEventListener('change', (event) => {
      if (event.target.value === 'author' || event.target.value === 'hashTags') {
        if (this._textInput.classList.contains('hidden')) {
          this._textInput.classList.toggle('hidden');
        }
        if (!this._dateSelector.classList.contains('hidden')) {
          this._dateSelector.classList.toggle('hidden');
        }

        if (event.target.value === 'author') {
          this._textInput.placeholder = 'enter name';
        } else {
          this._textInput.placeholder = '#enter#hashtags';
        }

        if (this._filterOkButton.classList.contains('filter-button-upper')) {
          this._filterOkButton.classList.toggle('filter-button-upper');
          this._filterCancelButton.classList.toggle('filter-button-upper');
        }
      } else if (event.target.value === 'createdAt') {
        if (this._dateSelector.classList.contains('hidden')) {
          this._dateSelector.classList.toggle('hidden');
        }
        if (!this._textInput.classList.contains('hidden')) {
          this._textInput.classList.toggle('hidden');
        }

        if (this._filterOkButton.classList.contains('filter-button-upper')) {
          this._filterOkButton.classList.toggle('filter-button-upper');
          this._filterCancelButton.classList.toggle('filter-button-upper');
        }
      } else {
        if (!this._dateSelector.classList.contains('hidden')) {
          this._dateSelector.classList.toggle('hidden');
        }
        if (!this._textInput.classList.contains('hidden')) {
          this._textInput.classList.toggle('hidden');
        }

        this._filterOkButton.classList.toggle('filter-button-upper');
        this._filterCancelButton.classList.toggle('filter-button-upper');
      }
    });
  }

  _restoreFilters() {
    if (this._hasFilters()) {
      this._changeFilterArea(true);

      newsArea.reloadPage(0, 10, this._filter);

      this._filterArea.classList.toggle('transition');
      Object.getOwnPropertyNames(this._filter).forEach((prop) => {
        this._addToFilterList(prop, this._filter);
      });
      this._filterArea.classList.toggle('transition');
    }
  }

  onAddFilterButtonClick(event) {
    this._changeFilterArea(false);
  }

  onOkFilterButtonClick(event) {
    if (this._filterOptions.value === 'author' && this._textInput.value.length) {
      if (!this._filter.author) {
        this._filter.author = this._textInput.value;
        this._saveToLocalStorage();

        this._addToFilterList('author', this._filter);
        newsArea.reloadPage(0, 10, this._filter);
      }
    } else if (this._filterOptions.value === 'hashTags' && this._textInput.value.length) {
      if (!this._filter.hashTags) {
        this._filter.hashTags = this._textInput.value
          .split('#')
          .filter(hashtag => hashtag.length !== 0);
        this._saveToLocalStorage();

        this._addToFilterList('hashTags', this._filter);
        newsArea.reloadPage(0, 10, this._filter);
      }
    } else if (this._filterOptions.value === 'createdAt' && this._dateSelector) {
      if (!this._filter.createdAt) {
        this._filter.createdAt = new Date(this._dateSelector.value);
        this._saveToLocalStorage();

        this._addToFilterList('createdAt', this._filter);
        newsArea.reloadPage(0, 10, this._filter);
      }
    }

    this._textInput.value = '';
    this._dateSelector.value = '';

    this._changeFilterArea();
  }

  _addToFilterList(type, filter) {
    if (filter[type] !== undefined) {
      const itemContent = this._filterItemTemplate.content.querySelector('div');
      if (type === 'hashTags') {
        itemContent.textContent = `#${filter[type].join('#')}`;
        itemContent.id = 'hashTags-item';
      } else if (type === 'createdAt') {
        itemContent.textContent = `date: ${filter[type].toLocaleDateString()}`;
        itemContent.id = 'createdAt-item';
      } else {
        itemContent.textContent = `${type}: ${filter[type]}`;
        itemContent.id = 'author-item';
      }

      this._filterArea.style.height = `${this._filterArea.offsetHeight + 34}px`;

      const item = document.importNode(this._filterItemTemplate.content, true);
      item.querySelector('button')
        .addEventListener('click', event => this._removeFilter(event));

      this._filterList.appendChild(item);
    }
  }

  _changeFilterArea(onStartUp) {
    if (onStartUp || !this._hasFilters()) {
      this._filterArea.classList.toggle('filter-area-active');
      this._filterAreaTitle.classList.toggle('filter-area-title-active');
      this._filterAddButton.classList.toggle('add-filter-button-active');
    }
    if (!onStartUp) {
      this._optionsArea.classList.toggle('hidden');
    }
  }

  _removeFilter(event) {
    const parent = event.target.parentElement;
    const [type] = parent.querySelector('div')
      .id
      .split('-');

    this._filter[type] = undefined;
    this._saveToLocalStorage();

    this._filterArea.style.height = `${this._filterArea.offsetHeight - 34}px`;
    this._filterList.removeChild(event.target.parentElement);

    newsArea.reloadPage(0, 10, this._filter);

    if (!this._hasFilters()) {
      this._filterArea.classList.toggle('filter-area-active');
      this._filterAreaTitle.classList.toggle('filter-area-title-active');
      this._filterAddButton.classList.toggle('add-filter-button-active');
    }
  }

  _hasFilters() {
    return ['author', 'createdAt', 'hashTags'].some(type => this._filter[type] !== undefined);
  }

  _hasAllFilters() {
    return ['author', 'createdAt', 'hashTags'].every(type => this._filter[type] !== undefined);
  }

  _saveToLocalStorage() {
    localStorage.setItem('filter', JSON.stringify(this._filter));
  }

  get filter() {
    return this._filter;
  }
}

const filterArea = new FilterArea();
