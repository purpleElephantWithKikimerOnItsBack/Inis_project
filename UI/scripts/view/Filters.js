class Filters {
  constructor() {
  	this._filterArea = document.getElementById('filter-area');

  	this._filterAreaTitle = this._filterArea.querySelector('.filter-area-title');

  	this._filterList = this._filterArea.querySelector('#filters');

  	this._filterItemTemplate = this._filterArea.querySelector('#filter-item-template');
    this._filterItemTemplateContent = this._filterItemTemplate.content.querySelector('div');
    this._filterItemTemplateRemoveButton = this._filterItemTemplate.content.querySelector('button');

  	this._optionsArea = this._filterArea.querySelector('#options');
  	this._optionsValues = this._filterArea.querySelector('#filter-options');

  	[this._inputDate, this._inputText] = this._filterArea.querySelectorAll('input');

  	[this._okOptionsButton, this._addFilterButton] = this._filterArea.querySelectorAll('button');
  }

  toggleOptions() {
    this._optionsArea.classList.toggle('hidden');
  }

  toggleFilters() {
	  this._filterArea.classList.toggle('filter-area-active');
  	this._filterAreaTitle.classList.toggle('filter-area-title-active');
  	this._addFilterButton.classList.toggle('add-filter-button-active');
  }

  addFilter(type, value) {
    this._filterItemTemplateRemoveButton.value = `${type}`;
    this._filterItemTemplateContent.textContent = value;

    const filterItem = document.importNode(this._filterItemTemplate.content, true);
    filtersController.addRemoveButtonListener(filterItem);

    this._filterArea.style.height = `${this._filterArea.offsetHeight + 34}px`;

    this._filterList.appendChild(filterItem);
  }

  removeFilter(type) {
    this._filterList.querySelector(`button[value=${type}]`)
      .parentElement
      .remove();

    this._filterArea.style.height = `${this._filterArea.offsetHeight - 34}px`;
  }

  onOptionsChangeView(event) {
  	const value = event.target.value;

  	if (value === 'author' || value === 'hashTags') {
  	  if (value === 'author') {
		this._inputText.placeholder = 'enter author';
  	  } else {
  	  	this._inputText.placeholder = '#enter#hashtags';
  	  }

  	  if (this._inputText.classList.contains('hidden')) {
  	  	this._swapInputFields();
  	  }
  	} else if (value === 'createdAt') {
  	  if (this._inputDate.classList.contains('hidden')) {
  	    this._swapInputFields();
  	  }
  	}
  }

  _swapInputFields() {
  	this._inputText.classList.toggle('hidden');
  	this._inputDate.classList.toggle('hidden');
  }
}

const filters = new Filters();
