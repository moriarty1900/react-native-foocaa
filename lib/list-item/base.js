/**
 * Created by Raymond on 2017/8/29.
 * @format
 * @flow
 */
import * as React from "react";
import { View, StyleSheet,Text,Image,TouchableOpacity,ViewPropTypes } from "react-native";

export type BaseProps = {
	arrow?:string,
	extraStyle?:ViewPropTypes.style,
	titleStyle?:Text.propTypes.style,
	onClick?:Function,
	detail?:React.Node | string | Function,
	bottomTextStyle?:Text.propTypes.style,
	thumb?:React.Node | Function,
	required?:boolean,
	style:ViewPropTypes.style,
  children:string
}

export function withBaseListItem<Component: React.ComponentType<any>>(WrappedComponent:Component): React.ComponentType<React.ElementConfig<Component>> {
    return class extends React.PureComponent<BaseProps> {

      static defaultProps = {
        extraStyle:{},
        titleStyle:{},
        required:false
      }

      render() {
        const {arrow,children,style,extraStyle,titleStyle,onClick,detail,bottomTextStyle,thumb,required,...other} = this.props
        return(
          <TouchableOpacity onPress={onClick} disabled={!onClick} style={[styles.container,style]}>
            <View style={styles.top}>
              {thumb ? <View style={styles.thumbContainer}>{typeof (thumb) === 'function' ? thumb() : thumb}</View> : null}
                {
                    (children || required) &&
                    <View style={styles.titleView}>
                        {required ?
                            <Text style={[styles.title,titleStyle]}>
                                <Text style={{color:'red'}}>*</Text>
                                <Text>{children}</Text>
                            </Text>
                            :
                            <Text style={[styles.title,titleStyle]}>{children}</Text>
                        }
                    </View>
                }
                {WrappedComponent ? <WrappedComponent style={extraStyle} {...other}/> : <View />}
              <View style={styles.arrowView}>
                <Image resizeMode={'contain'} source={require('./resource/environment_in.png')} style={this.arrowDir(arrow)}/>
              </View>
            </View>
            {
              detail && (typeof (detail) === 'string' ? <Text style={[styles.bottomText,bottomTextStyle]}>{detail}</Text> : typeof (detail) === 'function' ? detail() : detail)
            }
          </TouchableOpacity>
        )
      }

      arrowDir = (arrow:?string) =>{
        if (!arrow || arrow.length === 0){
          return [styles.arrow,{width:0}]
        } else if (arrow === 'top'){
          return [styles.arrow,{transform:[{rotateZ:'-90deg'}]}]
        } else if (arrow === 'left'){
          return [styles.arrow,{transform:[{rotateZ:'180deg'}]}]
        } else if (arrow === 'bottom'){
          return [styles.arrow,{transform:[{rotateZ:'90deg'}]}]
        } else if (arrow === 'right'){
          return [styles.arrow,{transform:[{rotateZ:'0deg'}]}]
        }
      }
  }
}


const styles = StyleSheet.create({
  container:{
    padding:10,
    borderBottomColor:'#f1f1f1',
    borderBottomWidth:1,
    backgroundColor:'white'
  },
  top: {
    flexDirection:'row',
  },
  bottomText:{
    flex:1,
    color:'gray',
    fontSize:12
  },
  titleView:{
    marginRight:6,
    alignItems:'center',
    justifyContent:'center',
  },
  title:{
    fontSize:15,
    color:'black'
  },
  extra:{
    flex:1,
  },
  arrowView:{
    marginLeft:6,
    alignItems:'center',
    justifyContent:'center',
  },
  arrow:{
    width:20,
    height:20,
  },
  thumbContainer:{
    marginRight:10,
    alignItems:'center'
  }

});