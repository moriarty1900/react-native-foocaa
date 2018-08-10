import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet,Text,Image,TouchableOpacity } from "react-native";

// export interface BaseItemPropsType {
//   arrow: PropTypes.string,
//   extraStyle: PropTypes.object,
//   titleStyle:PropTypes.object,
//   onClick:PropTypes.func,
//   detail:PropTypes.node | PropTypes.string,
//   bottomTextStyle:PropTypes.object,
//   thumb:PropTypes.node
// }

export const basePropTyes = {
  arrow: PropTypes.string,
  extraStyle: PropTypes.object,
  titleStyle:PropTypes.object,
  onClick:PropTypes.func,
  detail:PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  bottomTextStyle:PropTypes.object,
  thumb:PropTypes.node,
    required:PropTypes.bool
}

export function withBaseListItem(WrappedComponent) {
    // return class extends PureComponent<BaseItemPropsType, any> {
    return class extends PureComponent {
      constructor(props) {
        super(props)
        this.state = {}
      }

      static defaultProps = {
        arrow:null,
        extraStyle:{},
        titleStyle:{},
        required:false
      }

      componentDidMount() {

      }

      componentWillUnmount() {

      }

      render() {
        const {arrow,children,style,extraStyle,titleStyle,onClick,detail,bottomTextStyle,thumb,required,...other} = this.props
        return(
          <TouchableOpacity onPress={onClick} disabled={!onClick} style={[styles.container,style]}>
            <View style={styles.top}>
              {thumb ? <View style={styles.thumbContainer}>{thumb}</View> : null}
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

      arrowDir = (arrow) =>{
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