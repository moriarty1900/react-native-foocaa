import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet,TextInput,Text } from "react-native";
import {basePropTyes, withBaseListItem} from './base'

class InputItem extends PureComponent {

  render(){
    const {style,extra,extraTextStyle,...other}=this.props
    return (
      <View style={[styles.container,style]}>
        <TextInput {...other} style={[styles.input,other.inputStyle]} />
        {typeof(extra) ===  'string' ? <Text style={[styles.extra,extraTextStyle]}>{extra}</Text> : typeof(extra) ===  'function' ? extra() : extra}
      </View>
    )
  }

}

InputItem.propTyes = {
    ...basePropTyes,
    extra:PropTypes.oneOfType([PropTypes.node , PropTypes.string]),
    extraTextStyle:PropTypes.object,
    inputStyle:PropTypes.object
}

InputItem.defaultProps = {
  placeholder:'请输入内容'
}

export default withBaseListItem(InputItem)


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white",
    flexDirection:'row',
      alignItems:'center',
  },
  input:{
    height:25,
    flex:1,
  },
    extra:{
      color:'gray',
        marginLeft:5
    }

});