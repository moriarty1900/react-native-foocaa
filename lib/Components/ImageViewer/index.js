/**
 * Created by Raymond on 2017/6/28.
 * @format
 * @flow
 */
import React from 'react'
import { Modal, CameraRoll } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

// https://github.com/ascoders/react-native-image-viewer ⬅️文档

type FCImageViewerProps = {
	modalProps: typeof Modal.propTypes,
	imageViewerProps: typeof ImageViewer.Props,
}

export default class FCImageViewer extends React.PureComponent<FCImageViewerProps> {
  onSave = (url:string) => {
    CameraRoll.saveToCameraRoll(url)
      .then(() => {})
      .catch(err => {})
  }

  render() {
    const { modalProps, imageViewerProps } = this.props
    return (
      <Modal
        animationType="fade"
        onRequestClose={imageViewerProps.onClick}
        transparent
        {...modalProps}
      >
        <ImageViewer onSave={this.onSave} {...imageViewerProps} />
      </Modal>
    )
  }
}

