'use strict';

import React, { PureComponent } from 'react';

import {
    findNodeHandle,
    requireNativeComponent,
    Animated,
    DeviceEventEmitter,
    Dimensions,
    StyleSheet,
    Platform,
    UIManager,
    ViewPropTypes,
    WebView
} from 'react-native';

import Immutable from 'immutable';

import { getScript, onHeightUpdated, domMutationObserveScript, getHeight } from './common.js';

const RCTAutoHeightWebView = requireNativeComponent('RCTAutoHeightWebView', AutoHeightWebView, {
    nativeOnly: {
        nativeOnly: {
            onLoadingStart: true,
            onLoadingError: true,
            onLoadingFinish: true,
            messagingEnabled: PropTypes.bool
        }
    }
});

type AutoHeightWebViewProps = {
	source: WebView.propTypes.source,
	onHeightUpdated: Function,
	customScript: string,
	customStyle: string,
	enableAnimation: boolean,
	// if set to false may cause some layout issues (width of container will be than width of screen)
	scalesPageToFit: boolean,
	// only works on enable animation
	animationDuration: number,
	// offset of rn webView margin
	heightOffset: number,
	// baseUrl not work in android 4.3 or below version
	enableBaseUrl: boolean,
	style: ViewPropTypes.style,
	//  rn WebView callback
	onError: Function,
	onLoad: Function,
	onLoadStart: Function,
	onLoadEnd: Function,
	// works if set enableBaseUrl to true; add web/files... to android/app/src/assets/
	files:Array<{href:string,type:string,rel:string}>
};

export default class AutoHeightWebView extends PureComponent<AutoHeightWebViewProps> {

    static defaultProps = {
        scalesPageToFit: true,
        enableBaseUrl: false,
        enableAnimation: true,
        animationDuration: 555,
        heightOffset: 20
    };

    constructor(props) {
        super(props);
        props.enableAnimation && (this.opacityAnimatedValue = new Animated.Value(0));
        isBelowKitKat && DeviceEventEmitter.addListener('webViewBridgeMessage', this.listenWebViewBridgeMessage);
        this.state = {
            isChangingSource: false,
            height: 0,
            heightOffset: 0,
            script: getScript(props, baseScript)
        };
    }

    componentDidMount() {
        this.startInterval();
    }

    componentWillReceiveProps(nextProps) {
        // injectedJavaScript only works when webView reload (source changed)
        if (Immutable.is(Immutable.fromJS(this.props.source), Immutable.fromJS(nextProps.source))) {
            return;
        } else {
            this.setState(
                {
                    isChangingSource: true,
                    height: 0,
                    heightOffset: 0
                },
                () => {
                    this.startInterval();
                    this.setState({ isChangingSource: false });
                }
            );
        }
        this.setState({ script: getScript(nextProps, baseScript) });
    }

    componentWillUnmount() {
        this.stopInterval();
        isBelowKitKat && DeviceEventEmitter.removeListener('webViewBridgeMessage', this.listenWebViewBridgeMessage);
    }

    // below kitkat
    listenWebViewBridgeMessage = body => this.onMessage(body.message);

    // below kitkat
    sendToWebView(message) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.webView),
            UIManager.RCTAutoHeightWebView.Commands.sendToWebView,
            [String(message)]
        );
    }

    postMessage(data) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.webView),
            UIManager.RCTAutoHeightWebView.Commands.postMessage,
            [String(data)]
        );
    }

    startInterval() {
        this.finishInterval = false;
        this.interval = setInterval(() => {
            if (!this.finishInterval) {
                isBelowKitKat ? this.sendToWebView('getBodyHeight') : this.postMessage('getBodyHeight');
            }
        }, 205);
    }

    stopInterval() {
        this.finishInterval = true;
        clearInterval(this.interval);
    }

    onMessage = e => {
        const height = parseInt(isBelowKitKat ? e.nativeEvent.message : e.nativeEvent.data);
        if (height && height !== this.state.height) {
            const { enableAnimation, animationDuration, heightOffset } = this.props;
            enableAnimation && this.opacityAnimatedValue.setValue(0);
            this.stopInterval();
            this.setState(
                {
                    heightOffset,
                    height
                },
                () => {
                    enableAnimation
                        ? Animated.timing(this.opacityAnimatedValue, {
                        toValue: 1,
                        duration: animationDuration
                    }).start(() => onHeightUpdated(height, this.props))
                        : onHeightUpdated(height, this.props);
                }
            );
        }
    };

    onLoadingStart = event => {
        const { onLoadStart } = this.props;
        onLoadStart && onLoadStart(event);
    };

    onLoadingError = event => {
        const { onError, onLoadEnd } = this.props;
        onError && onError(event);
        onLoadEnd && onLoadEnd(event);
        console.warn('Encountered an error loading page', event.nativeEvent);
    };

    onLoadingFinish = event => {
        const { onLoad, onLoadEnd } = this.props;
        onLoad && onLoad(event);
        onLoadEnd && onLoadEnd(event);
    };

    getWebView = webView => (this.webView = webView);

    stopLoading() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.webView),
            UIManager.RCTAutoHeightWebView.Commands.stopLoading,
            null
        );
    }

    render() {
        const { height, script, isChangingSource, heightOffset } = this.state;
        const { scalesPageToFit, enableAnimation, source, customScript, style, enableBaseUrl } = this.props;
        let webViewSource = source;
        if (enableBaseUrl) {
            webViewSource = Object.assign({}, source, {
                baseUrl: 'file:///android_asset/web/'
            });
        }
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
                {isChangingSource ? null : (
                    <RCTAutoHeightWebView
                        onLoadingStart={this.onLoadingStart}
                        onLoadingFinish={this.onLoadingFinish}
                        onLoadingError={this.onLoadingError}
                        ref={this.getWebView}
                        style={styles.webView}
                        javaScriptEnabled={true}
                        injectedJavaScript={customScript+script }
                        scalesPageToFit={scalesPageToFit}
                        source={webViewSource}
                        onMessage={this.onMessage}
                        messagingEnabled={true}
                        // below kitkat
                        onChange={this.onMessage}
                    />
                )}
            </Animated.View>
        );
    }
}

const screenWidth = Dimensions.get('window').width;

const isBelowKitKat = Platform.Version < 19;

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        backgroundColor: 'transparent'
    },
    webView: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});

const baseScript = isBelowKitKat
    ? `
    ; (function () {
        AutoHeightWebView.onMessage = function (message) {
            AutoHeightWebView.send(String(document.body.offsetHeight));
        };
        ${domMutationObserveScript}
    } ());
    `
    : `
    ; (function () {
        document.addEventListener('message', function (e) {
            window.postMessage(String(document.body.offsetHeight));
        });
        ${domMutationObserveScript}
    } ());
    `;
