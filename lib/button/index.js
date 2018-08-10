import React,{PureComponent,Fragment} from 'react'
import {Text,Image,TouchableOpacity,StyleSheet,ActivityIndicator} from 'react-native'
import PropTypes from 'prop-types'

export default class Button extends PureComponent{

    indicator = () => {
        const {textStyle} = this.props
        const textStyleObject = StyleSheet.flatten(textStyle)
        const color = (textStyleObject && textStyleObject.color) ? textStyleObject.color : StyleSheet.flatten(styles.text).color
        return <ActivityIndicator size="small" color={color} />
    }

    render(){
        const {style,textStyle,source,imageStyle,loading,children,imagePosition,...other} = this.props
        const _imageStyle = [styles.image,imageStyle]
        const _textStyle = [styles.text]
        const _buttonStyle = [styles.button,style,styles.buttonLayout]
        const marginValue = children ? 5 : 0

        let _content

        loading && _buttonStyle.push({opacity:0.5})

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
            <TouchableOpacity {...other} disabled={loading || other.disabled} style={_buttonStyle}>
                {_content}
            </TouchableOpacity>
        )
    }

}

Button.propTypes = {
    imageStyle:PropTypes.oneOfType([PropTypes.number,PropTypes.object]),
    textStyle:PropTypes.oneOfType([PropTypes.number,PropTypes.object]),
    source:PropTypes.oneOfType([PropTypes.number,PropTypes.object]),
    onPress:PropTypes.func,
    imagePosition:PropTypes.oneOf(['left', 'right','top','bottom']),
    loading:PropTypes.bool
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
        backgroundColor:'#4ba5ff',
        paddingHorizontal:12,
        paddingVertical:8,
        borderRadius:5
    },
    text:{
        flexShrink: 1,
        color:'#fff'
    },
    image:{
        resizeMode:'contain'
    }
})