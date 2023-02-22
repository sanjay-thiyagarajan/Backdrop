<?php

/**
 * Backdrop Extension
 *
 * @file
 * @ingroup Extensions
 * @author Sanjay Thiyagarajan
 *
 */

class BackdropHooks {
	/**
	 * Register parser hooks
	 * @see https://www.mediawiki.org/wiki/Manual:Parser_functions
	 * @param Parser $parser
	 */
	public static function registerParserFunctions( $parser ) {
		$output = RequestContext::getMain()->getOutput();
		$output->addModules( 'ext.Backdrop' );

		// Register parser functions
		$parser->setFunctionHook( 'backdrop', [ 'BackdropParser', 'backDrop' ] );
	}
}
