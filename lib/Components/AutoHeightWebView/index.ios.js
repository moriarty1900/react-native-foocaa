'use strict';

import React, { PureComponent } from 'react';

import { Animated, Dimensions, StyleSheet, ViewPropTypes, WebView } from 'react-native';

import { getScript, onHeightUpdated, domMutationObserveScript } from './common.js';

type AutoHeightWebViewProps = {
	hasIframe: boolean,
	source: WebView.propTypes.source,
	onHeightUpdated: Function,
	customScript: string,
	customStyle: string,
	enableAnimation: boolean,
	// if set to true may cause some layout issues (smaller font size)
	scalesPageToFit: boolean,
	// only works on enable animation
	animationDuration: number,
	// offset of rn webview margin
	heightOffset: number,
	style: ViewPropTypes.style,
	//  rn WebView callback
	onError: Function,
	onLoad: Function,
	onLoadStart: Function,
	onLoadEnd: Function,
	onShouldStartLoadWithRequest: Function,
	// add web/files... to project root
	files:Array<{href:string,type:string,rel:string}>
};


export default class AutoHeightWebView extends PureComponent<AutoHeightWebViewProps> {


    static defaultProps = {
        scalesPageToFit: false,
        enableAnimation: true,
        animationDuration: 555,
        heightOffset: 12
    };

    constructor(props) {
        super(props);
        props.enableAnimation && (this.opacityAnimatedValue = new Animated.Value(0));
        this.state = {
            height: 0,
            script: getScript(props, baseScript, iframeBaseScript)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ script: getScript(nextProps, baseScript, iframeBaseScript) });
    }

    handleNavigationStateChange = navState => {
        const height = Number(navState.title);
        const { enableAnimation, animationDuration } = this.props;
        if (height && height !== this.state.height) {
            enableAnimation && this.opacityAnimatedValue.setValue(0);
            this.setState({ height }, () => {
                enableAnimation
                    ? Animated.timing(this.opacityAnimatedValue, {
                    toValue: 1,
                    duration: animationDuration
                }).start(() => onHeightUpdated(height, this.props))
                    : onHeightUpdated(height, this.props);
            });
        }
    };

    getWebView = webView => (this.webView = webView);

    stopLoading() {
        this.webView.stopLoading();
    }

    render() {
        const { height, script } = this.state;
        const {
            onError,
            onLoad,
            onLoadStart,
            onLoadEnd,
            onShouldStartLoadWithRequest,
            scalesPageToFit,
            enableAnimation,
            source,
            heightOffset,
            customScript,
            style
        } = this.props;
        const webViewSource = typeof (source) === 'object' ? Object.assign({}, source, { baseUrl: 'web/' }) : source;
        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: enableAnimation ? this.opacityAnimatedValue : 1,
                        height: height + heightOffset
                    },
                    style
                ]}
            >
                <WebView
                    ref={this.getWebView}
                    onError={onError}
                    onLoad={onLoad}
                    onLoadStart={onLoadStart}
                    onLoadEnd={onLoadEnd}
                    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                    style={styles.webView}
                    injectedJavaScript={script + customScript}
                    scrollEnabled={false}
                    scalesPageToFit={scalesPageToFit}
                    source={webViewSource}
                    onNavigationStateChange={this.handleNavigationStateChange}
                />
            </Animated.View>
        );
    }
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        marginLeft: 7.5,
        width: screenWidth-15,
        backgroundColor: 'transparent'
    },
    webView: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});

const commonScript = `
    updateHeight();
    window.addEventListener('load', updateHeight);
    window.addEventListener('resize', updateHeight);
    `;

const getHeight = `
    function getHeight(height) {
      if(height < 1) {
        return document.body.offsetHeight;
      }
      return height;
    }
    `;

const baseScript = `
    ;
    ${getHeight}
    (function () {
        var i = 0;
        var height = 0;
        var wrapper = document.createElement('div');
        wrapper.id = 'height-wrapper';
        while (document.body.firstChild instanceof Node) {
            wrapper.appendChild(document.body.firstChild);
        }
        document.body.appendChild(wrapper);
        function updateHeight() {
            if(document.body.offsetHeight !== height) {
                height = getHeight(wrapper.clientHeight);
                document.title = height;
                window.location.hash = ++i;
            }
        }
        ${commonScript}
        ${domMutationObserveScript}
    } ());
    `;

const iframeBaseScript = `
    ;
    ${getHeight}
    (function () {
        var i = 0;
        var height = 0;
        function updateHeight() {
            if(document.body.offsetHeight !== height) {
                height = getHeight(document.body.firstChild.clientHeight);
                document.title = height;
                window.location.hash = ++i;
            }
        }
        ${commonScript}
        ${domMutationObserveScript}
    } ());
    `;
