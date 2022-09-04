/*
Name: 			Theme Base
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	8.0.0
*/

// Theme
window.theme = {};

// Theme Common Functions
window.theme.fn = {

	getOptions: function ( opts ) {

		if ( typeof ( opts ) == 'object' ) {

			return opts;

		} else if ( typeof ( opts ) == 'string' ) {

			try {
				return JSON.parse( opts.replace( /'/g, '"' ).replace( ';', '' ) );
			} catch ( e ) {
				return {};
			}

		} else {

			return {};

		}

	}

};

// Animate
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__animate';

	var PluginAnimate = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginAnimate.defaults = {
		accX: 0,
		accY: -80,
		delay: 100,
		duration: '750ms',
		minWindowWidth: 767
	};

	PluginAnimate.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginAnimate.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			var self = this;

			if ( $( 'body' ).hasClass( 'loading-overlay-showing' ) ) {
				$( window ).on( 'loading.overlay.ready', function () {
					self.animate();
				} );
			} else {
				self.animate();
			}

			return this;
		},

		animate: function () {
			var self = this,
				$el = this.options.wrapper,
				delay = 0,
				duration = this.options.duration,
				elTopDistance = $el.offset().top,
				windowTopDistance = $( window ).scrollTop();

			$el.addClass( 'appear-animation animated' );

			if ( !$( 'html' ).hasClass( 'no-csstransitions' ) && $( window ).width() > self.options.minWindowWidth && elTopDistance >= windowTopDistance ) {

				$el.appear( function () {

					$el.one( 'animation:show', function ( ev ) {
						delay = ( $el.attr( 'data-appear-animation-delay' ) ? $el.attr( 'data-appear-animation-delay' ) : self.options.delay );
						duration = ( $el.attr( 'data-appear-animation-duration' ) ? $el.attr( 'data-appear-animation-duration' ) : self.options.duration );

						if ( duration != '750ms' ) {
							$el.css( 'animation-duration', duration );
						}

						$el.css( 'animation-delay', delay + 'ms' );

						$el.addClass( $el.attr( 'data-appear-animation' ) + ' appear-animation-visible' );
					} );

					$el.trigger( 'animation:show' );

				}, {
					accX: self.options.accX,
					accY: self.options.accY
				} );

			} else {

				$el.addClass( 'appear-animation-visible' );

			}

			return this;
		}
	};

	// expose to scope
	$.extend( theme, {
		PluginAnimate: PluginAnimate
	} );

	// jquery plugin
	$.fn.themePluginAnimate = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginAnimate( $this, opts );
			}

		} );
	};

} ).apply( this, [ window.theme, jQuery ] );

// Before / After
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__beforeafter';

	var PluginBeforeAfter = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginBeforeAfter.defaults = {

	};

	PluginBeforeAfter.prototype = {
		initialize: function ( $el, opts ) {
			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginBeforeAfter.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {

			if ( !( $.isFunction( $.fn.twentytwenty ) ) ) {
				return this;
			}

			var self = this;

			self.options.wrapper
				.twentytwenty( self.options );

			return this;

		}
	};

	// expose to scope
	$.extend( theme, {
		PluginBeforeAfter: PluginBeforeAfter
	} );

	// jquery plugin
	$.fn.themePluginBeforeAfter = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginBeforeAfter( $this, opts );
			}

		} );
	}

} ).apply( this, [ window.theme, jQuery ] );

// Carousel
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__carousel';

	var PluginCarousel = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginCarousel.defaults = {
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			479: {
				items: 1
			},
			768: {
				items: 2
			},
			979: {
				items: 3
			},
			1199: {
				items: 4
			}
		},
		navText: []
	};

	PluginCarousel.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginCarousel.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			if ( !( $.isFunction( $.fn.owlCarousel ) ) ) {
				return this;
			}

			var self = this,
				$el = this.options.wrapper;

			// Add Theme Class
			$el.addClass( 'owl-theme' );

			// Add Loading
			$el.addClass( 'owl-loading' );

			// Force RTL according to HTML dir attribute
			if ( $( 'html' ).attr( 'dir' ) == 'rtl' ) {
				this.options = $.extend( true, {}, this.options, {
					rtl: true
				} );
			}

			if ( this.options.items == 1 ) {
				this.options.responsive = {}
			}

			if ( this.options.items > 4 ) {
				this.options = $.extend( true, {}, this.options, {
					responsive: {
						1199: {
							items: this.options.items
						}
					}
				} );
			}

			// Auto Height Fixes
			if ( this.options.autoHeight ) {
				var itemsHeight = [];

				$el.find( '.owl-item' ).each( function () {
					if ( $( this ).hasClass( 'active' ) ) {
						itemsHeight.push( $( this ).height() );
					}
				} );

				$( window ).afterResize( function () {
					$el.find( '.owl-stage-outer' ).height( Math.max.apply( null, itemsHeight ) );
				} );

				$( window ).on( 'load', function () {
					$el.find( '.owl-stage-outer' ).height( Math.max.apply( null, itemsHeight ) );
				} );
			}

			// Initialize OwlCarousel
			$el.owlCarousel( this.options ).addClass( 'owl-carousel-init' );

			// Sync
			if ( $el.attr( 'data-sync' ) ) {
				$el.on( 'change.owl.carousel', function ( event ) {
					if ( event.namespace && event.property.name === 'position' ) {
						var target = event.relatedTarget.relative( event.property.value, true );
						$( $el.data( 'sync' ) ).owlCarousel( 'to', target, 300, true );
					}
				} );
			}

			// Carousel Center Active Item
			if ( $el.hasClass( 'carousel-center-active-item' ) ) {
				var itemsActive = $el.find( '.owl-item.active' ),
					indexCenter = Math.floor( ( $el.find( '.owl-item.active' ).length - 1 ) / 2 ),
					itemCenter = itemsActive.eq( indexCenter );

				itemCenter.addClass( 'current' );

				$el.on( 'change.owl.carousel', function ( event ) {
					$el.find( '.owl-item' ).removeClass( 'current' );

					setTimeout( function () {
						var itemsActive = $el.find( '.owl-item.active' ),
							indexCenter = Math.floor( ( $el.find( '.owl-item.active' ).length - 1 ) / 2 ),
							itemCenter = itemsActive.eq( indexCenter );

						itemCenter.addClass( 'current' );
					}, 100 );
				} );

				// Refresh
				$el.trigger( 'refresh.owl.carousel' );

			}

			// Remove Loading
			$el.removeClass( 'owl-loading' );

			// Remove Height
			$el.css( 'height', 'auto' );

			return this;
		}
	};

	// expose to scope
	$.extend( theme, {
		PluginCarousel: PluginCarousel
	} );

	// jquery plugin
	$.fn.themePluginCarousel = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginCarousel( $this, opts );
			}

		} );
	}

} ).apply( this, [ window.theme, jQuery ] );

// Counter
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__counter';

	var PluginCounter = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginCounter.defaults = {
		accX: 0,
		accY: 0,
		speed: 3000,
		refreshInterval: 100,
		decimals: 0,
		onUpdate: null,
		onComplete: null
	};

	PluginCounter.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginCounter.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			if ( !( $.isFunction( $.fn.countTo ) ) ) {
				return this;
			}

			var self = this,
				$el = this.options.wrapper;

			$.extend( self.options, {
				onComplete: function () {
					if ( $el.data( 'append' ) ) {
						$el.html( $el.html() + $el.data( 'append' ) );
					}

					if ( $el.data( 'prepend' ) ) {
						$el.html( $el.data( 'prepend' ) + $el.html() );
					}
				}
			} );

			$el.appear( function () {

				$el.countTo( self.options );

			}, {
				accX: self.options.accX,
				accY: self.options.accY
			} );

			return this;
		}
	};

	// expose to scope
	$.extend( theme, {
		PluginCounter: PluginCounter
	} );

	// jquery plugin
	$.fn.themePluginCounter = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginCounter( $this, opts );
			}

		} );
	}

} ).apply( this, [ window.theme, jQuery ] );

// Icon
( function ( theme, $ ) {

	'use strict';

	theme = theme || {};

	var instanceName = '__icon';

	var PluginIcon = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginIcon.defaults = {
		color: '#2388ED',
		animated: false,
		delay: 300,
		onlySVG: false
	};

	PluginIcon.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginIcon.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			var self = this,
				$el = this.options.wrapper,
				color = self.options.color,
				elTopDistance = $el.offset().top,
				windowTopDistance = $( window ).scrollTop(),
				duration = ( self.options.animated && !self.options.strokeBased ) ? 200 : 100;

			// Check origin
			if ( window.location.origin === 'file://' ) {
				$el.css( 'opacity', 1 );
				return;
			}

			// Duration
			if ( self.options.duration ) {
				duration = self.options.duration;
			}

			// SVG Content
			var SVGContent = $.get( {
				url: $el.attr( 'src' ),
				success: function ( data, status, xhr ) {
					var iconWrapper = $( '<div class="animated-icon">' + xhr.responseText + '</div>' ),
						uniqid = 'icon_' + Math.floor( Math.random() * 26 ) + Date.now();

					iconWrapper.find( 'svg' ).attr( 'id', uniqid );

					if ( $el.attr( 'width' ) ) {
						iconWrapper.find( 'svg' )
							.attr( 'width', $el.attr( 'width' ) )
							.attr( 'height', $el.attr( 'width' ) );
					}

					$el.replaceWith( iconWrapper );

					if ( self.options.extraClass ) {
						iconWrapper.addClass( self.options.extraClass );
					}

					if ( self.options.onlySVG ) {
						return;
					}

					$el = iconWrapper;

					var icon = new Vivus( uniqid, {
						start: 'manual', type: 'sync', selfDestroy: true, duration: duration, onReady: function ( obj ) {
							var styleElement = document.createElementNS( "http://www.w3.org/2000/svg", "style" ),
								animateStyle = '';

							// SVG Fill Based
							if ( self.options.animated && !self.options.strokeBased || !self.options.animated && color && !self.options.strokeBased ) {
								animateStyle = 'stroke-width: 0.1px; fill-opacity: 0; transition: ease fill-opacity 300ms;';

								// Set Style on SVG inside object
								styleElement.textContent = '#' + uniqid + ' path, #' + uniqid + ' line, #' + uniqid + ' rect, #' + uniqid + ' circle, #' + uniqid + ' polyline { fill: ' + color + '; stroke: ' + color + '; ' + animateStyle + ( self.options.svgStyle ? self.options.svgStyle : "" ) + ' } .finished path { fill-opacity: 1; }';
								obj.el.appendChild( styleElement );
							}

							// SVG Stroke Based
							if ( self.options.animated && self.options.strokeBased || !self.options.animated && color && self.options.strokeBased ) {

								// Set Style on SVG inside object
								styleElement.textContent = '#' + uniqid + ' path, #' + uniqid + ' line, #' + uniqid + ' rect, #' + uniqid + ' circle, #' + uniqid + ' polyline { stroke: ' + color + '; ' + ( self.options.svgStyle ? self.options.svgStyle : "" ) + '}';
								obj.el.appendChild( styleElement );
							}

							$.event.trigger( 'theme.plugin.icon.svg.ready' );
						}
					} );

					// Isn't animated
					if ( !self.options.animated ) {
						setTimeout( function () {
							icon.finish();
						}, 10 );
						$el.css( { opacity: 1 } );
					}

					// Animated
					if ( self.options.animated && $( window ).width() > 767 ) {
						// First Load
						if ( $el.visible( true ) ) {
							self.startIconAnimation( icon, $el );
						} else if ( elTopDistance < windowTopDistance ) {
							self.startIconAnimation( icon, $el );
						}

						// On Scroll
						$( window ).on( 'scroll', function () {
							if ( $el.visible( true ) ) {
								self.startIconAnimation( icon, $el );
							}
						} );

					} else {

						$el.css( { opacity: 1 } );
						icon.finish();

						$( window ).on( 'theme.plugin.icon.svg.ready', function () {
							setTimeout( function () {
								icon.el.setAttribute( 'class', 'finished' );
								icon.finish();
							}, 300 );
						} );

					}

				}
			} );

			return this;
		},
		startIconAnimation: function ( icon, $el ) {
			var self = this;

			// Animate for better performance
			$( { to: 0 } ).animate( { to: 1 }, ( ( self.options.strokeBased ) ? self.options.delay : self.options.delay + 300 ), function () {
				$el.css( { opacity: 1 } );
			} );

			$( { to: 0 } ).animate( { to: 1 }, self.options.delay, function () {
				icon.play( 1 );

				setTimeout( function () {
					icon.el.setAttribute( 'class', 'finished' );
				}, icon.duration * 5 );
			} );
		}
	};

	// expose to scope
	$.extend( theme, {
		PluginIcon: PluginIcon
	} );

	// jquery plugin
	$.fn.themePluginIcon = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginIcon( $this, opts );
			}

		} );
	};

} ).apply( this, [ window.theme, jQuery ] );

// Lazy Load
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__lazyload';

	var PluginLazyLoad = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginLazyLoad.defaults = {
		effect: 'show',
		appearEffect: '',
		imgFluid: true,
		appear: function ( elements_left, settings ) {

		},
		load: function ( elements_left, settings ) {
			$( this ).addClass( $.trim( 'lazy-load-loaded ' + settings.appearEffect ) ).css( {
				'animation-duration': '1s'
			} );
		}
	};

	PluginLazyLoad.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build()
				.events();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginLazyLoad.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			if ( !( $.isFunction( $.fn.lazyload ) ) ) {
				return this;
			}

			var self = this;

			self.options.wrapper.lazyload( this.options );

			return this;
		},

		events: function () {
			var self = this;

			if ( self.options.imgFluid && self.options.wrapper.is( 'img' ) ) {
				self.options.wrapper.on( 'appear', function () {
					setTimeout( function () {
						self.options.wrapper.addClass( 'img-fluid' );
					}, 500 );
				} );
			}

			return this;
		}
	};

	// expose to scope
	$.extend( theme, {
		PluginLazyLoad: PluginLazyLoad
	} );

	// jquery plugin
	$.fn.themePluginLazyLoad = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginLazyLoad( $this, opts );
			}

		} );
	}

} ).apply( this, [ window.theme, jQuery ] );


// Loading Overlay
( function ( theme, $ ) {

	'use strict';

	theme = theme || {};

	var loadingOverlayTemplate = [
		'<div class="loading-overlay">',
		'<div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
		'</div>'
	].join( '' );

	var LoadingOverlay = function ( $wrapper, options ) {
		return this.initialize( $wrapper, options );
	};

	LoadingOverlay.prototype = {

		options: {
			css: {},
			hideDelay: 500
		},

		initialize: function ( $wrapper, options ) {
			this.$wrapper = $wrapper;

			this
				.setVars()
				.setOptions( options )
				.build()
				.events();

			this.$wrapper.data( 'loadingOverlay', this );
		},

		setVars: function () {
			this.$overlay = this.$wrapper.find( '.loading-overlay' );

			return this;
		},

		setOptions: function ( options ) {
			if ( !this.$overlay.get( 0 ) ) {
				this.matchProperties();
			}
			this.options = $.extend( true, {}, this.options, options, theme.fn.getOptions( this.$wrapper.data( 'plugin-options' ) ) );

			this.loaderClass = this.getLoaderClass( this.options.css.backgroundColor );

			return this;
		},

		build: function () {
			if ( !this.$overlay.closest( document.documentElement ).get( 0 ) ) {
				if ( !this.$cachedOverlay ) {
					this.$overlay = $( loadingOverlayTemplate ).clone();

					if ( this.options.css ) {
						this.$overlay.css( this.options.css );
						this.$overlay.find( '.loader' ).addClass( this.loaderClass );
					}
				} else {
					this.$overlay = this.$cachedOverlay.clone();
				}

				this.$wrapper.append( this.$overlay );
			}

			if ( !this.$cachedOverlay ) {
				this.$cachedOverlay = this.$overlay.clone();
			}

			return this;
		},

		events: function () {
			var _self = this;

			if ( this.options.startShowing ) {
				_self.show();
			}

			if ( this.$wrapper.is( 'body' ) || this.options.hideOnWindowLoad ) {
				$( window ).on( 'load error', function () {
					_self.hide();
				} );
			}

			if ( this.options.listenOn ) {
				$( this.options.listenOn )
					.on( 'loading-overlay:show beforeSend.ic', function ( e ) {
						e.stopPropagation();
						_self.show();
					} )
					.on( 'loading-overlay:hide complete.ic', function ( e ) {
						e.stopPropagation();
						_self.hide();
					} );
			}

			this.$wrapper
				.on( 'loading-overlay:show beforeSend.ic', function ( e ) {
					if ( e.target === _self.$wrapper.get( 0 ) ) {
						e.stopPropagation();
						_self.show();
						return true;
					}
					return false;
				} )
				.on( 'loading-overlay:hide complete.ic', function ( e ) {
					if ( e.target === _self.$wrapper.get( 0 ) ) {
						e.stopPropagation();
						_self.hide();
						return true;
					}
					return false;
				} );

			return this;
		},

		show: function () {
			this.build();

			this.position = this.$wrapper.css( 'position' ).toLowerCase();
			if ( this.position != 'relative' || this.position != 'absolute' || this.position != 'fixed' ) {
				this.$wrapper.css( {
					position: 'relative'
				} );
			}
			this.$wrapper.addClass( 'loading-overlay-showing' );
		},

		hide: function () {
			var _self = this;

			setTimeout( function () {
				_self.$wrapper.removeClass( 'loading-overlay-showing' );

				if ( this.position != 'relative' || this.position != 'absolute' || this.position != 'fixed' ) {
					_self.$wrapper.css( { position: '' } );
				}

				$( window ).trigger( 'loading.overlay.ready' );
			}, _self.options.hideDelay );
		},

		matchProperties: function () {
			var i,
				l,
				properties;

			properties = [
				'backgroundColor',
				'borderRadius'
			];

			l = properties.length;

			for ( i = 0; i < l; i++ ) {
				var obj = {};
				obj[ properties[ i ] ] = this.$wrapper.css( properties[ i ] );

				$.extend( this.options.css, obj );
			}
		},

		getLoaderClass: function ( backgroundColor ) {
			if ( !backgroundColor || backgroundColor === 'transparent' || backgroundColor === 'inherit' ) {
				return 'black';
			}

			var hexColor,
				r,
				g,
				b,
				yiq;

			var colorToHex = function ( color ) {
				var hex,
					rgb;

				if ( color.indexOf( '#' ) > - 1 ) {
					hex = color.replace( '#', '' );
				} else {
					rgb = color.match( /\d+/g );
					hex = ( '0' + parseInt( rgb[ 0 ], 10 ).toString( 16 ) ).slice( -2 ) + ( '0' + parseInt( rgb[ 1 ], 10 ).toString( 16 ) ).slice( -2 ) + ( '0' + parseInt( rgb[ 2 ], 10 ).toString( 16 ) ).slice( -2 );
				}

				if ( hex.length === 3 ) {
					hex = hex + hex;
				}

				return hex;
			};

			hexColor = colorToHex( backgroundColor );

			r = parseInt( hexColor.substr( 0, 2 ), 16 );
			g = parseInt( hexColor.substr( 2, 2 ), 16 );
			b = parseInt( hexColor.substr( 4, 2 ), 16 );
			yiq = ( ( r * 299 ) + ( g * 587 ) + ( b * 114 ) ) / 1000;

			return ( yiq >= 128 ) ? 'black' : 'white';
		}

	};

	// expose to scope
	$.extend( theme, {
		LoadingOverlay: LoadingOverlay
	} );

	// expose as a jquery plugin
	$.fn.loadingOverlay = function ( opts ) {
		return this.each( function () {
			var $this = $( this );

			var loadingOverlay = $this.data( 'loadingOverlay' );
			if ( loadingOverlay ) {
				return loadingOverlay;
			} else {
				var options = opts || $this.data( 'loading-overlay-options' ) || {};
				return new LoadingOverlay( $this, options );
			}
		} );
	}

	// auto init
	$( '[data-loading-overlay]' ).loadingOverlay();

} ).apply( this, [ window.theme, jQuery ] );

// Masonry
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__masonry';

	var PluginMasonry = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginMasonry.defaults = {

	};

	PluginMasonry.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginMasonry.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			if ( !( $.isFunction( $.fn.isotope ) ) ) {
				return this;
			}

			var self = this,
				$window = $( window );

			self.$loader = false;

			if ( self.options.wrapper.parents( '.masonry-loader' ).get( 0 ) ) {
				self.$loader = self.options.wrapper.parents( '.masonry-loader' );
				self.createLoader();
			}

			self.options.wrapper.one( 'layoutComplete', function ( event, laidOutItems ) {
				self.removeLoader();
			} );

			self.options.wrapper.waitForImages( function () {
				self.options.wrapper.isotope( self.options );
			} );

			// IE10/11 fix
			if ( $( 'html' ).hasClass( 'ie10' ) || $( 'html' ).hasClass( 'ie11' ) ) {
				var padding = parseInt( self.options.wrapper.children().css( 'padding-left' ) ) + parseInt( self.options.wrapper.children().css( 'padding-right' ) );
			}

			$( window ).on( 'resize', function () {
				setTimeout( function () {
					self.options.wrapper.isotope( 'layout' );
				}, 300 );
			} );

			setTimeout( function () {
				self.removeLoader();
			}, 3000 );

			return this;
		},

		createLoader: function () {
			var self = this;

			var loaderTemplate = [
				'<div class="bounce-loader">',
				'<div class="bounce1"></div>',
				'<div class="bounce2"></div>',
				'<div class="bounce3"></div>',
				'</div>'
			].join( '' );

			self.$loader.append( loaderTemplate );

			return this;
		},

		removeLoader: function () {

			var self = this;

			if ( self.$loader ) {

				self.$loader.removeClass( 'masonry-loader-showing' );

				setTimeout( function () {
					self.$loader.addClass( 'masonry-loader-loaded' );
				}, 300 );

			}

		}
	};

	// expose to scope
	$.extend( theme, {
		PluginMasonry: PluginMasonry
	} );

	// jquery plugin
	$.fn.themePluginMasonry = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginMasonry( $this, opts );
			}

		} );
	}

} ).apply( this, [ window.theme, jQuery ] );

// Match Height
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__matchHeight';

	var PluginMatchHeight = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginMatchHeight.defaults = {
		byRow: true,
		property: 'height',
		target: null,
		remove: false
	};

	PluginMatchHeight.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginMatchHeight.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			if ( !( $.isFunction( $.fn.matchHeight ) ) ) {
				return this;
			}

			var self = this;

			self.options.wrapper.matchHeight( self.options );

			return this;
		}

	};

	// expose to scope
	$.extend( theme, {
		PluginMatchHeight: PluginMatchHeight
	} );

	// jquery plugin
	$.fn.themePluginMatchHeight = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginMatchHeight( $this, opts );
			}

		} );
	}

} ).apply( this, [ window.theme, jQuery ] );

// Scroll to Top
( function ( theme, $ ) {

	theme = theme || {};

	$.extend( theme, {

		PluginScrollToTop: {

			defaults: {
				wrapper: $( 'body' ),
				offset: 150,
				buttonClass: 'scroll-to-top',
				iconClass: 'fas fa-chevron-up',
				delay: 1000,
				visibleMobile: false,
				label: false,
				easing: 'easeOutBack'
			},

			initialize: function ( opts ) {
				initialized = true;

				// Don't initialize if the page has Section Scroll
				if ( $( 'body[data-plugin-section-scroll]' ).get( 0 ) ) {
					return;
				}

				this
					.setOptions( opts )
					.build()
					.events();

				return this;
			},

			setOptions: function ( opts ) {
				this.options = $.extend( true, {}, this.defaults, opts );

				return this;
			},

			build: function () {
				var self = this,
					$el;

				// Base HTML Markup
				$el = $( '<a />' )
					.addClass( self.options.buttonClass )
					.attr( {
						'href': '#',
						'title': 'scroll-top',
					} )
					.append(
						$( '<i />' )
							.addClass( self.options.iconClass )
					);

				// Visible Mobile
				if ( !self.options.visibleMobile ) {
					$el.addClass( 'hidden-mobile' );
				}

				// Label
				if ( self.options.label ) {
					$el.append(
						$( '<span />' ).html( self.options.label )
					);
				}

				this.options.wrapper.append( $el );

				this.$el = $el;

				return this;
			},

			events: function () {
				var self = this,
					_isScrolling = false;

				// Click Element Action
				self.$el.on( 'click', function ( e ) {
					e.preventDefault();
					$( 'body, html' ).animate( {
						scrollTop: 0
					}, self.options.delay, self.options.easing );
					return false;
				} );

				// Show/Hide Button on Window Scroll event.
				$( window ).scroll( function () {

					if ( !_isScrolling ) {

						_isScrolling = true;

						if ( $( window ).scrollTop() > self.options.offset ) {

							self.$el.stop( true, true ).addClass( 'visible' );
							_isScrolling = false;

						} else {

							self.$el.stop( true, true ).removeClass( 'visible' );
							_isScrolling = false;

						}

					}

				} );

				return this;
			}

		}

	} );

} ).apply( this, [ window.theme, jQuery ] );

// Scrollable
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__scrollable';

	var PluginScrollable = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginScrollable.updateModals = function () {
		PluginScrollable.updateBootstrapModal();
	};

	PluginScrollable.updateBootstrapModal = function () {
		var updateBoostrapModal;

		updateBoostrapModal = typeof $.fn.modal !== 'undefined';
		updateBoostrapModal = updateBoostrapModal && typeof $.fn.modal.Constructor !== 'undefined';
		updateBoostrapModal = updateBoostrapModal && typeof $.fn.modal.Constructor.prototype !== 'undefined';
		updateBoostrapModal = updateBoostrapModal && typeof $.fn.modal.Constructor.prototype.enforceFocus !== 'undefined';

		if ( !updateBoostrapModal ) {
			return false;
		}

		var originalFocus = $.fn.modal.Constructor.prototype.enforceFocus;
		$.fn.modal.Constructor.prototype.enforceFocus = function () {
			originalFocus.apply( this );

			var $scrollable = this.$element.find( '.scrollable' );
			if ( $scrollable ) {
				if ( $.isFunction( $.fn[ 'themePluginScrollable' ] ) ) {
					$scrollable.themePluginScrollable();
				}

				if ( $.isFunction( $.fn[ 'nanoScroller' ] ) ) {
					$scrollable.nanoScroller();
				}
			}
		};
	};

	PluginScrollable.defaults = {
		contentClass: 'scrollable-content',
		paneClass: 'scrollable-pane',
		sliderClass: 'scrollable-slider',
		alwaysVisible: true,
		preventPageScrolling: true
	};

	PluginScrollable.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginScrollable.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			this.options.wrapper.nanoScroller( this.options );

			return this;
		}
	};

	// expose to scope
	$.extend( theme, {
		PluginScrollable: PluginScrollable
	} );

	// jquery plugin
	$.fn.themePluginScrollable = function ( opts ) {
		return this.each( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginScrollable( $this, opts );
			}

		} );
	};

	$( function () {
		PluginScrollable.updateModals();
	} );

} ).apply( this, [ window.theme, jQuery ] );

// Section Scroll
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__sectionScroll';

	var PluginSectionScroll = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginSectionScroll.defaults = {
		targetClass: '.section',
		dotsNav: true,
		changeHeaderLogo: true,
		headerLogoDark: 'img/logo-default-slim.png',
		headerLogoLight: 'img/logo-default-slim-dark.png'
	};

	PluginSectionScroll.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build()
				.events();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginSectionScroll.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			var self = this,
				$el = this.options.wrapper;

			// Check type of header and change the target for header (by change header color purpose)
			if ( $( 'html' ).hasClass( 'side-header-overlay-full-screen' ) ) {
				self.$header = $( '.sticky-wrapper' );
			} else {
				self.$header = $( '#header' );
			}

			// Turn the section full height or not depeding on the content size
			self.updateSectionsHeight();

			// Wrap all sections in a section wrapper
			$( this.options.targetClass ).wrap( '<div class="section-wrapper"></div>' );

			// Set the section wrapper height
			$( '.section-wrapper' ).each( function () {
				$( this ).height( $( this ).find( '.section-scroll' ).outerHeight() );
			} );

			// Add active class to the first section on page load
			$( '.section-wrapper' ).first().addClass( 'active' );

			var flag = false,
				scrollableFlag = false,
				touchDirection = '',
				touchstartY = 0,
				touchendY = 0;

			$( window ).on( 'touchstart', function ( event ) {
				touchstartY = event.changedTouches[ 0 ].screenY;
			} );

			var wheelEvent = 'onwheel' in document ? 'wheel' : document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
			if ( $( window ).width() < 992 && $( 'html' ).hasClass( 'touch' ) ) {
				wheelEvent = 'onwheel' in document ? 'wheel touchend' : document.onmousewheel !== undefined ? 'mousewheel touchend' : 'DOMMouseScroll touchend';
			}

			$( window ).on( wheelEvent, function ( e ) {
				if ( $( window ).width() < 992 && $( 'html' ).hasClass( 'touch' ) ) {
					if ( $( e.target ).closest( '.section-scroll-dots-navigation' ).get( 0 ) || $( e.target ).closest( '.header-body' ).get( 0 ) || $( e.target ).closest( '.owl-carousel' ).get( 0 ) ) {
						return;
					}
				}

				// Side Header Overlay Full Screen
				if ( $( 'html.side-header-overlay-full-screen.side-header-hide' ).get( 0 ) ) {
					return;
				}

				var wheelDirection = e.originalEvent.wheelDelta == undefined ? e.originalEvent.deltaY > 0 : e.originalEvent.wheelDelta < 0;
				if ( $( window ).width() < 992 && $( 'html' ).hasClass( 'touch' ) ) {
					touchendY = event.changedTouches[ 0 ].screenY;

					if ( touchendY <= touchstartY ) {
						touchDirection = 'up';
					}

					if ( touchendY >= touchstartY ) {
						touchDirection = 'down';
					}

					if ( touchendY == touchstartY ) {
						return;
					}
				}

				var $currentSection = $( '.section-wrapper' ).eq( self.getCurrentIndex() ).find( '.section-scroll' ),
					$nextSection = self.getNextSection( wheelDirection, touchDirection ),
					nextSectionOffsetTop;

				// If is the last section, then change the offsetTop value
				if ( self.getCurrentIndex() == $( '.section-wrapper' ).length - 1 ) {
					nextSectionOffsetTop = $( document ).height();
				} else {
					nextSectionOffsetTop = $nextSection.offset().top;
				}

				if ( $( window ).width() < 992 && $( 'html' ).hasClass( 'touch' ) ) {
					setTimeout( function () {
						if ( $( '.section-wrapper' ).eq( self.getCurrentIndex() ).find( '.section-scroll' ).hasClass( 'section-scroll-scrollable' ) ) {
							$( 'html' ).removeClass( 'overflow-hidden' );
						} else {
							$( 'html' ).addClass( 'overflow-hidden' );
						}
					}, 1200 );
				}

				// For non full height sections
				if ( $currentSection.hasClass( 'section-scroll-scrollable' ) ) {
					if ( !flag && !scrollableFlag ) {

						// Scroll Direction
						if ( wheelDirection || touchDirection == 'up' ) {
							if ( ( $( window ).scrollTop() + $( window ).height() ) >= nextSectionOffsetTop ) {
								flag = true;
								setTimeout( function () {
									$( window ).trigger( 'section.scroll.change.header.color' );

									setTimeout( function () {
										flag = false;
									}, 500 );
								}, 1000 );

								if ( self.getCurrentIndex() == ( $( '.section-wrapper' ).length - 1 ) ) {
									return false;
								}

								// Move to the next section
								self.moveTo( $currentSection.offset().top + $currentSection.outerHeight() );

								// Change Section Active Class
								self.changeSectionActiveState( $nextSection );

								self.$header.css( {
									opacity: 0,
									transition: 'ease opacity 500ms'
								} );
							}

							if ( !$( 'html' ).hasClass( 'touch' ) ) {
								for ( var i = 1; i < 100; i++ ) {
									$( 'body, html' ).scrollTop( $( window ).scrollTop() + 1 );

									if ( ( $( window ).scrollTop() + $( window ).height() ) >= nextSectionOffsetTop ) {
										scrollableFlag = true;
										setTimeout( function () {
											$( window ).trigger( 'section.scroll.change.header.color' );
											scrollableFlag = false;
										}, 500 );
										break;
									}
								}
							}
						} else {
							if ( $( window ).scrollTop() <= $currentSection.offset().top ) {
								flag = true;
								setTimeout( function () {
									$( window ).trigger( 'section.scroll.change.header.color' );

									setTimeout( function () {
										flag = false;
									}, 500 );
								}, 1000 );

								if ( self.getCurrentIndex() == 0 ) {
									return false;
								}

								// Move to the next section
								self.moveTo( $currentSection.offset().top - $( window ).height() );

								// Change Section Active Class
								self.changeSectionActiveState( $nextSection );

								self.$header.css( {
									opacity: 0,
									transition: 'ease opacity 500ms'
								} );
							}

							if ( !$( 'html' ).hasClass( 'touch' ) ) {
								for ( var i = 1; i < 100; i++ ) {
									$( 'body, html' ).scrollTop( $( window ).scrollTop() - 1 );

									if ( $( window ).scrollTop() <= $currentSection.offset().top ) {
										scrollableFlag = true;
										setTimeout( function () {
											$( window ).trigger( 'section.scroll.change.header.color' );
											scrollableFlag = false;
										}, 500 );
										break;
									}
								}
							}
						}

						// Change Dots Active Class
						self.changeDotsActiveState();

						return;

					}
				}

				// For full height sections
				if ( !flag && !scrollableFlag ) {
					if ( wheelDirection || touchDirection == 'up' ) {
						if ( self.getCurrentIndex() == ( $( '.section-wrapper' ).length - 1 ) ) {
							return false;
						}

						// Change Section Active Class
						self.changeSectionActiveState( $nextSection );

						setTimeout( function () {
							// Move to the next section
							self.moveTo( $nextSection.offset().top );

						}, 150 );
					} else {
						if ( self.getCurrentIndex() == 0 ) {
							return false;
						}

						// Change Section Active Class
						self.changeSectionActiveState( $nextSection );

						if ( $nextSection.height() > $( window ).height() ) {
							// Move to the next section
							self.moveTo( $currentSection.offset().top - $( window ).height() );
						} else {
							setTimeout( function () {
								// Move to the next section
								self.moveTo( $nextSection.offset().top );

							}, 150 );
						}
					}

					// Change Dots Active Class
					self.changeDotsActiveState();

					self.$header.css( {
						opacity: 0,
						transition: 'ease opacity 500ms'
					} );

					// Style next section
					$nextSection.css( {
						position: 'relative',
						opacity: 1,
						'z-index': 1,
						transform: 'translate3d(0,0,0) scale(1)'
					} );

					// Style previous section
					$currentSection.css( {
						position: 'fixed',
						width: '100%',
						top: 0,
						left: 0,
						opacity: 0,
						'z-index': 0,
						transform: 'translate3d(0,0,-10px) scale(0.7)',
						transition: 'ease transform 600ms, ease opacity 600ms',
					} );

					setTimeout( function () {
						$currentSection.css( {
							position: 'relative',
							opacity: 1,
							transform: 'translate3d(0,0,-10px) scale(1)'
						} );

						$( window ).trigger( 'section.scroll.change.header.color' );

						setTimeout( function () {
							flag = false;
						}, 500 );
					}, 1000 );

					flag = true;

				}

				return;
			} );

			// Dots Navigation
			if ( this.options.dotsNav ) {
				self.dotsNavigation();
			}

			// First Load
			setTimeout( function () {
				if ( $( window.location.hash ).get( 0 ) ) {
					self.moveTo( $( window.location.hash ).parent().offset().top );

					self.changeSectionActiveState( $( window.location.hash ) );

					// Change Dots Active Class
					self.changeDotsActiveState();

					self.updateHash( true );
				} else {
					var hash = window.location.hash,
						index = hash.replace( '#', '' );

					if ( !hash ) {
						index = 1;
					}

					self.moveTo( $( '.section-wrapper' ).eq( index - 1 ).offset().top );

					self.changeSectionActiveState( $( '.section-wrapper' ).eq( index - 1 ).find( '.section-scroll' ) );

					// Change Dots Active Class
					self.changeDotsActiveState();

					self.updateHash( true );
				}

				$( window ).trigger( 'section.scroll.ready' );
			}, 500 );

			return this;
		},

		updateSectionsHeight: function () {
			var self = this;

			$( '.section-scroll' ).css( { height: '' } );

			$( '.section-scroll' ).each( function () {
				if ( $( this ).outerHeight() < ( $( window ).height() + 3 ) ) {
					$( this ).css( { height: '100vh' } );
				} else {
					$( this ).addClass( 'section-scroll-scrollable' );
				}
			} );

			// Set the section wrapper height
			$( '.section-wrapper' ).each( function () {
				$( this ).height( $( this ).find( '.section-scroll' ).outerHeight() );
			} );

			return this;
		},

		updateHash: function ( first_load ) {
			var self = this;

			if ( !window.location.hash ) {
				window.location.hash = 1;
			} else {
				if ( !first_load ) {
					var $section = $( '.section-wrapper' ).eq( self.getCurrentIndex() ).find( '.section-scroll' ),
						section_id = $section.attr( 'id' ) ? $section.attr( 'id' ) : $section.parent().index() + 1;

					window.location.hash = section_id;
				}
			}

			return this;
		},

		getCurrentIndex: function () {
			var self = this,
				currentIndex = 0;

			currentIndex = $( '.section-wrapper.active' ).index();

			return currentIndex;
		},

		moveTo: function ( $scrollTopValue, first_load ) {
			var self = this;

			$( 'body, html' ).animate( {
				scrollTop: $scrollTopValue
			}, 1000, 'easeOutQuint' );

			setTimeout( function () {
				self.updateHash();
			}, 500 );

			return this;
		},

		getNextSection: function ( wheelDirection, touchDirection ) {
			var self = this,
				$nextSection = '';

			// Scroll Direction
			if ( wheelDirection || touchDirection == 'up' ) {
				$nextSection = $( '.section-wrapper' ).eq( self.getCurrentIndex() + 1 ).find( '.section-scroll' );
			} else {
				$nextSection = $( '.section-wrapper' ).eq( self.getCurrentIndex() - 1 ).find( '.section-scroll' );
			}

			return $nextSection;
		},

		changeSectionActiveState: function ( $nextSection ) {
			var self = this;

			$( '.section-wrapper' ).removeClass( 'active' );
			$nextSection.parent().addClass( 'active' );

			return this;
		},

		changeDotsActiveState: function () {
			var self = this;

			$( '.section-scroll-dots-navigation > ul > li' ).removeClass( 'active' );
			$( '.section-scroll-dots-navigation > ul > li' ).eq( self.getCurrentIndex() ).addClass( 'active' );

			return this;
		},

		dotsNavigation: function () {
			var self = this;

			var dotsNav = $( '<div class="section-scroll-dots-navigation"><ul class="list list-unstyled"></ul></div>' ),
				currentSectionIndex = self.getCurrentIndex();

			if ( self.options.dotsClass ) {
				dotsNav.addClass( self.options.dotsClass );
			}

			for ( var i = 0; i < $( '.section-scroll' ).length; i++ ) {
				var title = $( '.section-wrapper' ).eq( i ).find( '.section-scroll' ).data( 'section-scroll-title' );

				dotsNav.find( '> ul' ).append( '<li' + ( ( currentSectionIndex == i ) ? ' class="active"' : '' ) + '><a href="#' + i + '" data-nav-id="' + i + '"><span>' + title + '</span></a></li>' );
			}

			$( '.body' ).append( dotsNav );

			dotsNav.find( 'a[data-nav-id]' ).on( 'click touchstart', function ( e ) {
				e.preventDefault();
				var $this = $( this );

				$( '.section-scroll' ).css( {
					opacity: 0,
					transition: 'ease opacity 300ms'
				} );

				self.$header.css( {
					opacity: 0,
					transition: 'ease opacity 500ms'
				} );

				setTimeout( function () {
					self.moveTo( $( '.section-wrapper' ).eq( $this.data( 'nav-id' ) ).offset().top )

					$( '.section-wrapper' ).removeClass( 'active' );
					$( '.section-wrapper' ).eq( $this.data( 'nav-id' ) ).addClass( 'active' );

					$( '.section-wrapper' ).eq( self.getCurrentIndex() ).find( '.section-scroll' ).css( {
						opacity: 1
					} );

					setTimeout( function () {
						$( '.section-scroll' ).css( { opacity: 1 } );

						$( window ).trigger( 'section.scroll.change.header.color' );
					}, 500 );

					self.changeDotsActiveState();
				}, 500 );
			} );

			return this;
		},

		events: function () {
			var self = this;

			$( window ).on( 'section.scroll.ready', function () {
				$( window ).scrollTop( 0 );
			} );

			$( window ).on( 'section.scroll.change.header.color', function () {
				var headerColor = $( '.section-wrapper' ).eq( self.getCurrentIndex() ).find( '.section-scroll' ).data( 'section-scroll-header-color' );

				$( '#header .header-nav' ).removeClass( 'header-nav-light-text header-nav-dark-text' ).addClass( 'header-nav-' + headerColor + '-text' );
				$( '#header .header-nav-features' ).removeClass( 'header-nav-features-dark header-nav-features-light' ).addClass( 'header-nav-features-' + headerColor );
				$( '#header .header-social-icons' ).removeClass( 'social-icons-icon-dark social-icons-icon-light' ).addClass( 'social-icons-icon-' + headerColor );

				// Change Logo
				if ( self.options.changeHeaderLogo && headerColor != undefined ) {
					if ( headerColor == 'light' ) {
						$( '#header .header-logo img' ).attr( 'src', self.options.headerLogoLight );
					} else if ( headerColor == 'dark' ) {
						$( '#header .header-logo img' ).attr( 'src', self.options.headerLogoDark );
					}
				}

				self.$header.css( {
					opacity: 1
				} );
			} );

			$( document ).ready( function () {
				$( window ).afterResize( function () {
					self.updateSectionsHeight();
				} );
			} );

			return this;
		}
	};

	// expose to scope
	$.extend( theme, {
		PluginSectionScroll: PluginSectionScroll
	} );

	// jquery plugin
	$.fn.themePluginSectionScroll = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginSectionScroll( $this, opts );
			}

		} );
	};

} ).apply( this, [ window.theme, jQuery ] );

// Sort
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__sort';

	var PluginSort = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginSort.defaults = {
		useHash: true,
		itemSelector: '.isotope-item',
		layoutMode: 'masonry',
		filter: '*',
		hiddenStyle: {
			opacity: 0
		},
		visibleStyle: {
			opacity: 1
		},
		stagger: 30,
		isOriginLeft: ( $( 'html' ).attr( 'dir' ) == 'rtl' ? false : true )
	};

	PluginSort.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginSort.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			if ( !( $.isFunction( $.fn.isotope ) ) ) {
				return this;
			}

			var self = this,
				$source = this.options.wrapper,
				$destination = $( '.sort-destination[data-sort-id="' + $source.attr( 'data-sort-id' ) + '"]' ),
				$window = $( window );

			if ( $destination.get( 0 ) ) {

				self.$source = $source;
				self.$destination = $destination;
				self.$loader = false;

				self.setParagraphHeight( $destination );

				if ( self.$destination.parents( '.sort-destination-loader' ).get( 0 ) ) {
					self.$loader = self.$destination.parents( '.sort-destination-loader' );
					self.createLoader();
				}

				$destination.attr( 'data-filter', '*' );

				$destination.one( 'layoutComplete', function ( event, laidOutItems ) {
					self.removeLoader();
				} );

				// IE10/11 fix
				if ( $( 'html' ).hasClass( 'ie10' ) || $( 'html' ).hasClass( 'ie11' ) ) {
					var padding = parseInt( self.options.wrapper.children().css( 'padding-left' ) ) + parseInt( self.options.wrapper.children().css( 'padding-right' ) );
				}

				$destination.imagesLoaded( function () {
					$destination.isotope( $.extend( true, {}, self.options, {
						transitionDelay: 0, transitionDuration: '.5s',
						stagger: 0, hiddenStyle: {
							opacity: 0,
							transform: 'scale(0.001)'
						},
						visibleStyle: {
							opacity: 1,
							transform: 'scale(1)'
						}
					} ) );
					// $destination.isotope( self.options );
					self.events();
				} )

				// $destination.waitForImages(function() {
				// });


				setTimeout( function () {
					self.removeLoader();
				}, 3000 );

			}

			return this;
		},

		events: function () {
			var self = this,
				filter = null,
				$window = $( window );

			self.$source.find( 'a' ).click( function ( e ) {
				e.preventDefault();

				filter = $( this ).parent().data( 'option-value' );

				self.setFilter( filter );

				if ( e.originalEvent ) {
					self.$source.trigger( 'filtered' );
				}

				return this;
			} );

			self.$destination.trigger( 'filtered' );
			self.$source.trigger( 'filtered' );

			if ( self.options.useHash ) {
				self.hashEvents();
			}

			$window.on( 'resize', function () {
				setTimeout( function () {
					self.$destination.isotope( 'layout' );
				}, 300 );
			} );

			setTimeout( function () {
				$window.trigger( 'resize' );
			}, 300 );

			return this;
		},

		setFilter: function ( filter ) {
			var self = this,
				page = false,
				currentFilter = filter;

			self.$source.find( '.active' ).removeClass( 'active' );
			self.$source.find( 'li[data-option-value="' + filter + '"], li[data-option-value="' + filter + '"] > a' ).addClass( 'active' );

			self.options.filter = currentFilter;

			if ( self.$destination.attr( 'data-current-page' ) ) {
				currentFilter = currentFilter + '[data-page-rel=' + self.$destination.attr( 'data-current-page' ) + ']';
			}

			self.$destination.attr( 'data-filter', filter ).isotope( {
				filter: currentFilter
			} ).one( 'arrangeComplete', function ( event, filteredItems ) {

				if ( self.options.useHash ) {
					if ( window.location.hash != '' || self.options.filter.replace( '.', '' ) != '*' ) {
						window.location.hash = self.options.filter.replace( '.', '' );
					}
				}

				$( window ).trigger( 'scroll' );

			} ).trigger( 'filtered' );

			return this;
		},

		hashEvents: function () {
			var self = this,
				hash = null,
				hashFilter = null,
				initHashFilter = '.' + location.hash.replace( '#', '' );

			if ( initHashFilter != '.' && initHashFilter != '.*' ) {
				self.setFilter( initHashFilter );
			}

			$( window ).on( 'hashchange', function ( e ) {

				hashFilter = '.' + location.hash.replace( '#', '' );
				hash = ( hashFilter == '.' || hashFilter == '.*' ? '*' : hashFilter );

				self.setFilter( hash );

			} );

			return this;
		},

		setParagraphHeight: function () {
			var self = this,
				minParagraphHeight = 0,
				paragraphs = $( 'span.thumb-info-caption p', self.$destination );

			paragraphs.each( function () {
				if ( $( this ).height() > minParagraphHeight ) {
					minParagraphHeight = ( $( this ).height() + 10 );
				}
			} );

			paragraphs.height( minParagraphHeight );

			return this;
		},

		createLoader: function () {
			var self = this;

			var loaderTemplate = [
				'<div class="bounce-loader">',
				'<div class="bounce1"></div>',
				'<div class="bounce2"></div>',
				'<div class="bounce3"></div>',
				'</div>'
			].join( '' );

			self.$loader.append( loaderTemplate );

			return this;
		},

		removeLoader: function () {

			var self = this;

			if ( self.$loader ) {

				self.$loader.removeClass( 'sort-destination-loader-showing' );

				setTimeout( function () {
					self.$loader.addClass( 'sort-destination-loader-loaded' );
				}, 300 );

			}

		}

	};

	// expose to scope
	$.extend( theme, {
		PluginSort: PluginSort
	} );

	// jquery plugin
	$.fn.themePluginSort = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginSort( $this, opts );
			}

		} );
	}

} ).apply( this, [ window.theme, jQuery ] );

// Star Rating
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__starrating';

	var PluginStarRating = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginStarRating.defaults = {
		theme: 'krajee-fas',
		color: 'primary',
		showClear: false,
		showCaption: false
	};

	PluginStarRating.prototype = {
		initialize: function ( $el, opts ) {
			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginStarRating.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {

			if ( !( $.isFunction( $.fn.rating ) ) ) {
				return this;
			}

			var self = this;

			self.options.wrapper
				.rating( self.options );

			self.options.wrapper.parents( '.rating-container' )
				.addClass( 'rating-' + self.options.color );

			return this;

		}
	};

	// expose to scope
	$.extend( theme, {
		PluginStarRating: PluginStarRating
	} );

	// jquery plugin
	$.fn.themePluginStarRating = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginStarRating( $this, opts );
			}

		} );
	}

} ).apply( this, [ window.theme, jQuery ] );

// Sticky
( function ( theme, $ ) {

	theme = theme || {};

	var instanceName = '__sticky';

	var PluginSticky = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginSticky.defaults = {
		minWidth: 991,
		activeClass: 'sticky-active'
	};

	PluginSticky.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build()
				.events();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginSticky.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			if ( !( $.isFunction( $.fn.pin ) ) ) {
				return this;
			}

			var self = this,
				$window = $( window );

			self.options.wrapper.pin( self.options );

			if ( self.options.wrapper.hasClass( 'sticky-wrapper-transparent' ) ) {
				self.options.wrapper.parent().addClass( 'position-absolute w-100' );
			}

			$window.afterResize( function () {
				self.options.wrapper.removeAttr( 'style' ).removeData( 'pin' );
				self.options.wrapper.pin( self.options );
				$window.trigger( 'scroll' );
			} );

			// Change Logo Src
			if ( self.options.wrapper.find( 'img' ).attr( 'data-change-src' ) ) {
				var $logo = self.options.wrapper.find( 'img' ),
					logoSrc = $logo.attr( 'src' ),
					logoNewSrc = $logo.attr( 'data-change-src' );

				self.changeLogoSrc = function ( activate ) {
					if ( activate ) {
						$logo.attr( 'src', logoNewSrc );
					} else {
						$logo.attr( 'src', logoSrc );
					}
				}
			}

			return this;
		},

		events: function () {
			var self = this,
				$window = $( window ),
				$logo = self.options.wrapper.find( 'img' ),
				sticky_activate_flag = true,
				sticky_deactivate_flag = false,
				class_to_check = ( self.options.wrapper.hasClass( 'sticky-wrapper-effect-1' ) ) ? 'sticky-effect-active' : 'sticky-active';

			$window.on( 'scroll sticky.effect.active', function () {
				if ( self.options.wrapper.hasClass( class_to_check ) ) {
					if ( sticky_activate_flag ) {
						if ( $logo.attr( 'data-change-src' ) ) {
							self.changeLogoSrc( true );
						}

						sticky_activate_flag = false;
						sticky_deactivate_flag = true;
					}
				} else {
					if ( sticky_deactivate_flag ) {
						if ( $logo.attr( 'data-change-src' ) ) {
							self.changeLogoSrc( false );
						}

						sticky_deactivate_flag = false;
						sticky_activate_flag = true;
					}
				}
			} );

			var is_backing = false;
			if ( self.options.stickyStartEffectAt ) {

				// First Load
				if ( self.options.stickyStartEffectAt < $window.scrollTop() ) {
					self.options.wrapper.addClass( 'sticky-effect-active' );

					$window.trigger( 'sticky.effect.active' );
				}

				$window.on( 'scroll', function () {
					if ( self.options.stickyStartEffectAt < $window.scrollTop() ) {
						self.options.wrapper.addClass( 'sticky-effect-active' );
						is_backing = true;

						$window.trigger( 'sticky.effect.active' );
					} else {
						if ( is_backing ) {
							self.options.wrapper.find( '.sticky-body' ).addClass( 'position-fixed' );
							is_backing = false;
						}

						if ( $window.scrollTop() == 0 ) {
							self.options.wrapper.find( '.sticky-body' ).removeClass( 'position-fixed' );
						}

						self.options.wrapper.removeClass( 'sticky-effect-active' );
					}
				} );
			}
		}
	};

	// expose to scope
	$.extend( theme, {
		PluginSticky: PluginSticky
	} );

	// jquery plugin
	$.fn.themePluginSticky = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginSticky( $this, opts );
			}

		} );
	}

} ).apply( this, [ window.theme, jQuery ] );

// Validation
( function ( theme, $ ) {

	theme = theme || {};

	$.extend( theme, {

		PluginValidation: {

			defaults: {
				formClass: 'needs-validation',
				validator: {
					highlight: function ( element ) {
						$( element )
							.addClass( 'is-invalid' )
							.removeClass( 'is-valid' )
							.parent()
							.removeClass( 'has-success' )
							.addClass( 'has-danger' );
					},
					success: function ( label, element ) {
						$( element )
							.removeClass( 'is-invalid' )
							.addClass( 'is-valid' )
							.parent()
							.removeClass( 'has-danger' )
							.addClass( 'has-success' )
							.find( 'label.error' )
							.remove();
					},
					errorPlacement: function ( error, element ) {
						if ( element.attr( 'type' ) == 'radio' || element.attr( 'type' ) == 'checkbox' ) {
							error.appendTo( element.parent().parent() );
						} else {
							error.insertAfter( element );
						}
					}
				},
				validateCaptchaURL: 'php/contact-form-verify-captcha.php',
				refreshCaptchaURL: 'php/contact-form-refresh-captcha.php'
			},

			initialize: function ( opts ) {
				initialized = true;

				this
					.setOptions( opts )
					.build();

				return this;
			},

			setOptions: function ( opts ) {
				this.options = $.extend( true, {}, this.defaults, opts );

				return this;
			},

			build: function () {
				var self = this;

				if ( !( $.isFunction( $.validator ) ) ) {
					return this;
				}

				self.addMethods();
				self.setMessageGroups();

				$.validator.setDefaults( self.options.validator );

				$( '.' + self.options.formClass ).validate();

				return this;
			},

			addMethods: function () {
				var self = this;

				$.validator.addMethod( 'captcha', function ( value, element, params ) {
					var captchaValid = false;

					$.ajax( {
						url: self.options.validateCaptchaURL,
						type: 'POST',
						async: false,
						dataType: 'json',
						data: {
							captcha: $.trim( value )
						},
						success: function ( data ) {
							if ( data.response == 'success' ) {
								captchaValid = true;
							}
						}
					} );

					if ( captchaValid ) {
						return true;
					}

				}, '' );

				// Refresh Captcha
				$( '#refreshCaptcha' ).on( 'click', function ( e ) {
					e.preventDefault();
					$.get( self.options.refreshCaptchaURL, function ( url ) {
						$( '#captcha-image' ).attr( 'src', url );
					} );
				} );

			},

			setMessageGroups: function () {

				$( '.checkbox-group[data-msg-required], .radio-group[data-msg-required]' ).each( function () {
					var message = $( this ).data( 'msg-required' );
					$( this ).find( 'input' ).attr( 'data-msg-required', message );
				} );

			}

		}

	} );

} ).apply( this, [ window.theme, jQuery ] );

// Account
// ( function ( theme, $ ) {

// 	theme = theme || {};

// 	var initialized = false;

// 	$.extend( theme, {

// 		Account: {

// 			defaults: {
// 				wrapper: $( '#headerAccount' )
// 			},

// 			initialize: function ( $wrapper, opts ) {
// 				if ( initialized ) {
// 					return this;
// 				}

// 				initialized = true;
// 				this.$wrapper = ( $wrapper || this.defaults.wrapper );

// 				this
// 					.setOptions( opts )
// 					.events();

// 				return this;
// 			},

// 			setOptions: function ( opts ) {
// 				this.options = $.extend( true, {}, this.defaults, opts, theme.fn.getOptions( this.$wrapper.data( 'plugin-options' ) ) );

// 				return this;
// 			},

// 			events: function () {
// 				var self = this;

// 				$( window ).on( 'load', function () {
// 					$( document ).ready( function () {
// 						setTimeout( function () {

// 							self.$wrapper.find( 'input' ).on( 'focus', function () {
// 								self.$wrapper.addClass( 'open' );

// 								$( document ).mouseup( function ( e ) {
// 									if ( !self.$wrapper.is( e.target ) && self.$wrapper.has( e.target ).length === 0 ) {
// 										self.$wrapper.removeClass( 'open' );
// 									}
// 								} );
// 							} );

// 						}, 1500 );
// 					} );
// 				} );

// 				$( '#headerSignUp' ).on( 'click', function ( e ) {
// 					e.preventDefault();
// 					self.$wrapper.addClass( 'signup' ).removeClass( 'signin' ).removeClass( 'recover' );
// 					self.$wrapper.find( '.signup-form input:first' ).focus();
// 				} );

// 				$( '#headerSignIn' ).on( 'click', function ( e ) {
// 					e.preventDefault();
// 					self.$wrapper.addClass( 'signin' ).removeClass( 'signup' ).removeClass( 'recover' );
// 					self.$wrapper.find( '.signin-form input:first' ).focus();
// 				} );

// 				$( '#headerRecover' ).on( 'click', function ( e ) {
// 					e.preventDefault();
// 					self.$wrapper.addClass( 'recover' ).removeClass( 'signup' ).removeClass( 'signin' );
// 					self.$wrapper.find( '.recover-form input:first' ).focus();
// 				} );

// 				$( '#headerRecoverCancel' ).on( 'click', function ( e ) {
// 					e.preventDefault();
// 					self.$wrapper.addClass( 'signin' ).removeClass( 'signup' ).removeClass( 'recover' );
// 					self.$wrapper.find( '.signin-form input:first' ).focus();
// 				} );
// 			}

// 		}

// 	} );

// } ).apply( this, [ window.theme, jQuery ] );

// Nav
( function ( theme, $ ) {

	theme = theme || {};

	var initialized = false;

	$.extend( theme, {

		Nav: {

			defaults: {
				wrapper: $( '#mainNav' ),
				scrollDelay: 600,
				scrollAnimation: 'easeOutQuad'
			},

			initialize: function ( $wrapper, opts ) {
				if ( initialized ) {
					return this;
				}

				initialized = true;
				this.$wrapper = ( $wrapper || this.defaults.wrapper );

				this
					.setOptions( opts )
					.build()
					.events();

				return this;
			},

			setOptions: function ( opts ) {
				this.options = $.extend( true, {}, this.defaults, opts, theme.fn.getOptions( this.$wrapper.data( 'plugin-options' ) ) );

				return this;
			},

			build: function () {
				var self = this,
					$html = $( 'html' ),
					$header = $( '#header' ),
					$headerNavMain = $( '#header .header-nav-main' ),
					thumbInfoPreview;

				// Preview Thumbs
				self.$wrapper.find( 'a[data-thumb-preview]' ).each( function () {
					thumbInfoPreview = $( '<span />' ).addClass( 'thumb-info thumb-info-preview' )
						.append( $( '<span />' ).addClass( 'thumb-info-wrapper' )
							.append( $( '<span />' ).addClass( 'thumb-info-image' ).css( 'background-image', 'url(' + $( this ).data( 'thumb-preview' ) + ')' )
							)
						);

					$( this ).append( thumbInfoPreview );
				} );

				// Side Header / Side Header Hamburguer Sidebar (Reverse Dropdown)
				if ( $html.hasClass( 'side-header' ) || $html.hasClass( 'side-header-hamburguer-sidebar' ) ) {

					// Side Header Right / Side Header Hamburguer Sidebar Right
					if ( $html.hasClass( 'side-header-right' ) || $html.hasClass( 'side-header-hamburguer-sidebar-right' ) ) {
						if ( !$html.hasClass( 'side-header-right-no-reverse' ) ) {
							$header.find( '.dropdown-submenu' ).addClass( 'dropdown-reverse' );
						}
					}

				} else {

					// Reverse
					self.checkReverse = function () {
						self.$wrapper.find( '.dropdown, .dropdown-submenu' ).removeClass( 'dropdown-reverse' );

						self.$wrapper.find( '.dropdown:not(.manual):not(.dropdown-mega), .dropdown-submenu:not(.manual)' ).each( function () {
							if ( !$( this ).find( '.dropdown-menu' ).visible( false, true, 'horizontal' ) ) {
								$( this ).addClass( 'dropdown-reverse' );
							}
						} );
					}

					self.checkReverse();

					$( window ).on( 'resize', function () {
						self.checkReverse();
					} );

				}

				// Clone Items
				if ( $headerNavMain.hasClass( 'header-nav-main-clone-items' ) ) {

					$headerNavMain.find( 'nav > ul > li > a' ).each( function () {
						var parent = $( this ).parent(),
							clone = $( this ).clone(),
							clone2 = $( this ).clone(),
							wrapper = $( '<span class="wrapper-items-cloned"></span>' );

						// Config Classes
						$( this ).addClass( 'item-original' );
						clone2.addClass( 'item-two' );

						// Insert on DOM
						parent.prepend( wrapper );
						wrapper.append( clone ).append( clone2 );
					} );

				}

				// Floating
				if ( $( '#header.header-floating-icons' ).get( 0 ) && $( window ).width() > 991 ) {

					var menuFloatingAnim = {
						$menuFloating: $( '#header.header-floating-icons .header-container > .header-row' ),

						build: function () {
							var self = this;

							self.init();
						},
						init: function () {
							var self = this,
								divisor = 0;

							$( window ).scroll( function () {
								var scrollPercent = 100 * $( window ).scrollTop() / ( $( document ).height() - $( window ).height() ),
									st = $( this ).scrollTop();

								divisor = $( document ).height() / $( window ).height();

								self.$menuFloating.find( '.header-column > .header-row' ).css( {
									transform: 'translateY( calc(' + scrollPercent + 'vh - ' + st / divisor + 'px) )'
								} );
							} );
						}
					}

					menuFloatingAnim.build();

				}

				// Slide
				if ( $( '.header-nav-links-vertical-slide' ).get( 0 ) ) {
					var slideNavigation = {
						$mainNav: $( '#mainNav' ),
						$mainNavItem: $( '#mainNav li' ),

						build: function () {
							var self = this;

							self.menuNav();
						},
						menuNav: function () {
							var self = this;

							self.$mainNavItem.on( 'click', function ( e ) {
								var currentMenuItem = $( this ),
									currentMenu = $( this ).parent(),
									nextMenu = $( this ).find( 'ul' ).first(),
									prevMenu = $( this ).closest( '.next-menu' ),
									isSubMenu = currentMenuItem.hasClass( 'dropdown' ) || currentMenuItem.hasClass( 'dropdown-submenu' ),
									isBack = currentMenuItem.hasClass( 'back-button' ),
									nextMenuHeightDiff = ( ( nextMenu.find( '> li' ).length * nextMenu.find( '> li' ).outerHeight() ) - nextMenu.outerHeight() ),
									prevMenuHeightDiff = ( ( prevMenu.find( '> li' ).length * prevMenu.find( '> li' ).outerHeight() ) - prevMenu.outerHeight() );

								if ( isSubMenu ) {
									currentMenu.addClass( 'next-menu' );
									nextMenu.addClass( 'visible' );
									currentMenu.css( {
										overflow: 'visible',
										'overflow-y': 'visible'
									} );

									if ( nextMenuHeightDiff > 0 ) {
										nextMenu.css( {
											overflow: 'hidden',
											'overflow-y': 'scroll'
										} );
									}

									for ( i = 0; i < nextMenu.find( '> li' ).length; i++ ) {
										if ( nextMenu.outerHeight() < ( $( '.header-row-side-header' ).outerHeight() - 100 ) ) {
											nextMenu.css( {
												height: nextMenu.outerHeight() + nextMenu.find( '> li' ).outerHeight()
											} );
										}
									}

									nextMenu.css( {
										'padding-top': nextMenuHeightDiff + 'px'
									} );
								}

								if ( isBack ) {
									currentMenu.parent().parent().removeClass( 'next-menu' );
									currentMenu.removeClass( 'visible' );

									if ( prevMenuHeightDiff > 0 ) {
										prevMenu.css( {
											overflow: 'hidden',
											'overflow-y': 'scroll'
										} );
									}
								}

								e.stopPropagation();
							} );
						}
					}

					$( window ).trigger( 'resize' );

					if ( $( window ).width() > 991 ) {
						slideNavigation.build();
					}

					$( document ).ready( function () {
						$( window ).afterResize( function () {
							if ( $( window ).width() > 991 ) {
								slideNavigation.build();
							}
						} );
					} );
				}

				// Header Nav Main Mobile Dark
				if ( $( '.header-nav-main-mobile-dark' ).get( 0 ) ) {
					$( '#header:not(.header-transparent-dark-bottom-border):not(.header-transparent-light-bottom-border)' ).addClass( 'header-no-border-bottom' );
				}

				return this;
			},

			events: function () {
				var self = this,
					$html = $( 'html' ),
					$header = $( '#header' ),
					$window = $( window ),
					headerBodyHeight = $( '.header-body' ).outerHeight();

				$header.find( 'a[href="#"]' ).on( 'click', function ( e ) {
					e.preventDefault();
				} );

				// Mobile Arrows
				$header.find( '.dropdown-toggle, .dropdown-submenu > a' )
					.append( '<i class="fas fa-chevron-down"></i>' );

				$header.find( '.dropdown-toggle[href="#"], .dropdown-submenu a[href="#"], .dropdown-toggle[href!="#"] .fa-chevron-down, .dropdown-submenu a[href!="#"] .fa-chevron-down' ).on( 'click', function ( e ) {
					e.preventDefault();
					if ( $window.width() < 992 ) {
						$( this ).closest( 'li' ).toggleClass( 'open' );

						// Adjust Header Body Height
						var height = ( $header.hasClass( 'header-effect-shrink' ) && $html.hasClass( 'sticky-header-active' ) ) ? theme.StickyHeader.options.stickyHeaderContainerHeight : headerBodyHeight;
						$( '.header-body' ).animate( {
							height: ( $( '.header-nav-main nav' ).outerHeight( true ) + height ) + 10
						}, 0 );
					}
				} );

				$header.find( 'li a.active' ).addClass( 'current-page-active' );

				// Add Open Class
				$header.find( '.header-nav-click-to-open .dropdown-toggle[href="#"], .header-nav-click-to-open .dropdown-submenu a[href="#"], .header-nav-click-to-open .dropdown-toggle > i' ).on( 'click', function ( e ) {
					e.preventDefault();
					e.stopPropagation();
					if ( $window.width() > 991 ) {

						$header.find( 'li a.active' ).removeClass( 'active' );

						if ( $( this ).prop( 'tagName' ) == 'I' ) {
							$( this ).parent().addClass( 'active' );
						} else {
							$( this ).addClass( 'active' );
						}

						if ( !$( this ).closest( 'li' ).hasClass( 'open' ) ) {

							var $li = $( this ).closest( 'li' ),
								isSub = false;

							if ( $( this ).parent().hasClass( 'dropdown-submenu' ) ) {
								isSub = true;
							}

							$( this ).closest( '.dropdown-menu' ).find( '.dropdown-submenu.open' ).removeClass( 'open' );
							$( this ).parent( '.dropdown' ).parent().find( '.dropdown.open' ).removeClass( 'open' );

							if ( !isSub ) {
								$( this ).parent().find( '.dropdown-submenu.open' ).removeClass( 'open' );
							}

							$li.addClass( 'open' );

							$( document ).off( 'click.nav-click-to-open' ).on( 'click.nav-click-to-open', function ( e ) {
								if ( !$li.is( e.target ) && $li.has( e.target ).length === 0 ) {
									$li.removeClass( 'open' );
									$li.parents( '.open' ).removeClass( 'open' );
									$header.find( 'li a.active' ).removeClass( 'active' );
									$header.find( 'li a.current-page-active' ).addClass( 'active' );
								}
							} );

						} else {
							$( this ).closest( 'li' ).removeClass( 'open' );
							$header.find( 'li a.active' ).removeClass( 'active' );
							$header.find( 'li a.current-page-active' ).addClass( 'active' );
						}

						$window.trigger( {
							type: 'resize',
							from: 'header-nav-click-to-open'
						} );
					}
				} );

				// Collapse Nav
				$header.find( '[data-collapse-nav]' ).on( 'click', function ( e ) {
					$( this ).parents( '.collapse' ).removeClass( 'show' );
				} );

				// Top Features
				$header.find( '.header-nav-features-toggle' ).on( 'click', function ( e ) {
					e.preventDefault();

					var $toggleParent = $( this ).parent();

					if ( !$( this ).siblings( '.header-nav-features-dropdown' ).hasClass( 'show' ) ) {

						var $dropdown = $( this ).siblings( '.header-nav-features-dropdown' );

						$( '.header-nav-features-dropdown.show' ).removeClass( 'show' );

						$dropdown.addClass( 'show' );

						$( document ).off( 'click.header-nav-features-toggle' ).on( 'click.header-nav-features-toggle', function ( e ) {
							if ( !$toggleParent.is( e.target ) && $toggleParent.has( e.target ).length === 0 ) {
								$( '.header-nav-features-dropdown.show' ).removeClass( 'show' );
							}
						} );

						if ( $( this ).attr( 'data-focus' ) ) {
							$( '#' + $( this ).attr( 'data-focus' ) ).focus();
						}

					} else {
						$( this ).siblings( '.header-nav-features-dropdown' ).removeClass( 'show' );
					}
				} );

				// Hamburguer Menu
				var $hamburguerMenuBtn = $( '.hamburguer-btn:not(.side-panel-toggle)' ),
					$hamburguerSideHeader = $( '#header.side-header, #header.side-header-overlay-full-screen' );

				$hamburguerMenuBtn.on( 'click', function () {
					if ( $( this ).attr( 'data-set-active' ) != 'false' ) {
						$( this ).toggleClass( 'active' );
					}
					$hamburguerSideHeader.toggleClass( 'side-header-hide' );
					$html.toggleClass( 'side-header-hide' );

					$window.trigger( 'resize' );
				} );

				$( '.hamburguer-close:not(.side-panel-toggle)' ).on( 'click', function () {
					$( '.hamburguer-btn:not(.hamburguer-btn-side-header-mobile-show)' ).trigger( 'click' );
				} );

				// Set Header Body Height when open mobile menu
				$( '.header-nav-main nav' ).on( 'show.bs.collapse', function () {
					$( this ).removeClass( 'closed' );

					// Add Mobile Menu Opened Class
					$( 'html' ).addClass( 'mobile-menu-opened' );

					$( '.header-body' ).animate( {
						height: ( $( '.header-body' ).outerHeight() + $( '.header-nav-main nav' ).outerHeight( true ) ) + 10
					} );

					// Header Below Slider / Header Bottom Slider - Scroll to menu position
					if ( $( '#header' ).is( '.header-bottom-slider, .header-below-slider' ) && !$( 'html' ).hasClass( 'sticky-header-active' ) ) {
						self.scrollToTarget( $( '#header' ), 0 );
					}
				} );

				// Set Header Body Height when collapse mobile menu
				$( '.header-nav-main nav' ).on( 'hide.bs.collapse', function () {
					$( this ).addClass( 'closed' );

					// Remove Mobile Menu Opened Class
					$( 'html' ).removeClass( 'mobile-menu-opened' );

					$( '.header-body' ).animate( {
						height: ( $( '.header-body' ).outerHeight() - $( '.header-nav-main nav' ).outerHeight( true ) )
					}, function () {
						$( this ).height( 'auto' );
					} );
				} );

				// Header Effect Shrink - Adjust header body height on mobile
				$window.on( 'stickyHeader.activate', function () {
					if ( $window.width() < 992 && $header.hasClass( 'header-effect-shrink' ) ) {
						if ( $( '.header-btn-collapse-nav' ).attr( 'aria-expanded' ) == 'true' ) {
							$( '.header-body' ).animate( {
								height: ( $( '.header-nav-main nav' ).outerHeight( true ) + theme.StickyHeader.options.stickyHeaderContainerHeight ) + ( ( $( '.header-nav-bar' ).get( 0 ) ) ? $( '.header-nav-bar' ).outerHeight() : 0 )
							} );
						}
					}
				} );

				$window.on( 'stickyHeader.deactivate', function () {
					if ( $window.width() < 992 && $header.hasClass( 'header-effect-shrink' ) ) {
						if ( $( '.header-btn-collapse-nav' ).attr( 'aria-expanded' ) == 'true' ) {
							$( '.header-body' ).animate( {
								height: headerBodyHeight + $( '.header-nav-main nav' ).outerHeight( true ) + 10
							} );
						}
					}
				} );

				// Remove Open Class on Resize		
				$window.on( 'resize.removeOpen', function ( e ) {
					if ( e.from == 'header-nav-click-to-open' ) {
						return;
					}

					setTimeout( function () {
						if ( $window.width() > 991 ) {
							$header.find( '.dropdown.open' ).removeClass( 'open' );
						}
					}, 100 );
				} );

				// Side Header - Change value of initial header body height
				$( document ).ready( function () {
					if ( $window.width() > 991 ) {
						var flag = false;

						$window.on( 'resize', function ( e ) {
							if ( e.from == 'header-nav-click-to-open' ) {
								return;
							}

							$header.find( '.dropdown.open' ).removeClass( 'open' );

							if ( $window.width() < 992 && flag == false ) {
								headerBodyHeight = $( '.header-body' ).outerHeight();
								flag = true;

								setTimeout( function () {
									flag = false;
								}, 500 );
							}
						} );
					}
				} );

				// Side Header - Set header height on mobile
				if ( $html.hasClass( 'side-header' ) ) {
					if ( $window.width() < 992 ) {
						$header.css( {
							height: $( '.header-body .header-container' ).outerHeight() + ( parseInt( $( '.header-body' ).css( 'border-top-width' ) ) + parseInt( $( '.header-body' ).css( 'border-bottom-width' ) ) )
						} );
					}

					$( document ).ready( function () {
						$window.afterResize( function () {
							if ( $window.width() < 992 ) {
								$header.css( {
									height: $( '.header-body .header-container' ).outerHeight() + ( parseInt( $( '.header-body' ).css( 'border-top-width' ) ) + parseInt( $( '.header-body' ).css( 'border-bottom-width' ) ) )
								} );
							} else {
								$header.css( {
									height: ''
								} );
							}
						} );
					} );
				}

				// Anchors Position
				$( '[data-hash]' ).each( function () {

					var target = $( this ).attr( 'href' ),
						offset = ( $( this ).is( "[data-hash-offset]" ) ? $( this ).data( 'hash-offset' ) : 0 );

					if ( $( target ).get( 0 ) ) {
						$( this ).on( 'click', function ( e ) {
							e.preventDefault();

							if ( !$( e.target ).is( 'i' ) ) {

								// Close Collapse if open
								$( this ).parents( '.collapse.show' ).collapse( 'hide' );

								// Close Side Header
								$hamburguerSideHeader.addClass( 'side-header-hide' );
								$html.addClass( 'side-header-hide' );

								$window.trigger( 'resize' );

								self.scrollToTarget( target, offset );

							}

							return;
						} );
					}

				} );

				// Floating
				if ( $( '#header.header-floating-icons' ).get( 0 ) ) {

					$( '#header.header-floating-icons [data-hash]' ).off().each( function () {

						var target = $( this ).attr( 'href' ),
							offset = ( $( this ).is( "[data-hash-offset]" ) ? $( this ).data( 'hash-offset' ) : 0 );

						if ( $( target ).get( 0 ) ) {
							$( this ).on( 'click', function ( e ) {
								e.preventDefault();

								$( 'html, body' ).animate( {
									scrollTop: $( target ).offset().top - offset
								}, 600, 'easeOutQuad', function () {

								} );

								return;
							} );
						}

					} );

				}

				// Side Panel Toggle
				if ( $( '.side-panel-toggle' ).get( 0 ) ) {
					var init_html_class = $( 'html' ).attr( 'class' );

					$( '.side-panel-toggle' ).on( 'click', function ( e ) {
						var extra_class = $( this ).data( 'extra-class' ),
							delay = ( extra_class ) ? 100 : 0;

						e.preventDefault();

						if ( $( this ).hasClass( 'active' ) ) {
							$( 'html' ).removeClass( 'side-panel-open' );
							$( '.hamburguer-btn.side-panel-toggle:not(.side-panel-close)' ).removeClass( 'active' );
							return false;
						}

						if ( extra_class ) {
							$( '.side-panel-wrapper' ).css( 'transition', 'none' );
							$( 'html' )
								.removeClass()
								.addClass( init_html_class )
								.addClass( extra_class );
						}

						setTimeout( function () {
							$( '.side-panel-wrapper' ).css( 'transition', '' );
							$( 'html' ).toggleClass( 'side-panel-open' );
						}, delay );
					} );

					$( document ).on( 'click', function ( e ) {
						if ( !$( e.target ).closest( '.side-panel-wrapper' ).get( 0 ) && !$( e.target ).hasClass( 'side-panel-toggle' ) ) {
							$( '.hamburguer-btn.side-panel-toggle:not(.side-panel-close)' ).removeClass( 'active' );
							$( 'html' ).removeClass( 'side-panel-open' );
						}
					} );
				}

				return this;
			},

			scrollToTarget: function ( target, offset ) {
				var self = this;

				$( 'body' ).addClass( 'scrolling' );

				$( 'html, body' ).animate( {
					scrollTop: $( target ).offset().top - offset
				}, self.options.scrollDelay, self.options.scrollAnimation, function () {
					$( 'body' ).removeClass( 'scrolling' );
				} );

				return this;

			}

		}

	} );

} ).apply( this, [ window.theme, jQuery ] );

// Sticky Header
( function ( theme, $ ) {

	theme = theme || {};

	var initialized = false;

	$.extend( theme, {

		StickyHeader: {

			defaults: {
				wrapper: $( '#header' ),
				headerBody: $( '#header .header-body' ),
				stickyEnabled: true,
				stickyEnableOnBoxed: true,
				stickyEnableOnMobile: true,
				stickyStartAt: 0,
				stickyStartAtElement: false,
				stickySetTop: 0,
				stickyEffect: '',
				stickyHeaderContainerHeight: false,
				stickyChangeLogo: false,
				stickyChangeLogoWrapper: true
			},

			initialize: function ( $wrapper, opts ) {
				if ( initialized ) {
					return this;
				}

				initialized = true;
				this.$wrapper = ( $wrapper || this.defaults.wrapper );

				this
					.setOptions( opts )
					.build()
					.events();

				return this;
			},

			setOptions: function ( opts ) {
				this.options = $.extend( true, {}, this.defaults, opts, theme.fn.getOptions( this.$wrapper.data( 'plugin-options' ) ) );

				return this;
			},

			build: function () {
				if ( !this.options.stickyEnableOnBoxed && $( 'html' ).hasClass( 'boxed' ) || $( 'html' ).hasClass( 'side-header-hamburguer-sidebar' ) || !this.options.stickyEnabled ) {
					return this;
				}

				var self = this,
					$html = $( 'html' ),
					$window = $( window ),
					sideHeader = $html.hasClass( 'side-header' ),
					initialHeaderTopHeight = self.options.wrapper.find( '.header-top' ).outerHeight(),
					initialHeaderContainerHeight = self.options.wrapper.find( '.header-container' ).outerHeight(),
					minHeight;

				// HTML Classes
				$html.addClass( 'sticky-header-enabled' );

				if ( parseInt( self.options.stickySetTop ) < 0 ) {
					$html.addClass( 'sticky-header-negative' );
				}

				// Set Start At
				if ( self.options.stickyStartAtElement ) {

					var $stickyStartAtElement = $( self.options.stickyStartAtElement );

					$( window ).on( 'scroll resize', function () {
						self.options.stickyStartAt = $stickyStartAtElement.offset().top;
					} );

					$( window ).trigger( 'resize' );
				}

				// Define Min Height value
				if ( self.options.wrapper.find( '.header-top' ).get( 0 ) ) {
					minHeight = ( initialHeaderTopHeight + initialHeaderContainerHeight );
				} else {
					minHeight = initialHeaderContainerHeight;
				}

				// Set Wrapper Min-Height
				if ( !sideHeader ) {
					if ( !$( '.header-logo-sticky-change' ).get( 0 ) ) {
						self.options.wrapper.css( 'height', self.options.headerBody.outerHeight() );
					} else {
						$window.on( 'stickyChangeLogo.loaded', function () {
							self.options.wrapper.css( 'height', self.options.headerBody.outerHeight() );
						} );
					}

					if ( self.options.stickyEffect == 'shrink' ) {

						// Prevent wrong visualization of header when reload on middle of page
						$( document ).ready( function () {
							if ( $window.scrollTop() >= self.options.stickyStartAt ) {
								self.options.wrapper.find( '.header-container' ).on( 'transitionend webkitTransitionEnd oTransitionEnd', function () {
									self.options.headerBody.css( 'position', 'fixed' );
								} );
							} else {
								self.options.headerBody.css( 'position', 'fixed' );
							}
						} );

						self.options.wrapper.find( '.header-container' ).css( 'height', initialHeaderContainerHeight );
						self.options.wrapper.find( '.header-top' ).css( 'height', initialHeaderTopHeight );
					}
				}

				// Sticky Header Container Height
				if ( self.options.stickyHeaderContainerHeight ) {
					self.options.wrapper.find( '.header-container' ).css( 'height', self.options.wrapper.find( '.header-container' ).outerHeight() );
				}

				// Boxed
				if ( $html.hasClass( 'boxed' ) && self.options.stickyEffect == 'shrink' ) {
					if ( ( parseInt( self.options.stickyStartAt ) == 0 ) && $window.width() > 991 ) {
						self.options.stickyStartAt = 30;
					}

					// Set Header Body Position Absolute
					self.options.headerBody.css( 'position', 'absolute' );

					// Set position absolute because top margin from boxed layout
					$window.on( 'scroll', function () {
						if ( $window.scrollTop() > $( '.body' ).offset().top ) {
							self.options.headerBody.css( {
								'position': 'fixed',
								'top': 0
							} );
						} else {
							self.options.headerBody.css( {
								'position': 'absolute',
								'top': 0
							} );
						}
					} );
				}

				// Check Sticky Header / Flags prevent multiple runs at same time
				var activate_flag = true,
					deactivate_flag = false;

				self.checkStickyHeader = function () {
					if ( $window.width() > 991 && $html.hasClass( 'side-header' ) ) {
						$html.removeClass( 'sticky-header-active' );
						activate_flag = true;
						return;
					}

					if ( $window.scrollTop() >= parseInt( self.options.stickyStartAt ) ) {
						if ( activate_flag ) {
							self.activateStickyHeader();
							activate_flag = false;
							deactivate_flag = true;
						}
					} else {
						if ( deactivate_flag ) {
							self.deactivateStickyHeader();
							deactivate_flag = false;
							activate_flag = true;
						}
					}
				};

				// Activate Sticky Header
				self.activateStickyHeader = function () {

					if ( $window.width() < 992 ) {
						if ( !self.options.stickyEnableOnMobile ) {
							self.deactivateStickyHeader();
							return;
						}
					} else {
						if ( sideHeader ) {
							self.deactivateStickyHeader();
							return;
						}
					}

					$html.addClass( 'sticky-header-active' );

					// Sticky Effect - Reveal
					if ( self.options.stickyEffect == 'reveal' ) {

						self.options.headerBody.css( 'top', '-' + self.options.stickyStartAt + 'px' );

						self.options.headerBody.animate( {
							top: self.options.stickySetTop
						}, 400, function () { } );

					}

					// Sticky Effect - Shrink
					if ( self.options.stickyEffect == 'shrink' ) {

						// If Header Top
						if ( self.options.wrapper.find( '.header-top' ).get( 0 ) ) {
							self.options.wrapper.find( '.header-top' ).css( {
								height: 0,
								'min-height': 0,
								overflow: 'hidden'
							} );
						}

						// Header Container
						if ( self.options.stickyHeaderContainerHeight ) {
							self.options.wrapper.find( '.header-container' ).css( {
								height: self.options.stickyHeaderContainerHeight,
								'min-height': 0
							} );
						} else {
							self.options.wrapper.find( '.header-container' ).css( {
								height: ( initialHeaderContainerHeight / 3 ) * 2, // two third of container height
								'min-height': 0
							} );

							var y = initialHeaderContainerHeight - ( ( initialHeaderContainerHeight / 3 ) * 2 );
							$( '.main' ).css( {
								transform: 'translate3d(0, -' + y + 'px, 0)',
								transition: 'ease transform 300ms'
							} );

							if ( $html.hasClass( 'boxed' ) ) {
								self.options.headerBody.css( 'position', 'fixed' );
							}
						}

					}

					self.options.headerBody.css( 'top', self.options.stickySetTop );

					if ( self.options.stickyChangeLogo ) {
						self.changeLogo( true );
					}

					// Set Elements Style
					$( '[data-sticky-header-style]' ).each( function () {
						var $el = $( this ),
							css = theme.fn.getOptions( $el.data( 'sticky-header-style-active' ) ),
							opts = theme.fn.getOptions( $el.data( 'sticky-header-style' ) );

						if ( $window.width() > opts.minResolution ) {
							$el.css( css );
						}
					} );

					$.event.trigger( {
						type: 'stickyHeader.activate'
					} );
				};

				// Deactivate Sticky Header
				self.deactivateStickyHeader = function () {

					$html.removeClass( 'sticky-header-active' );

					// Sticky Effect - Shrink
					if ( self.options.stickyEffect == 'shrink' ) {

						// Boxed Layout
						if ( $html.hasClass( 'boxed' ) ) {

							// Set Header Body Position Absolute
							self.options.headerBody.css( 'position', 'absolute' );

							if ( $window.scrollTop() > $( '.body' ).offset().top ) {
								// Set Header Body Position Fixed
								self.options.headerBody.css( 'position', 'fixed' );
							}

						} else {
							// Set Header Body Position Fixed
							self.options.headerBody.css( 'position', 'fixed' );
						}

						// If Header Top
						if ( self.options.wrapper.find( '.header-top' ).get( 0 ) ) {
							self.options.wrapper.find( '.header-top' ).css( {
								height: initialHeaderTopHeight,
								overflow: 'visible'
							} );
						}

						// Header Container
						self.options.wrapper.find( '.header-container' ).css( {
							height: initialHeaderContainerHeight
						} );

					}

					self.options.headerBody.css( 'top', 0 );

					if ( self.options.stickyChangeLogo ) {
						self.changeLogo( false );
					}

					// Set Elements Style
					$( '[data-sticky-header-style]' ).each( function () {
						var $el = $( this ),
							css = theme.fn.getOptions( $el.data( 'sticky-header-style-deactive' ) ),
							opts = theme.fn.getOptions( $el.data( 'sticky-header-style' ) );

						if ( $window.width() > opts.minResolution ) {
							$el.css( css );
						}
					} );

					$.event.trigger( {
						type: 'stickyHeader.deactivate'
					} );
				};

				// Always Sticky
				if ( parseInt( self.options.stickyStartAt ) <= 0 ) {
					self.activateStickyHeader();
				}

				// Notice Top Bar
				if ( $( '.notice-top-bar' ).get( 0 ) ) {
					self.options.stickyStartAt = $( '.notice-top-bar' ).outerHeight();
				}

				// Set Logo
				if ( self.options.stickyChangeLogo ) {

					var $logoWrapper = self.options.wrapper.find( '.header-logo' ),
						$logo = $logoWrapper.find( 'img' ),
						logoWidth = $logo.attr( 'width' ),
						logoHeight = $logo.attr( 'height' ),
						logoSmallTop = parseInt( $logo.attr( 'data-sticky-top' ) ? $logo.attr( 'data-sticky-top' ) : 0 ),
						logoSmallWidth = parseInt( $logo.attr( 'data-sticky-width' ) ? $logo.attr( 'data-sticky-width' ) : 'auto' ),
						logoSmallHeight = parseInt( $logo.attr( 'data-sticky-height' ) ? $logo.attr( 'data-sticky-height' ) : 'auto' );

					if ( self.options.stickyChangeLogoWrapper ) {
						$logoWrapper.css( {
							'width': $logo.outerWidth( true ),
							'height': $logo.outerHeight( true )
						} );
					}

					self.changeLogo = function ( activate ) {
						if ( activate ) {

							$logo.css( {
								'top': logoSmallTop,
								'width': logoSmallWidth,
								'height': logoSmallHeight
							} );

						} else {

							$logo.css( {
								'top': 0,
								'width': logoWidth,
								'height': logoHeight
							} );

						}
					}

					$.event.trigger( {
						type: 'stickyChangeLogo.loaded'
					} );

				}

				// Side Header
				var headerBodyHeight,
					flag = false;

				self.checkSideHeader = function () {
					if ( $window.width() < 992 && flag == false ) {
						headerBodyHeight = self.options.headerBody.height();
						flag = true;
					}

					if ( self.options.stickyStartAt == 0 && sideHeader ) {
						self.options.wrapper.css( 'min-height', 0 );
					}

					if ( self.options.stickyStartAt > 0 && sideHeader && $window.width() < 992 ) {
						self.options.wrapper.css( 'min-height', headerBodyHeight );
					}
				}

				return this;
			},

			events: function () {
				var self = this;

				if ( !this.options.stickyEnableOnBoxed && $( 'body' ).hasClass( 'boxed' ) || $( 'html' ).hasClass( 'side-header-hamburguer-sidebar' ) || !this.options.stickyEnabled ) {
					return this;
				}

				if ( !self.options.alwaysStickyEnabled ) {
					$( window ).on( 'scroll resize', function () {
						self.checkStickyHeader();
					} );
				} else {
					self.activateStickyHeader();
				}

				$( window ).on( 'load resize', function () {
					self.checkSideHeader();
				} );

				return this;
			}

		}

	} );

} ).apply( this, [ window.theme, jQuery ] );

/**
 * jQuery || Zepto Parallax Plugin
 * @author Matthew Wagerfield - @wagerfield
 * @description Creates a parallax effect between an array of layers,
 *              driving the motion from the gyroscope output of a smartdevice.
 *              If no gyroscope is available, the cursor position is used.
 */
/*
 ; ( function ( $, window, document, undefined ) {

	// Strict Mode
	'use strict';

	// Constants
	var NAME = 'parallax';
	var MAGIC_NUMBER = 30;
	var DEFAULTS = {
		relativeInput: false,
		clipRelativeInput: false,
		calibrationThreshold: 100,
		calibrationDelay: 500,
		supportDelay: 500,
		calibrateX: false,
		calibrateY: true,
		invertX: true,
		invertY: true,
		limitX: false,
		limitY: false,
		scalarX: 10.0,
		scalarY: 10.0,
		frictionX: 0.1,
		frictionY: 0.1,
		originX: 0.5,
		originY: 0.5,
		pointerEvents: true,
		precision: 1
	};

	function Plugin( element, options ) {

		// DOM Context
		this.element = element;

		// Selections
		this.$context = $( element ).data( 'api', this );
		this.$layers = this.$context.find( '.layer' );

		// Data Extraction
		var data = {
			calibrateX: this.$context.data( 'calibrate-x' ) || null,
			calibrateY: this.$context.data( 'calibrate-y' ) || null,
			invertX: this.$context.data( 'invert-x' ) || null,
			invertY: this.$context.data( 'invert-y' ) || null,
			limitX: parseFloat( this.$context.data( 'limit-x' ) ) || null,
			limitY: parseFloat( this.$context.data( 'limit-y' ) ) || null,
			scalarX: parseFloat( this.$context.data( 'scalar-x' ) ) || null,
			scalarY: parseFloat( this.$context.data( 'scalar-y' ) ) || null,
			frictionX: parseFloat( this.$context.data( 'friction-x' ) ) || null,
			frictionY: parseFloat( this.$context.data( 'friction-y' ) ) || null,
			originX: parseFloat( this.$context.data( 'origin-x' ) ) || null,
			originY: parseFloat( this.$context.data( 'origin-y' ) ) || null,
			pointerEvents: this.$context.data( 'pointer-events' ) || true,
			precision: parseFloat( this.$context.data( 'precision' ) ) || 1
		};

		// Delete Null Data Values
		for ( var key in data ) {
			if ( data[ key ] === null ) delete data[ key ];
		}

		// Compose Settings Object
		$.extend( this, DEFAULTS, options, data );

		// States
		this.calibrationTimer = null;
		this.calibrationFlag = true;
		this.enabled = false;
		this.depthsX = [];
		this.depthsY = [];
		this.raf = null;

		// Element Bounds
		this.bounds = null;
		this.ex = 0;
		this.ey = 0;
		this.ew = 0;
		this.eh = 0;

		// Element Center
		this.ecx = 0;
		this.ecy = 0;

		// Element Range
		this.erx = 0;
		this.ery = 0;

		// Calibration
		this.cx = 0;
		this.cy = 0;

		// Input
		this.ix = 0;
		this.iy = 0;

		// Motion
		this.mx = 0;
		this.my = 0;

		// Velocity
		this.vx = 0;
		this.vy = 0;

		// Callbacks
		this.onMouseMove = this.onMouseMove.bind( this );
		this.onDeviceOrientation = this.onDeviceOrientation.bind( this );
		this.onOrientationTimer = this.onOrientationTimer.bind( this );
		this.onCalibrationTimer = this.onCalibrationTimer.bind( this );
		this.onAnimationFrame = this.onAnimationFrame.bind( this );
		this.onWindowResize = this.onWindowResize.bind( this );

		// Initialise
		this.initialise();
	}

	Plugin.prototype.transformSupport = function ( value ) {
		var element = document.createElement( 'div' );
		var propertySupport = false;
		var propertyValue = null;
		var featureSupport = false;
		var cssProperty = null;
		var jsProperty = null;
		for ( var i = 0, l = this.vendors.length; i < l; i++ ) {
			if ( this.vendors[ i ] !== null ) {
				cssProperty = this.vendors[ i ][ 0 ] + 'transform';
				jsProperty = this.vendors[ i ][ 1 ] + 'Transform';
			} else {
				cssProperty = 'transform';
				jsProperty = 'transform';
			}
			if ( element.style[ jsProperty ] !== undefined ) {
				propertySupport = true;
				break;
			}
		}
		switch ( value ) {
			case '2D':
				featureSupport = propertySupport;
				break;
			case '3D':
				if ( propertySupport ) {
					var body = document.body || document.createElement( 'body' );
					var documentElement = document.documentElement;
					var documentOverflow = documentElement.style.overflow;
					var isCreatedBody = false;
					if ( !document.body ) {
						isCreatedBody = true;
						documentElement.style.overflow = 'hidden';
						documentElement.appendChild( body );
						body.style.overflow = 'hidden';
						body.style.background = '';
					}
					body.appendChild( element );
					element.style[ jsProperty ] = 'translate3d(1px,1px,1px)';
					propertyValue = window.getComputedStyle( element ).getPropertyValue( cssProperty );
					featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
					documentElement.style.overflow = documentOverflow;
					body.removeChild( element );
					if ( isCreatedBody ) {
						body.removeAttribute( 'style' );
						body.parentNode.removeChild( body );
					}
				}
				break;
		}
		return featureSupport;
	};

	Plugin.prototype.ww = null;
	Plugin.prototype.wh = null;
	Plugin.prototype.wcx = null;
	Plugin.prototype.wcy = null;
	Plugin.prototype.wrx = null;
	Plugin.prototype.wry = null;
	Plugin.prototype.portrait = null;
	Plugin.prototype.desktop = !navigator.userAgent.match( /(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i );
	Plugin.prototype.vendors = [ null, [ '-webkit-', 'webkit' ], [ '-moz-', 'Moz' ], [ '-o-', 'O' ], [ '-ms-', 'ms' ] ];
	Plugin.prototype.motionSupport = !!window.DeviceMotionEvent;
	Plugin.prototype.orientationSupport = !!window.DeviceOrientationEvent;
	Plugin.prototype.orientationStatus = 0;
	Plugin.prototype.transform2DSupport = Plugin.prototype.transformSupport( '2D' );
	Plugin.prototype.transform3DSupport = Plugin.prototype.transformSupport( '3D' );
	Plugin.prototype.propertyCache = {};

	Plugin.prototype.initialise = function () {

		// Configure Styles
		if ( this.$context.css( 'position' ) === 'static' ) {
			this.$context.css( {
				position: 'relative'
			} );
		}

		// Pointer events
		if ( !this.pointerEvents ) {
			this.$context.css( {
				pointerEvents: 'none'
			} );
		}

		// Hardware Accelerate Context
		this.accelerate( this.$context );

		// Setup
		this.updateLayers();
		this.updateDimensions();
		this.enable();
		this.queueCalibration( this.calibrationDelay );
	};

	Plugin.prototype.updateLayers = function () {

		// Cache Layer Elements
		this.$layers = this.$context.find( '.layer' );
		this.depthsX = [];
		this.depthsY = [];

		// Configure Layer Styles
		this.$layers.css( {
			position: 'absolute',
			display: 'block',
			left: 0,
			top: 0
		} );
		this.$layers.first().css( {
			position: 'relative'
		} );

		// Hardware Accelerate Layers
		this.accelerate( this.$layers );

		// Cache Depths
		this.$layers.each( $.proxy( function ( index, element ) {
			//Graceful fallback on depth if depth-x or depth-y is absent
			var depth = $( element ).data( 'depth' ) || 0;
			this.depthsX.push( $( element ).data( 'depth-x' ) || depth );
			this.depthsY.push( $( element ).data( 'depth-y' ) || depth );
		}, this ) );
	};

	Plugin.prototype.updateDimensions = function () {
		this.ww = window.innerWidth;
		this.wh = window.innerHeight;
		this.wcx = this.ww * this.originX;
		this.wcy = this.wh * this.originY;
		this.wrx = Math.max( this.wcx, this.ww - this.wcx );
		this.wry = Math.max( this.wcy, this.wh - this.wcy );
	};

	Plugin.prototype.updateBounds = function () {
		this.bounds = this.element.getBoundingClientRect();
		this.ex = this.bounds.left;
		this.ey = this.bounds.top;
		this.ew = this.bounds.width;
		this.eh = this.bounds.height;
		this.ecx = this.ew * this.originX;
		this.ecy = this.eh * this.originY;
		this.erx = Math.max( this.ecx, this.ew - this.ecx );
		this.ery = Math.max( this.ecy, this.eh - this.ecy );
	};

	Plugin.prototype.queueCalibration = function ( delay ) {
		clearTimeout( this.calibrationTimer );
		this.calibrationTimer = setTimeout( this.onCalibrationTimer, delay );
	};

	Plugin.prototype.enable = function () {
		if ( !this.enabled ) {
			this.enabled = true;
			if ( this.orientationSupport ) {
				this.portrait = null;
				window.addEventListener( 'deviceorientation', this.onDeviceOrientation );
				setTimeout( this.onOrientationTimer, this.supportDelay );
			} else {
				this.cx = 0;
				this.cy = 0;
				this.portrait = false;
				window.addEventListener( 'mousemove', this.onMouseMove );
			}
			window.addEventListener( 'resize', this.onWindowResize );
			this.raf = requestAnimationFrame( this.onAnimationFrame );
		}
	};

	Plugin.prototype.disable = function () {
		if ( this.enabled ) {
			this.enabled = false;
			if ( this.orientationSupport ) {
				window.removeEventListener( 'deviceorientation', this.onDeviceOrientation );
			} else {
				window.removeEventListener( 'mousemove', this.onMouseMove );
			}
			window.removeEventListener( 'resize', this.onWindowResize );
			cancelAnimationFrame( this.raf );
		}
	};

	Plugin.prototype.calibrate = function ( x, y ) {
		this.calibrateX = x === undefined ? this.calibrateX : x;
		this.calibrateY = y === undefined ? this.calibrateY : y;
	};

	Plugin.prototype.invert = function ( x, y ) {
		this.invertX = x === undefined ? this.invertX : x;
		this.invertY = y === undefined ? this.invertY : y;
	};

	Plugin.prototype.friction = function ( x, y ) {
		this.frictionX = x === undefined ? this.frictionX : x;
		this.frictionY = y === undefined ? this.frictionY : y;
	};

	Plugin.prototype.scalar = function ( x, y ) {
		this.scalarX = x === undefined ? this.scalarX : x;
		this.scalarY = y === undefined ? this.scalarY : y;
	};

	Plugin.prototype.limit = function ( x, y ) {
		this.limitX = x === undefined ? this.limitX : x;
		this.limitY = y === undefined ? this.limitY : y;
	};

	Plugin.prototype.origin = function ( x, y ) {
		this.originX = x === undefined ? this.originX : x;
		this.originY = y === undefined ? this.originY : y;
	};

	Plugin.prototype.clamp = function ( value, min, max ) {
		value = Math.max( value, min );
		value = Math.min( value, max );
		return value;
	};

	Plugin.prototype.css = function ( element, property, value ) {
		var jsProperty = this.propertyCache[ property ];
		if ( !jsProperty ) {
			for ( var i = 0, l = this.vendors.length; i < l; i++ ) {
				if ( this.vendors[ i ] !== null ) {
					jsProperty = $.camelCase( this.vendors[ i ][ 1 ] + '-' + property );
				} else {
					jsProperty = property;
				}
				if ( element.style[ jsProperty ] !== undefined ) {
					this.propertyCache[ property ] = jsProperty;
					break;
				}
			}
		}
		element.style[ jsProperty ] = value;
	};

	Plugin.prototype.accelerate = function ( $element ) {
		for ( var i = 0, l = $element.length; i < l; i++ ) {
			var element = $element[ i ];
			this.css( element, 'transform', 'translate3d(0,0,0)' );
			this.css( element, 'transform-style', 'preserve-3d' );
			this.css( element, 'backface-visibility', 'hidden' );
		}
	};

	Plugin.prototype.setPosition = function ( element, x, y ) {
		x += 'px';
		y += 'px';
		if ( this.transform3DSupport ) {
			this.css( element, 'transform', 'translate3d(' + x + ',' + y + ',0)' );
		} else if ( this.transform2DSupport ) {
			this.css( element, 'transform', 'translate(' + x + ',' + y + ')' );
		} else {
			element.style.left = x;
			element.style.top = y;
		}
	};

	Plugin.prototype.onOrientationTimer = function ( event ) {
		if ( this.orientationSupport && this.orientationStatus === 0 ) {
			this.disable();
			this.orientationSupport = false;
			this.enable();
		}
	};

	Plugin.prototype.onCalibrationTimer = function ( event ) {
		this.calibrationFlag = true;
	};

	Plugin.prototype.onWindowResize = function ( event ) {
		this.updateDimensions();
	};

	Plugin.prototype.onAnimationFrame = function () {
		this.updateBounds();
		var dx = this.ix - this.cx;
		var dy = this.iy - this.cy;
		if ( ( Math.abs( dx ) > this.calibrationThreshold ) || ( Math.abs( dy ) > this.calibrationThreshold ) ) {
			this.queueCalibration( 0 );
		}
		if ( this.portrait ) {
			this.mx = this.calibrateX ? dy : this.iy;
			this.my = this.calibrateY ? dx : this.ix;
		} else {
			this.mx = this.calibrateX ? dx : this.ix;
			this.my = this.calibrateY ? dy : this.iy;
		}
		this.mx *= this.ew * ( this.scalarX / 100 );
		this.my *= this.eh * ( this.scalarY / 100 );
		if ( !isNaN( parseFloat( this.limitX ) ) ) {
			this.mx = this.clamp( this.mx, -this.limitX, this.limitX );
		}
		if ( !isNaN( parseFloat( this.limitY ) ) ) {
			this.my = this.clamp( this.my, -this.limitY, this.limitY );
		}
		this.vx += ( this.mx - this.vx ) * this.frictionX;
		this.vy += ( this.my - this.vy ) * this.frictionY;
		for ( var i = 0, l = this.$layers.length; i < l; i++ ) {
			var depthX = this.depthsX[ i ];
			var depthY = this.depthsY[ i ];
			var layer = this.$layers[ i ];
			var xOffset = this.vx * ( depthX * ( this.invertX ? -1 : 1 ) );
			var yOffset = this.vy * ( depthY * ( this.invertY ? -1 : 1 ) );
			this.setPosition( layer, xOffset, yOffset );
		}
		this.raf = requestAnimationFrame( this.onAnimationFrame );
	};

	Plugin.prototype.onDeviceOrientation = function ( event ) {

		// Validate environment and event properties.
		if ( !this.desktop && event.beta !== null && event.gamma !== null ) {

			// Set orientation status.
			this.orientationStatus = 1;

			// Extract Rotation
			var x = ( event.beta || 0 ) / MAGIC_NUMBER; //  -90 :: 90
			var y = ( event.gamma || 0 ) / MAGIC_NUMBER; // -180 :: 180

			// Detect Orientation Change
			var portrait = window.innerHeight > window.innerWidth;
			if ( this.portrait !== portrait ) {
				this.portrait = portrait;
				this.calibrationFlag = true;
			}

			// Set Calibration
			if ( this.calibrationFlag ) {
				this.calibrationFlag = false;
				this.cx = x;
				this.cy = y;
			}

			// Set Input
			this.ix = x;
			this.iy = y;
		}
	};

	Plugin.prototype.onMouseMove = function ( event ) {

		// Cache mouse coordinates.
		var clientX = event.clientX;
		var clientY = event.clientY;

		// Calculate Mouse Input
		if ( !this.orientationSupport && this.relativeInput ) {

			// Clip mouse coordinates inside element bounds.
			if ( this.clipRelativeInput ) {
				clientX = Math.max( clientX, this.ex );
				clientX = Math.min( clientX, this.ex + this.ew );
				clientY = Math.max( clientY, this.ey );
				clientY = Math.min( clientY, this.ey + this.eh );
			}

			// Calculate input relative to the element.
			this.ix = ( clientX - this.ex - this.ecx ) / this.erx;
			this.iy = ( clientY - this.ey - this.ecy ) / this.ery;

		} else {

			// Calculate input relative to the window.
			this.ix = ( clientX - this.wcx ) / this.wrx;
			this.iy = ( clientY - this.wcy ) / this.wry;
		}
	};

	var API = {
		enable: Plugin.prototype.enable,
		disable: Plugin.prototype.disable,
		updateLayers: Plugin.prototype.updateLayers,
		calibrate: Plugin.prototype.calibrate,
		friction: Plugin.prototype.friction,
		invert: Plugin.prototype.invert,
		scalar: Plugin.prototype.scalar,
		limit: Plugin.prototype.limit,
		origin: Plugin.prototype.origin
	};

	$.fn[ NAME ] = function ( value ) {
		var args = arguments;
		return this.each( function () {
			var $this = $( this );
			var plugin = $this.data( NAME );
			if ( !plugin ) {
				plugin = new Plugin( this, value );
				$this.data( NAME, plugin );
			}
			if ( API[ value ] ) {
				plugin[ value ].apply( plugin, Array.prototype.slice.call( args, 1 ) );
			}
		} );
	};

} )( window.jQuery || window.Zepto, window, document );
*/

( function ( $ ) {

	/**
	 * Copyright 2012, Digital Fusion
	 * Licensed under the MIT license.
	 * http://teamdf.com/jquery-plugins/license/
	 *
	 * @author Sam Sehnert
	 * @desc A small plugin that checks whether elements are within
	 *       the user visible viewport of a web browser.
	 *       only accounts for vertical position, not horizontal.
	 */
	$.fn.visible = function ( partial, hidden, direction, container ) {

		if ( this.length < 1 )
			return;

		var $t = this.length > 1 ? this.eq( 0 ) : this,
			isContained = typeof container !== 'undefined' && container !== null,
			$w = isContained ? $( container ) : $( window ),
			wPosition = isContained ? $w.position() : 0,
			t = $t.get( 0 ),
			vpWidth = $w.outerWidth(),
			vpHeight = $w.outerHeight(),
			direction = ( direction ) ? direction : 'both',
			clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

		if ( typeof t.getBoundingClientRect === 'function' ) {

			// Use this native browser method, if available.
			var rec = t.getBoundingClientRect(),
				tViz = isContained ?
					rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top :
					rec.top >= 0 && rec.top < vpHeight,
				bViz = isContained ?
					rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top :
					rec.bottom > 0 && rec.bottom <= vpHeight,
				lViz = isContained ?
					rec.left - wPosition.left >= 0 && rec.left < vpWidth + wPosition.left :
					rec.left >= 0 && rec.left < vpWidth,
				rViz = isContained ?
					rec.right - wPosition.left > 0 && rec.right < vpWidth + wPosition.left :
					rec.right > 0 && rec.right <= vpWidth,
				vVisible = partial ? tViz || bViz : tViz && bViz,
				hVisible = partial ? lViz || rViz : lViz && rViz;

			if ( direction === 'both' )
				return clientSize && vVisible && hVisible;
			else if ( direction === 'vertical' )
				return clientSize && vVisible;
			else if ( direction === 'horizontal' )
				return clientSize && hVisible;
		} else {

			var viewTop = isContained ? 0 : wPosition,
				viewBottom = viewTop + vpHeight,
				viewLeft = $w.scrollLeft(),
				viewRight = viewLeft + vpWidth,
				position = $t.position(),
				_top = position.top,
				_bottom = _top + $t.height(),
				_left = position.left,
				_right = _left + $t.width(),
				compareTop = partial === true ? _bottom : _top,
				compareBottom = partial === true ? _top : _bottom,
				compareLeft = partial === true ? _right : _left,
				compareRight = partial === true ? _left : _right;

			if ( direction === 'both' )
				return !!clientSize && ( ( compareBottom <= viewBottom ) && ( compareTop >= viewTop ) ) && ( ( compareRight <= viewRight ) && ( compareLeft >= viewLeft ) );
			else if ( direction === 'vertical' )
				return !!clientSize && ( ( compareBottom <= viewBottom ) && ( compareTop >= viewTop ) );
			else if ( direction === 'horizontal' )
				return !!clientSize && ( ( compareRight <= viewRight ) && ( compareLeft >= viewLeft ) );
		}
	};

} )( jQuery );

// Float Element
( function ( theme, $ ) {

	'use strict';

	theme = theme || {};

	var instanceName = '__floatElement';

	var PluginFloatElement = function ( $el, opts ) {
		return this.initialize( $el, opts );
	};

	PluginFloatElement.defaults = {
		startPos: 'top',
		speed: 3,
		horizontal: false,
		transition: false,
		transitionDelay: 0,
		transitionDuration: 500
	};

	PluginFloatElement.prototype = {
		initialize: function ( $el, opts ) {
			if ( $el.data( instanceName ) ) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions( opts )
				.build();

			return this;
		},

		setData: function () {
			this.$el.data( instanceName, this );

			return this;
		},

		setOptions: function ( opts ) {
			this.options = $.extend( true, {}, PluginFloatElement.defaults, opts, {
				wrapper: this.$el
			} );

			return this;
		},

		build: function () {
			var self = this,
				$el = this.options.wrapper,
				$window = $( window ),
				minus;

			if ( self.options.style ) {
				$el.attr( 'style', self.options.style );
			}

			if ( $window.width() > 767 ) {

				// Set Start Position
				if ( self.options.startPos == 'none' ) {
					minus = '';
				} else if ( self.options.startPos == 'top' ) {
					$el.css( {
						top: 0
					} );
					minus = '';
				} else {
					$el.css( {
						bottom: 0
					} );
					minus = '-';
				}

				// Set Transition
				if ( self.options.transition ) {
					$el.css( {
						transition: 'ease-out transform ' + self.options.transitionDuration + 'ms ' + self.options.transitionDelay + 'ms'
					} );
				}

				// First Load
				self.movement( minus );

				// Scroll
				window.addEventListener( 'scroll', function () {
					self.movement( minus );
				}, { passive: true } );

			}

			return this;
		},

		movement: function ( minus ) {
			var self = this,
				$el = this.options.wrapper,
				$window = $( window ),
				scrollTop = $window.scrollTop(),
				elementOffset = $el.offset().top,
				currentElementOffset = ( elementOffset - scrollTop );

			var scrollPercent = 100 * currentElementOffset / ( $window.height() );

			if ( $el.visible( true ) ) {

				if ( !self.options.horizontal ) {

					$el.css( {
						transform: 'translate3d(0, ' + minus + scrollPercent / self.options.speed + '%, 0)'
					} );

				} else {

					$el.css( {
						transform: 'translate3d(' + minus + scrollPercent / self.options.speed + '%, ' + minus + scrollPercent / self.options.speed + '%, 0)'
					} );

				}
			}
		}
	};

	// expose to scope
	$.extend( theme, {
		PluginFloatElement: PluginFloatElement
	} );

	// jquery plugin
	$.fn.themePluginFloatElement = function ( opts ) {
		return this.map( function () {
			var $this = $( this );

			if ( $this.data( instanceName ) ) {
				return $this.data( instanceName );
			} else {
				return new PluginFloatElement( $this, opts );
			}

		} );
	}

} ).apply( this, [ window.theme, jQuery ] );