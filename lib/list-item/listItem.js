import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text } from "react-native";
import {basePropTyes, withBaseListItem} from './base'

class ListItem extends PureComponent {

  render(){
    const {extra,style,extraTextStyle}=this.props
    return (
      <View style={[styles.container,style]}>
        {typeof(extra) ===  'string' ? <Text style={[styles.extra,extraTextStyle]}>{extra}</Text> : typeof(extra) ===  'function' ? extra() : extra}
      </View>
    )
  }

}

ListItem.propTyes = {
    ...basePropTyes,
    extra: PropTypes.oneOfType([PropTypes.node , PropTypes.string]),
    extraTextStyle:PropTypes.object
}

export default withBaseListItem(ListItem)


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white",
    justifyContent:'center',
    alignItems:'flex-end'
  },
  extra:{
    color:'gray'
  }

});