export function initialize(container, application) {
 application.inject('route', 'trees-service', 'service:open-data-paris-trees-service');
 application.inject('controller', 'trees-service', 'service:open-data-paris-trees-service');
}

export default {
  name: 'open-data-paris-trees-service',
  initialize: initialize
};
