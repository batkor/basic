import Drupal from 'Drupal'
import drupalSettings from 'drupalSettings'

Drupal.behaviors.themeBasic = {
  attach(context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
  }

}
