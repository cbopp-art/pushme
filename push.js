/**
 * push.js - jQuery Plugin
 * Push elements into specific containers depended on certain media queries
 *
 * @dependencies	jQuery v1.5.0 http://jquery.com
 * 					Modernizr v2.7.1 http://modernizr.com
 * @author			Cornel Boppart <cornel@bopp-art.com>
 * @copyright		Author
 * @version			1.0.1 (09/03/2014)
 */

;(function($) {

	var push = {

		labels : {
			errorMessage: 'Element could not be found.'
		},

		/**
		 * Default settings
		 *
		 */
		settings : {
			element: '#example',
			pushAction: 'appendTo',
			mq: 'screen and (min-width:768px)'
		},

		/**
		 * Initializes the plugin
		 *
		 * @param	{object}	options	The plugin options (Merged with default settings)
		 * @return	{void}
		 */
		init : function(options) {
			var $this = $(this);

				// Apply merged settings to the current object
			$this.data('settings', $.extend(push.settings, options));

			push.pushTo($this, $this.data('settings'));
		},

		/**
		 * Pushes the element to somewhere
		 *
		 * @param	{object}	$object	The element that should be pushed to somewhere
		 * @return	{void}
		 */
		pushTo : function($object, settings) {
			if (Modernizr.mq(settings.mq)) {
				if (!$(settings.element)) {
					throw new ReferenceError(push.labels.errorMessage);
				}

				$object[settings.pushAction]($(settings.element));
			}
		}

	};

	$.fn.push = function(method) {
			// Method calling logic
		if (push[method]) {
			return push[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return push.init.apply(this, arguments);
		} else {
			return $.error('Method ' + method + ' does not exist on jQuery.push');
		}
	};

}(jQuery));