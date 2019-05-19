class LogProcess {
  constructor() {
    this._generalInfoArea = document.getElementById('general-info-area');

    this._profileArea = document.getElementById('profile-area');
    this._profileImage = this._profileArea.querySelector('img');

    this._dropArea = document.getElementById('drop-area');

    [
      this._changePhotoButton,
      this._logOutButton,
      this._logInButton,
      this._signUpButton,
    ] = this._profileArea.querySelectorAll('.profile-button');
    this._logOutButton.addEventListener('click', event => this._onLogOut(event));
    this._logInButton.addEventListener('click', event => this._onLogIn(event));
    this._signUpButton.addEventListener('click', event => this._onSignUp(event));

    this._postList = document.querySelector('.posts');

    this._logInForm = document.forms['log-in'];
    this._signUpForm = document.forms['sign-up'];

    this._messageBox = messageBox;

    if (loggedIn) {
      this._changeView();
    }
  }

  _changeView() {
    this._postList.classList.toggle('posts-loggedOut');

    [
      this._generalInfoArea,
      this._dropArea,
      this._changePhotoButton,
      this._profileImage,
      this._logOutButton,
      this._logInForm,
      this._signUpForm,
    ].forEach((item) => {
      item.classList.toggle('nondisplay');
    });
  }

  _onLogOut(event) {
    this._changeView();

    loggedIn = false;
    localStorage.removeItem('user');
    newsArea.reloadPage(0, 10, filterArea.filter);
  }

  _onLogIn(event) {
    event.preventDefault();

    const [
      nickname,
      password,
    ] = this._logInForm.querySelectorAll('input');

    if (nickname.value.length && password.value.length) {
      if (accounts[`${nickname.value}`] === password.value) {
        this._changeView(event);
        this._messageBox.hideErrorMessage();

        loggedIn = true;
        localStorage.setItem('user', JSON.stringify({ username: 'kikimer' }));
        newsArea.reloadPage(0, 10, filterArea.filter);
      } else {
        this._messageBox.showErrorMessage('Wrong data. Please, check the correctness of your information',
          false, null);
      }
    } else {
      this._messageBox.showErrorMessage('You haven\'t filled all the fields. Please, try again.',
        false, null);
    }

    nickname.value = '';
    password.value = '';
  }

  _onSignUp(event) {
    event.preventDefault();
  }

  static checkLogged() {
    return JSON.parse(localStorage.getItem('user')).user !== undefined;
  }
}

const logProcess = new LogProcess();
