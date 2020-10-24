"use strict";

/**
 * @file
 * Defines event for local_task submit.
 */
(function (localTasks) {
  if (typeof Drupal !== 'undefined') {
    Drupal.behaviors.localTasks = localTasks;
  } else {
    localTasks.attach();
  }
})({
  attach: function attach() {
    var _this = this;

    var elem_submit = document.querySelector('.local_tasks_submit');

    if (elem_submit) {
      if (elem_submit.processed) {
        return;
      }

      elem_submit.addEventListener('click', function () {
        if (!_this.hasOwnProperty('block')) {
          _this.block = document.querySelector('.local_tasks');
        }

        _this.block.classList.toggle('show');
      }, false);
      elem_submit.processed = true;
    }
  }
});