class FiltersController {
  constructor() {
  	const filterArea = document.getElementById('filter-area');

  	this._options = filterArea.querySelector('#options');
  	this._options.addEventListener('change', event => filters.onOptionsChangeView(event));

    this._optionsValues = filterArea.querySelector('#filter-options');

  	[this._okOptionsButton, this._addFilterButton] = filterArea.querySelectorAll('button');

  	this._okOptionsButton.addEventListener('click', event => this._onOkOptionsButtonClick(event));
  	this._addFilterButton.addEventListener('click', event => this._onAddFilterButtonClick(event));

  	[this._inputDate, this._inputText] = filterArea.querySelectorAll('input');

    this._filter = {};
  }

  addRemoveButtonListener(filterItem) {
    filterItem.querySelector('button').
      addEventListener('click', event => this._onRemoveFilterItemClick(event));
  }

  hasFilters() {
    return ['author', 'createdAt', 'hashTags'].some((type) => {
      return this._filter[type] !== undefined;
    });
  }

  _onRemoveFilterItemClick(event) {
    const type = event.target.value;

    this._filter[type] = undefined;
    newsArea.reloadPage(postCollection.getPage(0, 10, this._filter));
    filters.removeFilter(type);
    if (!this.hasFilters()) {
      filters.toggleFilters();

      if (!filters._optionsArea.classList.contains('hidden')) {
        filters.toggleOptions();
      }
    }

    if (messageBox.isShown) {
      messageBox.toggleMessageBox();
    }
  }

  _onOkOptionsButtonClick(event) {
    const type = this._optionsValues.value;
    let value;
    if (type === 'author' || type === 'hashTags') {
      value = this._inputText.value;
    } else {
      value = this._inputDate.value;
    }

    if (value === '' || value === '#') {
      if (!messageBox.isShown) {
        messageBox.toggleMessageBox(MessageBox.CHECK_FILTER_VALUE);
      }
    } else {
      if (this._filter[type] !== undefined) {
        if (messageBox.isShown) {
          messageBox.toggleMessageBox();
        }
        messageBox.toggleMessageBox(MessageBox.FILTER_USED);
      } else {
        if (messageBox.isShown) {
          messageBox.toggleMessageBox();
        }

        filters.addFilter(type, value);

        if (type === 'hashTags') {
          value = value
            .split('#')
            .filter(hashtag => hashtag.length !== 0);
        } else if (type === 'createdAt') {
          value = new Date(value);
        }
        this._filter[type] = value;
        
        newsArea.reloadPage(postCollection.getPage(0, 10, this._filter));
      }

      this._inputText.value = '';
      this._inputDate.value = '';
    }
  }

  _onAddFilterButtonClick(event) {
    if (messageBox.isShown) {
      messageBox.toggleMessageBox();
    }
    if (!this.hasFilters()) {
      filters.toggleFilters();
    }
    filters.toggleOptions();
  }
}

const filtersController = new FiltersController();
