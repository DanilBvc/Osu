const authFormHeadlineShaker = () => {
  const authFormHeadlineElement = document.querySelector('.auth-form-headline') as HTMLHeadingElement;

  if (authFormHeadlineElement) {
    authFormHeadlineElement.classList.add('shake-animation');
    authFormHeadlineElement.addEventListener('animationend', () => {
      authFormHeadlineElement.classList.remove('shake-animation');
    });
  }
};

export default authFormHeadlineShaker;
