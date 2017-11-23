const configure = aurelia => {
  aurelia
    .globalResources('components/molecules/buttons/buttonsgroup/button-group') //
    .globalResources('components/molecules/images/texticon/text-icon')
    .globalResources('components/molecules/dialog/dialog');
};

export { configure };
