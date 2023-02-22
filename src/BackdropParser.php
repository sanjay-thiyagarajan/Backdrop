<?php

/**
 * Backdrop Parser
 *
 * @file
 * @ingroup Extensions
 * @author Sanjay Thiyagarajan
 */

use Mediawiki\MediawikiServices;

class BackdropParser {

	/**
	 * Parser function handler for {{#backdrop: true | background=image.jpg | coverpage=true | hidecontrol=true
	 * | titlecolor=white | pagelogo=logo.png | content-bgcolor=aliceblue }}
	 *
	 * @param Parser $parser
	 * @param string $value
	 *
	 * @return string HTML to insert in the page.
	 */
	public static function backDrop( $parser, $value ) {
		$params = func_get_args();
		$params = array_splice( $params, 2 );
		
		$background = null;
		$hidecontrol = null;
		$pageLogo = null;
		$coverPage = null;
		$titleColor = null;
		
		$config = [ 'class' => 'backdrop' ];
		
		$services = MediaWikiServices::getInstance();
		$user = RequestContext::getMain()->getUser()->getName();
		
		// Assign params.
		foreach ( $params as $i => $param ) {
			$elements = explode( '=', $param, 2 );

			// Set param name and value.
			if ( count( $elements ) > 1 ) {
				$paramName = trim( $elements[0] );
				$value = trim( $parser->recursivePreprocess( html_entity_decode( $elements[1], ENT_QUOTES ) ) );
			} else {
				$paramName = trim( $param );
				$value = null;
			}

			if ( $paramName == 'background' ) {
				$title = Title::makeTitleSafe( NS_FILE, $value );
			    $file = $services->getRepoGroup()->getLocalRepo()->newFile( $title );
				$config[ 'data-background' ] = $file->getFullUrl();
			} elseif ( $paramName == 'hidecontrol' ) {
				$config[ 'data-hidecontrol' ] = true;
			} elseif ( $paramName == 'pagelogo' ) {
				$title = Title::makeTitleSafe( NS_FILE, $value );
			    $file = $services->getRepoGroup()->getLocalRepo()->newFile( $title );
				$config[ 'data-pagelogo' ] = $file->getFullUrl();
			} elseif ( $paramName == 'coverpage' ) {
				$config[ 'data-coverpage' ] = true;
			} elseif ( $paramName == 'titlecolor' ) {
				$config[ 'data-titlecolor' ] = $value;
			}  elseif ( $paramName == 'content-bgcolor' ) {
				$config[ 'data-body-bgcolor' ] = $value;
			}
		}
		return Html::element( 'span', $config, null );
	}

}
