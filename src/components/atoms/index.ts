const configure = aurelia => {
  aurelia
    .globalResources('components/atoms/buttons/button/button')
    .globalResources('components/atoms/buttons/hexbutton/hex-button')
    .globalResources('components/atoms/buttons/iconbutton/icon-button')
    .globalResources('components/atoms/buttons/navbutton/nav-button')
    .globalResources('components/atoms/buttons/utilitybutton/utility-button')
    .globalResources('components/atoms/buttons/utilitybuttontext/utility-button-text')
    .globalResources('components/atoms/images/icon/icon');
};

export { configure };
