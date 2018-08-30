/**
 * Created by Raymond on 2017/6/28.
 * @format
 * @flow
 */
import React,{PureComponent,Fragment} from 'react'
import {Text,Image,TouchableOpacity,StyleSheet,ActivityIndicator} from 'react-native'

import Theme from '../theme'

type Props = {
	imageStyle?:{},
	textStyle?:{},
	source?:number | {uri:string},
	onPress?:Function,
	imagePosition?:'left'| 'right'|'top'|'bottom',
	loading?:boolean,
  children?:string,
	disabled?:boolean
}

export default class Button extends PureComponent<Props>{

	static defaultProps = {
		imagePosition:'left',
		loading:false,
		children:''
    }

    indicator = () => {
        const {textStyle} = this.props
        const textStyleObject = StyleSheet.flatten(textStyle)
        const color = (textStyleObject && textStyleObject.color) ? textStyleObject.color : StyleSheet.flatten(styles.text).color
        return <ActivityIndicator size="small" color={color} />
    }

    render(){
        const {textStyle,source,imageStyle,loading,children,imagePosition,disabled,...other} = this.props
        const {style} = other
        const _imageStyle = [styles.image,Theme.Button.image,imageStyle]
        const _textStyle = [styles.text,Theme.Button.text]
        const _buttonStyle = [styles.button,Theme.Button.wrap,style,styles.buttonLayout]
        const marginValue = (children && (loading || source)) ? 5 : 0

        let _content

        (loading || disabled) && _buttonStyle.push({opacity:0.5})

        switch (imagePosition){
            case 'right':
                _textStyle.push({marginRight:marginValue},textStyle)
                _buttonStyle.push(styles.row)
                _content = (
                    <Fragment>
                        {children && <Text numberOfLines={1} style={_textStyle}>{children}</Text>}
                        {(!loading && source) && <Image source={source} style={_imageStyle}/>}
                        {loading && this.indicator()}
                    </Fragment>
                )
                break
            case 'top':
                _textStyle.push({marginTop:marginValue},textStyle)
                _buttonStyle.push(styles.col)
                _content = (
                    <Fragment>
                        {loading && this.indicator()}
                        {(!loading && source) && <Image source={source} style={_imageStyle}/>}
                        {children && <Text numberOfLines={1} style={_textStyle}>{children}</Text>}
                    </Fragment>
                )
                break
            case 'bottom':
                _textStyle.push({marginBottom:marginValue},textStyle)
                _buttonStyle.push(styles.col)
                _content = (
                    <Fragment>
                        {children && <Text numberOfLines={1} style={_textStyle}>{children}</Text>}
                        {(!loading && source) && <Image source={source} style={_imageStyle}/>}
                        {loading && this.indicator()}
                    </Fragment>
                )
                break
            default:
                _textStyle.push({marginLeft:marginValue},textStyle)
                _buttonStyle.push(styles.row)
                _content = (
                    <Fragment>
                        {loading && this.indicator()}
                        {(!loading && source) && <Image source={source} style={_imageStyle}/>}
                        {children && <Text numberOfLines={1} style={_textStyle}>{children}</Text>}
                    </Fragment>
                )
                break
        }
        return(
            <TouchableOpacity {...other} disabled={loading || disabled} style={_buttonStyle}>
                {_content}
            </TouchableOpacity>
        )
    }

}


const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
    },
    col:{
        flexDirection:'column',
    },
    buttonLayout:{
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden'
    },
    button:{
        paddingHorizontal:12,
        paddingVertical:8,
        borderRadius:5,
    },
    text:{
        flexShrink: 1,
        color:'#fff',
    },
    image:{
        resizeMode:'contain',
    }
})